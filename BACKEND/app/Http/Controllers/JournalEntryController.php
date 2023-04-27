<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Entries;
use App\Models\Journal;

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
            $journals = new Journal;
            $journals->journal_no = $request->journal_no;
            $journals->journal_date = $request->journal_date;
            $journals->save();
            $entryData = $request->input();
            foreach ($entryData['entries'] as $key => $value)
            {
                $entry = new Entries;
                $entry->journal_no = $request->journal_no;
                $entry->account = $value['account'];
                $entry->debit = $value['debit'];
                $entry->credit = $value['credit'];
                $entry->description = $value['description'];
                $entry->name = $value['name'];
                $entry->save();
            }
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
