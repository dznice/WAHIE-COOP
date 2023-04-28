<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Members;
use App\Models\BenificiaryMembers;
use Illuminate\Support\Facades\Hash;
use App\Mail\resendOtp;
use App\Models\EmailOtp;
use Illuminate\Support\Facades\Mail;

class userController extends Controller
{
    public function users(){
   $users = User::all();
   return response()->json($users);
    }

    public function activateUser(Request $request, $id){
        $users = User::find($id);
        $users->update($request->all());
        return response()->json($users); 
    }

    public function superChange(Request $request, $id){

        $users = User::find($id);
        $users->password = Hash::make($request['password']);
        $users->code = 0;
        $users->save();
        return response()->json($users); 
    }

    public function memberList(){
        $member = Members::all();
        return response()->json($member);
         }

         
    public function beneficiaries(){
        $beneficiary = BenificiaryMembers::all();
        return response()->json($beneficiary);
             }
     
    public function memberInfo($id){
        $member = Members::find($id);
        return response()->json($member);
         }
                
}
