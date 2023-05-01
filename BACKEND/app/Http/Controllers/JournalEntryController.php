<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Entries;
use App\Models\Journal;
use App\Models\Transactions;
use App\Models\Payables;
use App\Models\Credits;
use App\Models\Debits;
use DB;

class JournalEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function getEntries($id=null)
    {
        if(empty($id)){
            $entries = Entries::get();
            return response()->json(["entries"=>$entries]);
        }else{
            $entries = Entries::find($id);
            return response()->json(["entries"=>$entries]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        
        if($request->isMethod('post')){

            $entryData = $request->input();
            $journals = new Transactions;
            $credits = new Credits;
            
            foreach ($entryData['entries'] as $key => $value)
            {
                // $credits-> journals_id =$value['account'];
                // $credits-> amount = $value['credit'];
                // $credits->payables_id = $payables;
                // $credits->save();
                

                
                // $filter = collect($memberid)->filter()->all();
                $members_id = $value['name'];
            }
           
            
            $journals->members_id = $members_id;
            $journals->transaction_number = $request->journal_no;
            $journals->transaction_date = $request->journal_date;
            $journals->save();
            $jorn = $journals->id;

            

            $payables = new Payables;
            $payables->transaction_id = $jorn;
            $payables->entry_id = "1";
            $payables->transaction_number = $request->journal_no;
            $payables->save();
            $pays = $payables->id;

            foreach ($entryData['entries'] as $key => $value)
            {
                if ( $value['credit'] == null ){
                    // continue;
                }else{
                $credits-> journals_id = $value['account'];
                $credits-> amount = $value['credit'];
                $credits-> payables_id = $pays;
                $credits->save();
                }

                $credi = $value['credit'];
                $cred = $credi + $credi;
                $debii = $value['debit'];
                $debi = $debii + $debii;
                
            }
            echo $debi;
            // $credits->users_id="1";
            // $credits->journals_id = $journals_id;
           
            $creds = $credits->id;

                $balance = $cred - $debi;
                if( $balance == 0 ){
                    $status = "0";
                }else{
                    $status = "1";
                }

            $debits = new Debits;
            $debits->credits_id = $creds;
            $debits->open_balance = $balance;
            $debits->payment = $debi;
            $debits->status = $status;

            $debits->save();


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
