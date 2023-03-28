<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Members;
use App\Http\Requests\addMember;
use App\Models\Member;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Exists;

class MemberInsertController extends Controller
{
    //
    public function insertform(){    
        
        $data = DB::table('members')->pluck('account_id');

            return view('member_create',['members'=> $data]);
        }
        public function insert(addMember $request){
       
            $input = $request->all();
        Members::create($input);
  
        return back()->with('success', 'Member created successfully.');
        
        }
        
}

       



