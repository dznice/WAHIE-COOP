<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Members;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Mail\MailOtp;
use App\Models\EmailOtp;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Support\Facades\Mail;
use App\Mail\resendOtp;



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

    
       public function members(){
        $member = Members::all();
        return response()->json($member);
         }

    public function register(Request $request){
        $validated = $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_pass' => 'required|same:password'
        ]);
        

            $code = rand(100000,999999);

            $user = User::create([ 
            'name' => $request['first_name'],
            'email' => $request['email'],
            'role_id' => '3',
            'fillInfo' => '1',
            'password' => Hash::make($request['password']),
            'code' => $code,  
            ]);

         

            $email = $request['email'];
            EmailOtp::create([
            'user_email'=> $email,
            'code' => $code
             ]);
            Mail::to($email)->send(new MailOtp($code,$email));
      


            $members = Members::create([ 
                'first_name' => $request['first_name'], 
                'middle_name' => $request['first_name'],
                'last_name' => $request['last_name'],
                'suffix' => $request['suffix'],
                'email' => $request['email'],
                'gender' => $request['gender'],
                'mobile_number' => $request['email'],
                'birthdate' => $request['birthdate'],
                'department' => $request['department'],
                'company_name' => $request['company_name'],
                'spouse' => null,
                'address' => null,
                'civil_status' => null,
                'tin_number' => null,
                'occupation' => null,
                'employment_status' => null,
                'company_address' => null,
                'job_title' => null,

                ]);
                return response()->json($user); 

             }

            
            public function submitOtp(Request $request, $id){
                $users = User::find($id);
               if($users->code==$request->code){
                $users->code = 0;
                $users->save();
                return response()->json($users); 
                // return $this->respondWithToken(true);
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


            
   


            public function memberInfo(Request $request, $id){

                $members = Members::find($id);
                $members->spouse = $request->spouse;
                $members->address = $request->address;
                $members->civil_status = $request->civil_status;
                $members->tin_number = $request->tin_number;
                $members->occupation = $request->occupation;
                $members->employment_status = $request->employment_status;
                $members->company_address = $request->company_address;
                $members->job_title = $request->job_title;     
                $members->save();
                return response()->json($members);  
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