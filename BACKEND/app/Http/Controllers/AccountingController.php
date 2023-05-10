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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Dquery = Debits::query()->with(['debt.cred.entries', 'debt.cred.transac.member']);
        $debit = QueryBuilder::for($Dquery);
            return DebitsResource::collection($debit->get());

    //     $Cquery = Credits::query()->with(['cred.entries', 'cred.transac.member']);
    //     $credit = QueryBuilder::for($Cquery);
    //         return CreditsResource::collection($credit->get());
    //     $Pquery = Payables::query()->with(['entries', 'transac.member']);
    //     $payables = QueryBuilder::for($Pquery);
    //         return PayablesResource::collection($payables->get());



    //     $Tquery = Transactions::query()->with('member');
    //     $transac = QueryBuilder::for($Tquery);
    //         return TransactionsResource::collection($transac->get());
    }

    /**
     * Store a newly created resource in storage.
     */

     public function total()
    {
        $totals = LibJournal::join('credits', 'lib_journals.id', '=', 'credits.journals_id')
            ->groupBy('lib_journals.id')
            ->select('lib_journals.id', DB::raw('SUM(credits.credit_amount) as total_credit_amount'))
            ->get();

            return response()->json($totals);


    }

    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
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
