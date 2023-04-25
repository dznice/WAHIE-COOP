<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Mail\MailOtp;
use App\Models\EmailOtp;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Support\Facades\Mail;


class AuthController extends Controller {

    /**
     * user authenticate with jwt 
     * 
     * @return type
     */
    
    public function login(){
        $credentials = request(['email','password']);

        (!$token=auth()->attempt($credentials));{
        
        }
        return $this->respondWithToken($token);

       } 

    


    public function register(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_pass' => 'required|same:password'
            
        ]);

            $code = rand(100000,999999);

            $user = User::create([ 
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            'code' => $code,
            ]);

            $email = $request['email'];
            EmailOtp::create([
            'user_email'=> $email,
            'code' => $code
             ]);
            Mail::to($email)->send(new MailOtp($code,$email));

            response()->json(['message' => "Success", 'user'=>$user,200]);

            }


            
          
        


    /**
     * user logout
     * 
     * @return type
     */


    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
    
       /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
 
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * get token array structure
     * 
     * @param type $token
     * @return type
     */
    protected function respondWithToken($token) {
        return response()->json([
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth()->factory()->getTTL() * 60,
                    'user' => auth()->user()


        ]);
    }

}