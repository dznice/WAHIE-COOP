<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transactions;
use App\Models\Payables;
use App\Http\Resources\TransactionsResource;
use App\Http\Resources\PayablesResource;
use Spatie\QueryBuilder\QueryBuilder;


class AccountingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Pquery = Payables::query()->with(['entries', 'transac']);
        $payables = QueryBuilder::for($Pquery);
            return PayablesResource::collection($payables->get());
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
