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
use App\Models\JournalLogs;
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
        $validated = $request->validate([
            'journal_no' => 'required|unique:transactions,transaction_number'
        ]);



        if($request->isMethod('post')){

            $entryData = $request->input();
            $journals = new Transactions;

            foreach ($entryData['entries'] as $key => $value)
            {
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

            $rate = $request->interest / 100;

            foreach ($entryData['entries'] as $key => $value)
            {
                $credits = new Credits;

                $credits->users_id = $request->userId;
                $credits-> journals_id = $value['account'];
                $credits-> due_date = $request->due_date;
                $credits-> interest = $rate;
                $credits->debit_amount = floatval($value['debit']);
                $credits->credit_amount = floatval($value['credit']);
                $credits-> payables_id = $pays;
                $credits->save();

                $creditssd = $value['credit'];
                $cre = $creditss + $creditssd;
            }

            foreach ($entryData['entries'] as $key => $value)
            {
                $crediters = new Credits;

                $crediters->users_id = $request->userId;
                $crediters-> payables_id = $pays;
                $crediters->journals_id = $value['account'];
                $crediters->debit_amount = floatval($value['debit']);
                $crediters->credit_amount = floatval($value['credit']);
                $crediters->status = "CloseTransact";
                $crediters->save();
            }

            $interate = $request->totalcredit * $rate;
            $creds = $credits->id;

            $debits = new Debits;
            $debits->credits_id = $creds;
            $debits->due_date = $request->due_date;
            $debits->interest_rate =  $interate;
            $debits->orig_amount = floatval($request->totalcredit);
            $debits->open_balance = floatval($request->totalcredit);
            $debits-> payables_id = $pays;
            $debits->payment = 0;
            $debits->status = "Pending";

            $debits->save();




            foreach ($entryData['entries'] as $key => $value)
            {
                $jlogs = new JournalLogs;
                $jlogs->members_id = $value['name'];
                $jlogs->journals_id = $value['account'];
                $jlogs->journal_no = $request->journal_no;
                $jlogs->journal_date = $request->journal_date;
                $jlogs->due_date = $request->due_date;
                $jlogs->interest = $request->interest;
                $jlogs->interest_amount = $interate;
                $jlogs->debit_amount = $value['debit'];
                $jlogs->credit_amount = $value['credit'];
                $jlogs->description = $value['description'];
                $jlogs->total_credit = $request->totalcredit;
                $jlogs->total_debit = $request->totalcredit;
                $jlogs->save();

            }
            return response()->json($jlogs);
        }
    }

    /**
     * Display the specified resource.
     */
    public function journId()
    {

        $data = DB::table('transactions')->pluck('transaction_number');
        $memberid = $data;

        $count = 1;
        $member = 1;
        $loop = true;
        $max = $memberid->max();

      while($loop == true){
        $id = 1;
        while($count<=$max){
      foreach ($memberid as $member) {
        if($member==$id){
        $id++;
        }
      }
        $count++;
        }
      $member = $id;
      $loop = false;
      }

      return $member;
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
