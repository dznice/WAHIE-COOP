<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Credits;
use App\Models\Transactions;
use App\Models\Payables;
use App\Models\Debits;
use App\Models\Payment;
use App\Models\Payment1;
use App\Http\Resources\TransactionsResource;
use App\Http\Resources\PayablesResource;
use App\Http\Resources\CreditsResource;
use App\Http\Resources\DebitsResource;
use Spatie\QueryBuilder\QueryBuilder;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // memQuery = Debits::query()->with(['debt.cred.entries', 'debt.cred.transac.member']);
        $memQuery = Payment::query()->with(['']);
        $debit = QueryBuilder::for($memQuery);
            return DebitsResource::collection($debit->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        {
            if($request->isMethod('post')){
                $payment = new Payment;
                $payment->received = $request->amountReceived;
                $payment->member = $request->member;
                $payment->email = $request->email;
                $payment->payment_date = $request->paymentDate;
                $payment->payment_method = $request->paymentMethod;
                $payment->reference_no = $request->referenceNo;
                $payment->deposit_to = $request->depositTo;
                $payment->save();
                $paymentData = $request->input();
                foreach ($paymentData['payables'] as $key => $value)
                {
                    $pay = new Payment1;
                    $pay->member = $request->member;
                    $pay->description = $value['description'];
                    $pay->due_date = $value['dueDate'];
                    $pay->open_balance = $value['openBalance'];
                    $pay->original_amount = $value['origAmount'];
                    $pay->payment = $value['payment'];
                    $pay->save();
                }
                return response()->json(['message'=>'Entry added successfully!']);
            }
        }
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
