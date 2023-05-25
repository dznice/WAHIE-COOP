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



    public function totaljour()
    {
        $totals = LibJournal::join('credits', 'lib_journals.id', '=', 'credits.journals_id')
            ->groupBy('lib_journals.id', 'lib_journals.journal_name')
            ->select('lib_journals.id','lib_journals.journal_name', DB::raw('SUM(credits.credit_amount) as total_credit_amount'), DB::raw('SUM(credits.debit_amount) as total_debit_amount'))
            ->get();

        return response()->json($totals);
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
}
