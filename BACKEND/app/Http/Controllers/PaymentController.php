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

                    $credits = Credits::where('payables_id', $request->paysId)->get();

                    foreach ($paymentData['payables'] as $key => $value) {
                        $matchingCredits = $credits->where('journals_id', $value['account']);

                        if ($matchingCredits->isNotEmpty()) {
                            // Update the existing matching records
                            foreach ($matchingCredits as $matchingCredit) {
                                    $matchingCredit->users_id = $request->userId;
                                    if ($value['credit'] !== null && $value['debit'] !== null) {
                                        // Both credit and debit amounts are provided
                                        $matchingCredit->credit_amount += $value['credit'];
                                        $matchingCredit->debit_amount += $value['debit']; // Add the new debit amount to the existing debit
                                    } elseif ($value['credit'] !== null) {
                                        // Only credit amount is provided
                                        $matchingCredit->credit_amount += $value['credit'];
                                        $matchingCredit->debit_amount += $value['debit']; // Add the new debit amount to the existing debit
                                    } elseif ($value['debit'] !== null) {
                                        // Only debit amount is provided
                                        $matchingCredit->credit_amount += $value['credit']; // Add the new credit amount to the existing credit
                                        $matchingCredit->debit_amount += $value['debit']; // Add the new debit amount to the existing debit
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
                            $newCredits->save();
                        }
                    }

                    
                    // $creds = $credits->id;

                    // $debits = new Debits;
                    // $debits->credits_id = $value['creditId'];
                    // $debits->orig_amount = $value['origAmount'];
                    // $debits->open_balance = $value['openBalance'] - $value['payment'];
                    // $debits->payables_id =  $value['payablesId'];
                    // $debits->paymentMethod = $request->paymentMethod;
                    // $debits->pay_date = $request->paymentDate;
                    // $debits->due_date =  $value['dueDate'];
                    // $balanse = $value['openBalance'] - $value['payment'];

                    // if ( $balanse == 0)
                    // {
                    //     $debits->status = "Paid";
                    // }else{
                    //     $debits->status = "Pending";
                    // }
                    // $debits->save();

                    // $debiti = Debits::find($value['debitId']);
                    // $debiti->paymentIdentifier = "Closed";
                    // $debiti->status = "Closed";
                    // $debiti->payment = $value['payment'];
                    // $debiti->pay_date = $request->paymentDate;
                    // $debiti->open_balance = null;
                    // $debiti->credits_id = $creds;
                    // $debiti->payables_id =  $value['payablesId'];
                    // $debiti->save();

                

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
