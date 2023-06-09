<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Credits;
use App\Models\Transactions;
use App\Models\Payables;
use App\Models\Debits;
use App\Models\LibJournal;
use App\Models\JournalLogs;
use App\Http\Resources\TransactionsResource;
use App\Http\Resources\JournalLogsResource;
use App\Http\Resources\PayablesResource;
use App\Http\Resources\CreditsResource;
use App\Http\Resources\DebitsResource;
use Spatie\QueryBuilder\QueryBuilder;
use Carbon\Carbon;


class AccountingController extends Controller
{


public function index()
{
    $currentDate = Carbon::now();

    $debitRecords = Debits::with(['debt.journ', 'debt.cred.entries', 'debt.cred.transac.member'])->get();

    foreach ($debitRecords as $debit) {
        $dueDate = Carbon::parse($debit->debt->due_date);

        if ($dueDate->lt($currentDate)) {
           if ( $debit->status == 'Paid'){

           }else{
            $debit->status = 'Overdue';
            $debit->save();
           }
        }
    }

    return DebitsResource::collection($debitRecords);
}


    public function journTransac(Request $request)
{
    $Dquery = Debits::query()->with(['debt.journ', 'debt.cred.entries', 'debt.cred.transac.member', 'debt.cred']);

    if ($request->id) {
        $Dquery->whereHas('debt.cred.transac.member', function ($query) use ($request) {
            $query->where('id', $request->id);
        });

        $Dquery->whereHas('debt.cred', function ($query) use ($request) {
            $query->where('member_id', $request->id);
        });
    }

    $debit = $Dquery->get();

    return response()->json($debit);
}




     public function total()
    {
        $totals = LibJournal::join('credits', 'lib_journals.id', '=', 'credits.journals_id')
            ->groupBy('lib_journals.id', 'lib_journals.journal_name')
            ->select('lib_journals.id','lib_journals.journal_name', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'))
            ->get();

        return response()->json($totals);
    }


    public function totalPaid()
    {
    $thirtyDaysAgo = Carbon::now()->subDays(30);

    $totals = DB::table('debits')
        ->where('status', 'Paid')
        ->where('pay_date', '>=', $thirtyDaysAgo)
        ->groupBy('status')
        ->select('status', DB::raw('SUM(orig_amount) as total_payment'), DB::raw('COUNT(*) as paid_count'))
        ->first();

    return response()->json($totals);
    }

    public function totalOverdue()
{
    $currentDay = Carbon::now();

    $totals = DB::table('debits')
        ->where(function ($query) use ($currentDay) {
            $query->where('status', 'Overdue')
                  ->orWhere(function ($query) use ($currentDay) {
                      $query->where('status', 'Pending')
                            ->where('due_date', '<=', $currentDay);
                  });
        })
        ->select(DB::raw("'Total' as category"), DB::raw('SUM(open_balance) as total_overdue'), DB::raw('COUNT(*) as overdue_count'))
        ->first();

    return response()->json($totals);
}




    public function totalOpen()
    {
    $totals = DB::table('debits')
        ->groupBy('status')
        ->select('status', DB::raw('SUM(open_balance) as total_open_balance'), DB::raw('COUNT(*) as open_balance_count'))
        ->where('status', 'Pending')
        ->first();

    return response()->json($totals);
    }

    public function totalMemBalance()
{
    $totals = DB::table('debits')
    ->join('payables', 'debits.payables_id', '=', 'payables.id')
    ->join('transactions', 'payables.transaction_id', '=', 'transactions.id')
    ->join('members', 'transactions.members_id', '=', 'members.id')
    ->whereNotNull('transactions.id') // Check for existence of related transaction
    ->groupBy('members.id')
    ->select('members.id', DB::raw('SUM(debits.open_balance) as total_open_balance'), DB::raw('SUM(debits.payment) as total_payment'))
    ->get();

return response()->json($totals);

}



public function totaljour(Request $request)
{
    $startDate = $request->input('start_date');
    $endDate = $request->input('end_date');
    $yearDate = $request->input('year');
    $memberIds = $request->input('member_id');
    $journalIds = $request->input('journal_ids');

    $totalsQuery = DB::table('credits')
        ->join('lib_journals', 'credits.journals_id', '=', 'lib_journals.id')
        ->join('payables', 'credits.payables_id', '=', 'payables.id')
        ->join('transactions', 'payables.transaction_id', '=', 'transactions.id')
        ->join('members', 'transactions.members_id', '=', 'members.id');
    

    if ($memberIds) {
        $totalsQuery->where('members.id', $memberIds);
        $totalsQuery->groupBy('lib_journals.id', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id', 'members.first_name');
        $totalsQuery->select('lib_journals.id as journId', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id as memberId', 'members.first_name', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'));
    }else{
        
        $totalsQuery->groupBy('lib_journals.id', 'lib_journals.journal_name', 'lib_journals.journal_type');
        $totalsQuery->select('lib_journals.id as journId', 'lib_journals.journal_name', 'lib_journals.journal_type', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'));
    }

    if ($journalIds) {
        $totalsQuery->where('lib_journals.id', $journalIds);
        $totalsQuery->groupBy('lib_journals.id', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id', 'members.first_name');
        $totalsQuery->select('lib_journals.id as journId', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id as memberId', 'members.first_name', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'));
    }else{
        
        $totalsQuery->groupBy('lib_journals.id', 'lib_journals.journal_name', 'lib_journals.journal_type');
        $totalsQuery->select('lib_journals.id as journId', 'lib_journals.journal_name', 'lib_journals.journal_type', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'));
    }

    $totals = $totalsQuery->get();
    $total_all_asset = 0;
    $total_asset = 0;
    $total_other_asset = 0;
    $total_non_asset = 0;
    $total_all_liability = 0;
    $total_liability = 0;
    $total_non_liability = 0;
    $total_equity = 0;
    $total_liability_equity = 0;
    $total_revenue = 0;
    $total_expenses = 0;
    $totalc = 0;
    $totald = 0;
    $total_balance =0;
    // $resultVariable =0;
    // $reserveVariable =0;
    // $cetVariable = 0;
    // $cdfVariable = 0;
    // $ofVariable = 0;
    // $cetfVariable = 0;

    $result = [];
    $final = [];

    foreach ($totals as $total) {
        $journalType = strtolower($total->journal_type); // Assuming "journal_type" column exists in the "LibJournal" table

        switch ($journalType) {
        //Assets
            //Current Assets
            case 'cash and cash equivalents':
            case 'loans and receivables':
            case 'financial assets':
            case 'biologicals assets':
                $total_balance = $total->total_debit_amount - $total->total_credit_amount;
                $total_asset += $total_balance;
                break;
            //Other Current Assets
            case 'other current assets':
                $total_balance = $total->total_debit_amount - $total->total_credit_amount;
                $total_other_asset += $total_balance ;
                break;
            //Non Current Assets
            case 'non current assets':
            case 'biological assets':
            case 'intangible assets':
                $total_balance = $total->total_debit_amount - $total->total_credit_amount;
                $total_non_asset += $total_balance ;
                break;

            case 'inventories':
                $total_balance = $total->total_debit_amount - $total->total_credit_amount;
                break;
        //Liabilities
            //CURRENT Liability
            case 'liabilities':
            case 'other current liabilities':
                $total_balance = $total->total_credit_amount - $total->total_debit_amount;
                $total_liability += $total_balance;
                break;
            //Non CURRENT Liability
            case 'non current liabilities':
            case 'other non-current liabilities':
                $total_balance = $total->total_credit_amount - $total->total_debit_amount;
                $total_non_liability += $total_balance;
                break;
        //Equity
        case 'equity':
            $total_balance = $total->total_credit_amount - $total->total_debit_amount;
            $total_equity += $total_balance;
        
            // if ($total->journal_name == 'Subscribed Share Capital - Common') {
            //     // Multiply by 10% and assign to "Reserve Fund"
            //     $reserve_fund_balance = $total_balance * 0.1;
            //     $total->journal_name = 'Reserve Fund';
            //     $total->total_balance = $reserve_fund_balance;
            //     $reserveVariable = $reserve_fund_balance;
        
            //     // Multiply by 05% and assign to "CET Fund"
            //     $cet_fund_balance = $total_balance * 0.05;
            //     $total->journal_name = 'Coop. Education & Training Fund';
            //     $total->total_balance = $cet_fund_balance;
            //     $cetVariable = $cet_fund_balance;

            //     // Multiply by 03% and assign to "Community Development Fund"
            //     $cdf_fund_balance = $total_balance * 0.03;
            //     $total->journal_name = 'Community Development Fund';
            //     $total->total_balance = $cdf_fund_balance;
            //     $cdfVariable = $cdf_fund_balance;

            //     // Multiply by 07% and assign to "Optional Fund"
            //     $of_fund_balance = $total_balance * 0.07;
            //     $total->journal_name = 'Optional Fund';
            //     $total->total_balance = $of_fund_balance;
            //     $ofVariable = $of_fund_balance;

            //     // Multiply by 05% and assign to "Due to Union/Federation (CETF)"
            //     $cetf_fund_balance = $total_balance * 0.05;
            //     $total->journal_name = 'Due to Union/Federation (CETF)';
            //     $total->total_balance = $cetf_fund_balance;
            //     $cetfVariable = $cetf_fund_balance;
            // }
            break;
        
        
        //Revenue
            case 'revenue':
            case 'cost of goods sold':
            case 'cost of services':
                $total_balance = $total->total_debit_amount - $total->total_credit_amount;
                $total_revenue += $total_balance;
                break;
        //Expenses
            case 'expenses':
            case 'other items – subsidy/ gain (losses)':
                $total_balance = $total->total_credit_amount - $total->total_debit_amount;
                $total_expenses += $total_balance;
                break;
        }

        $entry = [
            'journId' => $total->journId,
            'journType' => $total->journal_type,
            'journal_name' => $total->journal_name,
            'total_balance' => $total_balance,
            // 'reserveVariable' => $reserveVariable,
            // 'cetVariable' =>$cetVariable,
            // 'cdfVariable' => $cdfVariable,
            // 'ofVariable' => $ofVariable,
            // 'cetfVariable' => $cetfVariable,
            'totalc' => $totalc,
            'totald' => $totald,
        ];

        if ($memberIds && isset($total->memberId)) {
            $entry['journId'] = $total->journId;
            $entry['memberId'] = $total->memberId;
            $entry['name'] = $total->first_name;
        }
        if ($journalIds && isset($total->journId)) {
            $entry['journId'] = $total->journId;
            $entry['memberId'] = $total->memberId;
            $entry['name'] = $total->first_name;
        }
        


        $result = $entry;

        $final[] = [
            'result' => $result,
            'total_asset' => $total_asset,
            'total_other_asset' => $total_other_asset,
            'total_non_asset' => $total_non_asset,
            'total_all_asset' => $total_asset + $total_other_asset + $total_non_asset,
            'total_liability' => $total_liability,
            'total_non_liability' => $total_non_liability,
            'total_all_liability' => $total_liability + $total_non_liability,
            'total_equity' => $total_equity,
            'total_liability_equity' => $total_all_liability + $total_equity,
            'total_revenue' => $total_revenue,
            'total_expenses' => $total_expenses
        ];

    }

    return response()->json($final);
}

public function totaljourlastyear(Request $request)
{
    $startDate = $request->input('start_date');
    $endDate = $request->input('end_date');
    $yearDate = $request->input('year');
    $memberIds = $request->input('member_id');
    $journalIds = $request->input('journal_ids');

    $currentYear = date('Y');
    $previousYear = $currentYear - 1;

    $startingBalanceYear = $currentYear . '-01-01';
    $startOfYear = $previousYear . '-01-01';
    $endOfYear = $previousYear . '-12-31';

    if ($yearDate) {
        $startOfYear = $yearDate . '-01-01';
        $endOfYear = $yearDate . '-12-31';
    }

    $totalsQuery = DB::table('credits')
        ->join('lib_journals', 'credits.journals_id', '=', 'lib_journals.id')
        ->join('payables', 'credits.payables_id', '=', 'payables.id')
        ->join('transactions', 'payables.transaction_id', '=', 'transactions.id')
        ->join('members', 'transactions.members_id', '=', 'members.id')
        ->whereBetween('transactions.transaction_date', [$startOfYear, $endOfYear])
        ->groupBy('lib_journals.id', 'lib_journals.journal_name', 'lib_journals.journal_type')
        ->select('lib_journals.id as journId', 'lib_journals.journal_name', 'lib_journals.journal_type', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'));


    if ($startDate && $endDate) {
        $totalsQuery->whereBetween('transactions.transaction_date', [$startDate, $endDate]);
    } 

    if ($memberIds) {
        $totalsQuery->where('members.id', $memberIds);
        $totalsQuery->groupBy('lib_journals.id', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id', 'members.first_name');
        $totalsQuery->select('lib_journals.id as journId', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id as memberId', 'members.first_name', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'));
    }

    if ($journalIds) {
        $totalsQuery->where('lib_journals.id', $journalIds);
        $totalsQuery->groupBy('lib_journals.id', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id', 'members.first_name');
        $totalsQuery->select('lib_journals.id as journId', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id as memberId', 'members.first_name', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'));
    }

    $totals = $totalsQuery->get();
    $total_all_asset = 0;
    $total_asset = 0;
    $total_non_asset = 0;
    $total_other_asset = 0;
    $total_all_liability = 0;
    $total_liability = 0;
    $total_non_liability = 0;
    $total_equity = 0;
    $total_liability_equity = 0;
    $total_revenue = 0;
    $total_expenses = 0;
    $totalc = 0;
    $totald = 0;

    $result = [];
    $finallastyear = [];

    foreach ($totals as $total) {
        $journalType = strtolower($total->journal_type); // Assuming "journal_type" column exists in the "LibJournal" table

        switch ($journalType) {
        //Assets
            //Current Assets
            case 'cash and cash equivalents':
            case 'loans and receivables':
            case 'financial assets':
            case 'biologicals assets':
                $total_balance = $total->total_debit_amount - $total->total_credit_amount;
                $total_asset += $total_balance ;
                break;
            //Other Current Assets
            case 'other current assets':
                $total_balance = $total->total_debit_amount - $total->total_credit_amount;
                $total_other_asset += $total_balance ;
                break;
            //Non Current Assets
            case 'non current assets':
            case 'biological assets':
            case 'intangible assets':
                $total_balance = $total->total_debit_amount - $total->total_credit_amount;
                $total_non_asset += $total_balance ;
                break;
        //Liabilities
            //CURRENT Liability
            case 'liabilities':
            case 'other current liabilities':
                $total_balance = $total->total_credit_amount - $total->total_debit_amount;
                $total_liability += $total_balance;
                break;
            //Non CURRENT Liability
            case 'non current liabilities':
            case 'other non-current liabilities':
                $total_balance = $total->total_credit_amount - $total->total_debit_amount;
                $total_non_liability += $total_balance;
                break;
        //Equity
            case 'equity':
                $total_balance = $total->total_credit_amount - $total->total_debit_amount;
                $total_equity += $total_balance;
                break;
        //Revenue
            case 'revenue':
            case 'cost of goods sold':
            case 'cost of services':
                $total_balance = $total->total_debit_amount - $total->total_credit_amount;
                $total_revenue += $total_balance;
                break;
        //Expenses
            case 'expense':
            case 'subsidy/ gain (losses)':
                $total_balance = $total->total_credit_amount - $total->total_debit_amount;
                $total_expenses += $total_balance;
                break;
        }

        $entry = [
            'journId' => $total->journId,
            'journType' => $total->journal_type,
            'journal_name' => $total->journal_name,
            'total_balance' => $total_balance,
            'totalc' => $totalc,
            'totald' => $totald,
        ];

        if ($memberIds && isset($total->memberId)) {
            $entry['journId'] = $total->journId;
            $entry['memberId'] = $total->memberId;
            $entry['name'] = $total->first_name;
        }
        if ($journalIds && isset($total->journId)) {
            $entry['journId'] = $total->journId;
            $entry['memberId'] = $total->memberId;
            $entry['name'] = $total->first_name;
        }
        


        $result = $entry;

        $finallastyear[] = [
            'result' => $result,
            'total_asset' => $total_asset,
            'total_other_asset' => $total_other_asset,
            'total_non_asset' => $total_non_asset,
            'total_all_asset' => $total_asset + $total_other_asset + $total_non_asset,
            'total_liability' => $total_liability,
            'total_non_liability' => $total_non_liability,
            'total_all_liability' => $total_liability + $total_non_liability,
            'total_equity' => $total_equity,
            'total_liability_equity' => $total_all_liability + $total_equity,
            'total_revenue' => $total_revenue,
            'total_expenses' => $total_expenses,
            'startingBalanceYear' => $startingBalanceYear,
            'previousYear' => $previousYear
        ];

    }

    return response()->json($finallastyear);
}





public function totalmemjour(Request $request)
{
    $totals = DB::table('credits')
        ->join('lib_journals', 'credits.journals_id' , '=' , 'lib_journals.id')
        ->join('payables', 'credits.payables_id', '=', 'payables.id')
        ->join('transactions', 'payables.transaction_id', '=', 'transactions.id')
        ->join('members', 'transactions.members_id', '=', 'members.id')
        ->groupBy('lib_journals.id', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id', 'members.first_name')
        ->where('members.id', $request->id)
        ->select('lib_journals.id as  journal_id', 'lib_journals.journal_name','lib_journals.journal_type', 'members.id as member_id', 'members.first_name', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'))
        ->get();

    $result = [];

    foreach ($totals as $total) {
        $journalType = strtolower($total->journal_type); // Assuming "journal_type" column exists in the "LibJournal" table

        switch ($journalType) {
            case 'cash and cash equivalents':
            case 'loans and receivables':
                $totald = $total->total_debit_amount - $total->total_credit_amount;
                $totalc = 0;
                break;
            case 'current liabilities':
                $totalc = $total->total_credit_amount - $total->total_debit_amount;
                $totald = 0;
                break;
            default:
                $totalc = $total->total_credit_amount;
                $totald = $total->total_debit_amount;
                break;
        }

        $result[] = [
            'journal_id' => $total->journal_id,
            'member_id' => $total->member_id,
            'members_first_name' => $total->first_name,
            'journal_name' => $total->journal_name,
            'totalc' => $totalc,
            'totald' => $totald,
        ];
    }


    return response()->json($result);
}


public function totaljourmem(Request $request)
{
    $totals = DB::table('credits')
        ->join('lib_journals', 'credits.journals_id' , '=' , 'lib_journals.id')
        ->join('payables', 'credits.payables_id', '=', 'payables.id')
        ->join('transactions', 'payables.transaction_id', '=', 'transactions.id')
        ->join('members', 'transactions.members_id', '=', 'members.id')
        ->groupBy('lib_journals.id', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id', 'members.last_name', 'members.first_name')
        ->where('lib_journals.id', $request->id)
        ->select('lib_journals.id as  journal_id', 'lib_journals.journal_name','lib_journals.journal_type', 'members.id as member_id', 'members.last_name', 'members.first_name', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'))
        ->get();

    $result = [];

    foreach ($totals as $total) {
        $journalType = strtolower($total->journal_type); // Assuming "journal_type" column exists in the "LibJournal" table

        switch ($journalType) {
            case 'cash and cash equivalents':
            case 'loans and receivables':
                $totald = $total->total_debit_amount - $total->total_credit_amount;
                $totalc = 0;
                break;
            case 'current liabilities':
                $totalc = $total->total_credit_amount - $total->total_debit_amount;
                $totald = 0;
                break;
            default:
                $totalc = $total->total_credit_amount;
                $totald = $total->total_debit_amount;
                break;
        }

        $result[] = [
            'journal_id' => $total->journal_id,
            'member_id' => $total->member_id,
            'members_last_name' => $total->last_name,
            'members_first_name' => $total->first_name,
            'journal_name' => $total->journal_name,
            'totalc' => $totalc,
            'totald' => $totald,
        ];
    }


    return response()->json($result);
}

    public function store(Request $request)
    {
        //
    }

    public function DueDate()
{
    $records = Credits::all();

    $currentDate = Carbon::now();
    $results = [];

    foreach ($records as $record) {
        $databaseDate = Carbon::parse($record->due_date);
        $isPastCurrentDate = $databaseDate->lt($currentDate);

        $debit = Debits::where('credits_id', $record->id)->first(); // Assuming there's a one-to-one relationship between Credits and Debits using 'credit_id'

        if ($debit) {
            $interestRate = $debit->interest_rate; // Retrieve the interest_rate from the debit record
            $interest = $isPastCurrentDate ? ($record->amount + $interestRate) : 0; // Calculate interest if due date is passed
            $interestAmount = $record->interest * $debit->orig_amount;

            if ($isPastCurrentDate) {
                $debit->open_balance += $interestRate; // Add the interest_rate to the open_balance
                $debit->save(); // Save the updated debit record

                // Delete the interest_rate from the debit record
                $debit->interest_rate = 0;
                $debit->save();
            }
        } else {
            $interest = 0; // If no associated debit record, set interest to 0
            $interestAmount = 0; // If no associated debit record, set interestAmount to 0
        }
        $results[] = [
            'id' => $record->id,
            'isPastCurrentDate' => $isPastCurrentDate,
            'interest' => $interest,
            'amount' => $interestAmount
        ];
    }

    return response()->json($results);
}




    public function getAccounts(Request $request)
    {
        $Dquery = Debits::with(['debt.cred.entries', 'debt.cred.transac.member']);
        if($request->open_balance){
            $Dquery->where('open_balance', '>=', $request->open_balance)
                    ->where('paymentIdentifier', '!=', $request->paymentIdentifier);
        }
        if($request->id){
            $Dquery->whereHAs('debt.cred.transac.member', function($query) use($request){
                $query->where('id', $request->id);
            });
        }
        $debit = QueryBuilder::for($Dquery);
        return DebitsResource::collection($debit->get());
        // $debit = $Dquery->get();
        // return response()->json($debit
        // ,200);
    }

    public function transacList(){
        $transac = Transactions::all();
        return response()->json($transac);
         }

    public function transacInfo($id){
            $transac = Transactions::find($id);
            return response()->json($transac);
             }

    public function journalLogs(Request $request){
        $LogsQuery = JournalLogs::query()->with(['memberlogs', 'entrylogs']);

        // if($request->journal_no){
        //     $LogsQuery->whereHAs('', function($query) use($request){
        //         $query->where('journal_no', $request->journal_no);
        //     });
        // }
        if($request->account){
            $LogsQuery->whereHAs('entrylogs', function($query) use($request){
                $query->where('journals_id', $request->account);
            });
        }
        if($request->member){
            $LogsQuery->whereHAs('memberlogs', function($query) use($request){
                $query->where('members_id', $request->member);
            });
        }
        $logs = QueryBuilder::for($LogsQuery);
            return JournalLogsResource::collection($logs->get());
    }

    public function journalLogsId($journal_no)
{
    $logs = JournalLogs::whereHas('memberlogs', function ($query) use ($journal_no) {
        $query->where('journal_no', $journal_no);
    })->with(['memberlogs', 'entrylogs'])->get();

    return JournalLogsResource::collection($logs);
}


    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function ledgerList(Request $request)
{
    $totals = DB::table('credits')
        ->join('lib_journals', 'credits.journals_id' , '=' , 'lib_journals.id')
        ->join('payables', 'credits.payables_id', '=', 'payables.id')
        ->join('transactions', 'payables.transaction_id', '=', 'transactions.id')
        ->join('members', 'transactions.members_id', '=', 'members.id')
        ->groupBy('lib_journals.id', 'lib_journals.journal_name', 'lib_journals.journal_type', 'members.id', 'members.first_name')
        ->where('lib_journals.id', $request->id)
        ->select('lib_journals.id as  journal_id', 'lib_journals.journal_name','lib_journals.journal_type', 'members.id as member_id', 'members.first_name', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'))
        ->get();

    $result = [];

    foreach ($totals as $total) {
        $journalType = strtolower($total->journal_type); // Assuming "journal_type" column exists in the "LibJournal" table

        switch ($journalType) {
            case 'cash and cash equivalents':
            case 'loans and receivables':
                $totald = $total->total_debit_amount - $total->total_credit_amount;
                $totalc = 0;
                break;
            case 'current liabilities':
                $totalc = $total->total_credit_amount - $total->total_debit_amount;
                $totald = 0;
                break;
            default:
                $totalc = $total->total_credit_amount;
                $totald = $total->total_debit_amount;
                break;
        }

        $result[] = [
            'journal_id' => $total->journal_id,
            'member_id' => $total->member_id,
            'members_first_name' => $total->first_name,
            'journal_name' => $total->journal_name,
            'totalc' => $totalc,
            'totald' => $totald,
        ];
    }


    return response()->json($result);
}

    public function getTransactionNo(Request $request)
{
    $memberIds = $request->input('member_id');

    $totalsQuery = DB::table('transactions')
        ->whereExists(function ($query) {
            $query->select(DB::raw(1))
                ->from('payables')
                ->join('credits', 'payables.id', '=', 'credits.payables_id')
                ->whereColumn('payables.transaction_id', 'transactions.id')
                ->whereRaw('credits.debit_amount <> credits.credit_amount');
        });

    if ($memberIds) {
        $totalsQuery->where('members_id', $memberIds);
    }

    $totals = $totalsQuery->get();
    return response()->json($totals);
}


    public function getTransactionList(Request $request){

        $transactionNo = $request->input('transactionNum');
        $memberId = $request->input('memberID');

            $transacQuery = DB::table('credits')
            ->join('lib_journals', 'credits.journals_id', '=', 'lib_journals.id')
            ->join('payables', 'credits.payables_id', '=', 'payables.id')
            ->join('transactions', 'payables.transaction_id', '=', 'transactions.id')
            ->join('members', 'transactions.members_id', '=', 'members.id')
            ->where('members.id', $memberId)
            ->groupBy('transactions.id', 'transactions.transaction_number' , 'transactions.transaction_number','journals_id', 'journal_name', 'journal_number', 'description', 'due_date', 'debit_amount', 'credit_amount','credits.payables_id','credits.status')
            ->select('transactions.id','transactions.transaction_number', 'journals_id as journId', 'journal_name', 'journal_number', 'description', 'due_date', 'debit_amount', 'credit_amount','payables_id as paysId','credits.status');

        if($transactionNo){
            $transacQuery->where('transactions.transaction_number', $transactionNo);
        }

        $totals = $transacQuery->get();
        return response()->json($totals);
    }

    public function getTransactionDebits(Request $request){

        $transactionNo = $request->input('transactionNum');
        $memberId = $request->input('memberID');

        $transacQuery = DB::table('debits')
        ->join('credits', 'debits.credits_id', '=', 'credits.id')
        ->join('lib_journals', 'credits.journals_id', '=', 'lib_journals.id')
        ->join('payables', 'credits.payables_id', '=', 'payables.id')
        ->join('transactions', 'payables.transaction_id', '=', 'transactions.id')
        ->join('members', 'transactions.members_id', '=', 'members.id')
        ->where('members.id', $memberId)
        ->groupBy('transactions.id', 
                'transactions.transaction_number', 
                'journals_id', 
                'journal_name', 
                'journal_number', 
                'description', 
                'debit_amount', 
                'credit_amount', 
                'credits.payables_id', 
                'debits.open_balance',  
                'debits.orig_amount',  
                'debits.due_date',
                'debits.interest_rate',
                'debits.id', 
                'credits.id', 
                'credits.status')
        ->select('transactions.id', 
                'transactions.transaction_number', 
                'journals_id as journId', 
                'journal_name', 
                'journal_number', 
                'description', 
                'debit_amount', 
                'credit_amount', 
                'credits.payables_id as paysId', 
                'debits.open_balance',  
                'debits.orig_amount',
                'debits.due_date',
                'debits.interest_rate',
                'debits.id as debsId', 
                'credits.id as credsId', 
                'credits.status');

        if($transactionNo){
            $transacQuery->where('transactions.transaction_number', $transactionNo);
        }

        $totals = $transacQuery->get();
        return response()->json($totals);
    }
}
