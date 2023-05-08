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
            $journals->users_id = $request->userId;
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

            $creditss = 0;

            foreach ($entryData['entries'] as $key => $value)
            {
                $credits = new Credits;

                $credits->users_id = $request->userId;
                $credits-> journals_id = $value['account'];
                $credits-> debit_amount = $value['debit'];
                $credits-> credit_amount = $value['credit'];
                $credits-> payables_id = $pays;
                $credits->save();


                $creditssd = $value['credit'];
            $cre = $creditss + $creditssd;


            }


            $creds = $credits->id;

            $debits = new Debits;
            $debits->credits_id = $creds;
            $debits->open_balance = $request->totalcredit;
            $debits->payment = 0;
            $debits->status = "Open";

            $debits->save();


            return response()->json(['message'=>'Entry added successfully!']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function journId()
    {

        $count = 1;
        $member = 1;
        $loop = true;
        $max = $members->max();

      while($loop == true){
        $id = 1;
        while($count<=$max){
      foreach ($members as $member) {
        if($member==$id){
        $id++;
        }
      }
        $count++;
        }
      $member = $id;
      $loop = false;
      }
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
