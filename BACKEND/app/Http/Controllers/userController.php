<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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


     
    public function submitOtp(Request $request, $id){
        $users = User::find($id);
       if($users->code==$request->code){
        $users->code = 0;
        $users->save();
        return response()->json($users); 
       }
    }
    
    public function resendOtp($id){
        $users = User::find($id);

        $email = $users->email;
        $code = $users->code;

            EmailOtp::create([
            'user_email'=> $email,
            'code' => $code
             ]);
            Mail::to($email)->send(new resendOtp($code,$email));

            response()->json(['message' => "Success", 'user'=>$users,200]);
    }
                
}
