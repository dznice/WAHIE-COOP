<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Credits;
use App\Models\Transactions;
use App\Models\Payables;
use App\Http\Resources\TransactionsResource;
use App\Http\Resources\PayablesResource;
use App\Http\Resources\CreditsResource;
use Spatie\QueryBuilder\QueryBuilder;


class AccountingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $Cquery = Credits::query()->with(['cred', 'cred.entries', 'cred.transac.member']);
        // $credit = QueryBuilder::for($Cquery);
        //     return CreditsResource::collection($credit->get());
        // $Pquery = Payables::query()->with(['entries', 'transac.member', 'creds']);
        // $payables = QueryBuilder::for($Pquery);
        //     return PayablesResource::collection($payables->get());

        $Cquery = Credits::query()->with(['cred', 'cred.entries', 'cred.transac.member']);

$credit = QueryBuilder::for($Cquery)
            ->join('payables', 'payables.id', '=', 'credits.payables_id')
            ->select('credits.*', 'payables.id', DB::raw('SUM(credits.credit_amount) as total_credit_amount'))
            ->groupBy('credits.id')
            ->distinct('credits.id')
            ->get();

return CreditsResource::collection($credit);

        $Tquery = Transactions::query()->with('member');
        $transac = QueryBuilder::for($Tquery);
            return TransactionsResource::collection($transac->get());
    }

    /**
     * Store a newly created resource in storage.
     */
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
