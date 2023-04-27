<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LibJournal;

class LibJournalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LibJournal::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return LibJournal::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return LibJournal::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if(Journal::where('id', $id)->exists()){
            $journal = LibJournal::find($id);
            $journal->journal_number = $request->journal_number;
            $journal->journal_name = $request->journal_name;
            $journal->journal_type = $request->journal_type;

            $journal->save();
            return response()->json([
                "message" => "journal updated successfully" 
            ], 200);
        }else{
            return response()->json([
                "message" => "Journal not found"
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Journal::where('id', $id)->exists()){
            $journal = LibJournal::find($id);
            $journal->delete();

            return response()->json([
                "message" => "journal deleted" 
            ], 200);
        }else{
            return response()->json([
                "message" => "Journal not found"
            ], 404);
        }
    }
}
