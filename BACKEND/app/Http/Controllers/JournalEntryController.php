<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LibEntries;
use DB;

class JournalEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $journal_no = $request->journal_no;
        $journal_date = $request->journal_date;
        $account = $request->account;
        $debit = $request->debit;
        $credit = $request->credit;
        $description = $request->description;
        $name = $request->name;

        for ($i=0; $i <count($account); $i++){
            $datasave= [
                'journal_no'=>$journal_no,
                'journal_date'=>$journal_date,
                'account'=> $account[$i],
                'debit'=> $debit[$i],
                'credit'=> $credit[$i],
                'description'=> $description[$i],
                'name'=> $name[$i]
            ];
            //DB::table('trial')->insert($datasave);
            $trial = LibEntries::create($datasave);
        }
        //return redirect()->back();
        return response(['trial' => $trial]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
