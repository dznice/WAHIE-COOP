<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Users;
use App\Models\Members;
use App\Http\Resources\UsersResource;
use App\Models\BenificiaryMembers;
use Illuminate\Support\Facades\Hash;
use App\Mail\enableAdmin;
use App\Mail\MailOtp;
use App\Models\EmailOtp;
use Illuminate\Support\Facades\Mail;
use Spatie\QueryBuilder\QueryBuilder;

class userController extends Controller
{
    public function users(){
   $users = User::all();
   return response()->json($users);
    }

    public function activateUser(Request $request, $id){
        $users = User::find($id);
        $users->update($request->all());
        $email = $users->email;
        $code = $users->code;
        if($users->status == '1'){
        if($code!=0){
            EmailOtp::create([
                'user_email'=> $email,
                'code' => $code
            ]);
            Mail::to($email)->send(new MailOtp($code,$email));
            }

            elseif($code==0){
                EmailOtp::create([
                    'user_email'=> $email,
                    'code' => $code
                ]);
                Mail::to($email)->send(new enableAdmin($code,$email));
            }

        }

            return response()->json($users);

    }


    public function superChange(Request $request, $id){

        $users = User::find($id);
        $users->password = Hash::make($request['password']);
        $users->code = 0;
        $users->save();
        return response()->json($users);
    }

    public function adminChange(Request $request, $id){

        $users = User::find($id);
        $users->name = $request->name; 
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

    public function myProfile($id){
    $user = Users::find($id);
    $email = $user->email;
    $myProf = Members::where('email','=',$email)->first();
    return response()->json($myProf);
    }

    

    public function userrole()
    {
     $query = Users::query()->with('userrole');
     $users = QueryBuilder::for($query);
     return UsersResource::collection($users->get());
    }

    public function memberAccount($email){
        $member = Members::where('email', '=', $email)->first();
        $memberId = $member->id;
        return response()->json($memberId);
    }

}
