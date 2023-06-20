<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Entries;
use App\Models\Journal;
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
        if($request->isMethod('post')){
            $paymentData = $request->input();
                
                    $journals = new Transactions;
                    $journals->members_id = $request->memberId;
                    $journals->users_id = $request->userId;
                    $journals->transaction_date = $request->paymentDate;
                    $journals->save();
                    $jorn = $journals->id;

                    $payables = new Payables;
                    $payables->transaction_id = $jorn;
                    $payables->entry_id = "3";
                    $payables->save();
                    $pays = $payables->id;

                    $payment = 0;

                    $creditss = Credits::where('payables_id', $request->paysId)->get();

                    foreach ($paymentData['payables'] as $key => $value) {
                        $matchingCredits = $creditss->where('journals_id', $value['account'])
                                                    ->where('status', '!=', 'CloseTransact');
        
                                if ($matchingCredits->isNotEmpty()) {
                            foreach ($matchingCredits as $matchingCredit) {
                                $matchingCredit->users_id = $request->userId;
                            
                                if ($value['credit'] == 0) {
                                    // Only Debit amount is provided
                                    $creditValue = $matchingCredit->debit_amount ?: $matchingCredit->credit_amount;
                                    $credVal = $value['debit'];
                                    if ( ($matchingCredit->debit_amount + $credVal) < ($matchingCredit->credit_amount ?: $matchingCredit->debit_amount) ){
                                        $matchingCredit->credit_amount = $matchingCredit->credit_amount ?: $matchingCredit->debit_amount;
                                        $matchingCredit->debit_amount += $value['debit'];
                                    }else{
                                        $matchingCredit->credit_amount = $matchingCredit->credit_amount ?: $matchingCredit->debit_amount;
                                        $matchingCredit->debit_amount = $matchingCredit->credit_amount ?: $matchingCredit->debit_amount;
                                    }
                                } else if ($value['debit'] == 0){
                                    // Only Credit amount is provided
                                    $debitValue = $matchingCredit->credit_amount ?: $matchingCredit->debit_amount;
                                    $debVal = $value['credit'];
                                    if ( ($matchingCredit->credit_amount + $debVal) < ($matchingCredit->debit_amount ?: $matchingCredit->credit_amount) ){
                                        $matchingCredit->credit_amount += $value['credit'];
                                        $matchingCredit->debit_amount = $matchingCredit->debit_amount ?: $matchingCredit->credit_amount;
                                    }else{
                                        $matchingCredit->credit_amount = $matchingCredit->debit_amount ?: $matchingCredit->credit_amount;
                                        $matchingCredit->debit_amount = $matchingCredit->debit_amount ?: $matchingCredit->credit_amount;
                                    }
                                }
                            
                                $matchingCredit->journals_id = $value['account'];
                                $matchingCredit->save();
                            
                                $payment += $value['debit'];
                            }
                        
                    
                    
                        } else {
                            // Create a new record
                            $newCredits = new Credits();
                            $newCredits->payables_id = $request->paysId;
                            $newCredits->users_id = $request->userId;
                            $newCredits->credit_amount = $value['credit'];
                            $newCredits->debit_amount = $value['debit'];
                            $newCredits->journals_id = $value['account'];
                            $newCredits->status = "Closed";
                            $newCredits->save();
                        }
                    }

                    
                    foreach ($paymentData['payables'] as $key => $value) {
                        $matchCredit = new Credits();
                        $matchCredit->users_id = $request->userId;
                        $matchCredit->payables_id = $request->paysId;
                        $matchCredit->credit_amount = $value['credit'];
                        $matchCredit->debit_amount = $value['debit'];
                        $matchCredit->journals_id = $value['account'];
                        $matchCredit->status = "CloseTransact";
                        $matchCredit->save();
                    }
            

                    $credits = Credits::find($request->transactionNo);
                    $credits->users_id = $request->userId;
                    $credits->credit_amount = 0;
                    $credits->debit_amount = 0;
                    $credits-> journals_id = null;
                    $credits-> payables_id = $pays;
                    $credits->save();
                    $creds = $credits->id;

                    $debits = new Debits;
                    $debits->credits_id = $request->credsId;
                    $debits->orig_amount = $request->orig_amount;
                    $debits->open_balance = $request->open_balance - $payment;
                    $debits->payables_id =  $request->paysId;
                    $debits->paymentMethod = $request->paymentMethod;
                    $debits->pay_date = $request->paymentDate;
                    $debits->due_date =  $request->due_date;
                    $balanse = $request->open_balance - $payment;

                    if ( $balanse == 0)
                    {
                        $debits->status = "Paid";
                    }else{
                        $debits->status = "Pending";
                    }
                    $debits->save();

                    $debiti = Debits::find($request->debsId);
                    $debiti->paymentIdentifier = "Closed";
                    $debiti->status = "Closed";
                    $debiti->payment =  $payment;
                    $debiti->pay_date = $request->paymentDate;
                    $debiti->open_balance = null;
                    $debiti->credits_id = $creds;
                    $debiti->payables_id =  $request->paysId;
                    $debiti->save();

                

                return response()->json(['message'=>'Entry added successfully!']);

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
