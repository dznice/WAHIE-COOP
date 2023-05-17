<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Credits;
use App\Models\Transactions;
use App\Models\Payables;
use App\Models\Debits;
use App\Models\LibJournal;
use App\Http\Resources\TransactionsResource;
use App\Http\Resources\PayablesResource;
use App\Http\Resources\CreditsResource;
use App\Http\Resources\DebitsResource;
use Spatie\QueryBuilder\QueryBuilder;


class AccountingController extends Controller
{

    public function index()
    {
        $Dquery = Debits::query()->with(['debt.journ', 'debt.cred.entries', 'debt.cred.transac.member']);
        $debit = QueryBuilder::for($Dquery);
            return DebitsResource::collection($debit->get());
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


    public function store(Request $request)
    {
        //
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
