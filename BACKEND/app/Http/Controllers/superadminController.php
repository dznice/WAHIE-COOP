<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\MailOtp;
use App\Models\EmailOtp;
use App\Mail\enableAdmin;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;


//controller for superadmin
class superadminController extends Controller
{
    public function update(Request $request)
    {
        
        $user = user::find($request->id);
       $status = $request->status;

        if($user->status==1){
        
                $user->status = $status;
    
        }
        elseif($user->status!=1){
            $user->status =  $status;

            if($user->code!=0){
            $code = $user->code;
            $email = $user->email;
            
            EmailOtp::create([
                'user_email'=> $email,
                'code' => $code
            ]);
            Mail::to(auth()->user()->$email)->send(new MailOtp($code,$email));
            }

            elseif($user->code==0){
                $code = 0;
                $email = $user->email;
                EmailOtp::create([
                    'user_email'=> $email,
                    'code' => $code
                ]);
                Mail::to(auth()->user()->$email)->send(new enableAdmin($code,$email));
            }

        }
        $user->save();
        return back();
    }
    public function fChange(Request $request)
    {
        $user = user::find($request->id);
        $newPass = $request->new_password;
        $conPass = $request->password_confirm;
        $this->Validate($request,[
            'new_password' => 'required|min:8|same:password_confirm'
        ]);

       if($newPass==$conPass){
        $user->code = 0;
        $user->password = hash::make($request->new_password);
        $user->save();
        session(['new_password' => $request->new_password]);
        return redirect()->route('super.home');
       }else{
        return back()->withErrors('Password mismatch!');
       }
       
    }
   
}

?>