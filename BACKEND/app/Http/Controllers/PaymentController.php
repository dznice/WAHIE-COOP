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

            $credits = new Credits;
            $credits->users_id = $request->userId;
            $credits-> journals_id = null;
            $credits-> payables_id = $pays;
            $credits->save();
            $creds = $credits->id;

            $paymentData = $request->input();
            foreach ($paymentData['payables'] as $key => $value)
            {

                if ( $value['payment'] == null){

                }else{

                    $debits = new Debits;
                    $debits->credits_id = $value['creditId'];
                    $debits->orig_amount = $value['origAmount'];
                    $debits->open_balance = $value['openBalance'] - $value['payment'];
                    $debits->pay_date = $request->paymentDate;
                    $debits->paymentMethod = $request->paymentMethod;

                    if ( $value['openBalance'] - $value['payment'] == 0)
                    {
                        $debits->status = "Paid";
                    }else{
                        $debits->status = "Pending";
                    }
                    $debits->save();

                    $debiti = Debits::find($value['debitId']);
                    $debiti->paymentIdentifier = "Closed";
                    $debiti->status = "Closed";
                    $debiti->payment = $value['payment'];
                    $debiti->credits_id = $creds;
                    $debiti->save();

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
