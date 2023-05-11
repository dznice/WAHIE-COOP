<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Members;
use App\Models\forgotPass;
use App\Models\BenificiaryMembers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Mail\MailOtp;
use App\Mail\forgotPassword;
use App\Models\EmailOtp;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Support\Facades\Mail;
use App\Mail\resendOtp;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\Providers\JWT;



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

       public function beneficiaries(){
        $bene = BenificiaryMembers::all();
        return response()->json($bene);
         }
    
       public function members(){
        $member = Members::all();
        return response()->json($member);
         }

        public function getmemberId($email){
         $members = Members::where('email', '=', $email)->first();
            $memberId = $members->id;
         return response()->json($memberId); 
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
                'middle_name' => $request['middle_name'],
                'last_name' => $request['last_name'],
                'suffix' => $request['suffix'],
                'email' => $request['email'],
                'gender' => $request['gender'],
                'mobile_number' => $request['mobile_number'],
                'birthdate' => $request['birthdate'],
                'department' => $request['department'],
                'company_name' => $request['company_name'],
                'spouse' => "",
                'address' => "",
                'civil_status' => "",
                'tin_number' => "",
                'occupation' => "",
                'employment_status' => "",
                'company_address' => "",
                'job_title' => "",

                ]);
                return response()->json($user); 

             }

            
    public function forgotPass(Request $request,$email){
        $user = User::where('email', '=', $email)->first();
        $url = Str::random(30);
        $token = $user->password;   
        $id = $user->id;
        $link = 'http://localhost:4200/change-pass/'. $id . '/' .  $url;

        $secret = forgotPass::create([
            'userId' => $id,
            'secret' => $token       
        ]);
      

        EmailOtp::create([
        'user_email'=> $email,
        'code' => 0
         ]);
        Mail::to($email)->send(new forgotPassword($link,$email));

   
        return response()->json($user); 
    }

    public function forgotChange(Request $request,$id){
        $secret = forgotPass::where('userId', '=',$id)->first();
        $users = User::where('id', '=',$id)->first();
        if($secret){
            if($secret->secret == $users->password){   
            $secret->delete();
            $users->password = Hash::make($request->password);
            $users->save();
            return response()->json($users); 
        }
        }
    


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


            
   


            public function memberInfo(Request $request, $email){

                $members = Members::where('email', '=', $email)->first();
                    $members->spouse = $request->spouse;
                    $members->address = $request->address;
                    $members->civil_status = $request->civil_status;
                    $members->tin_number = $request->tin_number;
                    $members->occupation = $request->occupation;
                    $members->employment_status = $request->employment_status;
                    $members->company_address = $request->company_address;
                    $members->job_title = $request->job_title;     
                    $members->save();

                    $user = User::where('email', '=', $email)->first();
                    $user->fillInfo = 0;
                    $user->save();

                    $bene = $request->input();
                    foreach($bene['row'] as $key=>$value)
                    {
                             BenificiaryMembers::create([ 
                            'benificiary_id' =>  $value['benificiary_id'],
                            'benificiary_name' =>  $value['benificiary_name'],
                            'benificiary_birthdate'=>  $value['benificiary_birthdate'],
                            'benificiary_relation' =>  $value['benificiary_relation'],
                            ]);  
                     }
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