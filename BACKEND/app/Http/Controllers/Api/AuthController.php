<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Members;
use App\Models\forgotPass;
use App\Models\forLogo;
use App\Models\BenificiaryMembers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Mail\adminAdd;
use App\Mail\MailOtp;
use App\Mail\forgotPassword;
use App\Models\EmailOtp;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Support\Facades\Mail;
use App\Mail\resendOtp;
use Hamcrest\Core\HasToString;
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
  
         return response()->json($members);
         }

    public function register(Request $request){
        $validated = $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_pass' => 'required|same:password'
        ]);


            $code = rand(100000,999999);

            $user = User::create([
            'name' => ucfirst($request['first_name']),
            'email' => $request['email'],
            'role_id' => '3',
            'fillInfo' => '1',
            'department' => $request['department'],
            'password' => Hash::make($request['password']),
            'code' => $code,
            'status' => '2',
            ]);



            $email = $request['email'];
            EmailOtp::create([
            'user_email'=> $email,
            'code' => $code
             ]);
            Mail::to($email)->send(new MailOtp($code,$email));



            $members = Members::create([
                'first_name' => ucfirst($request['first_name']),
                'middle_name' => ucfirst($request['middle_name']),
                'last_name' => ucfirst($request['last_name']),
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


                ]);
                return response()->json($user);

             }

        public function adminadd(Request $request){
            $validated = $request->validate([
                'email' => 'required|email|unique:users'
            ]);

            $link = 'http://localhost:4200/login/';


            $password = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz-:,"),0,8);

            $email = $request['email'];

            Mail::to($email)->send(new adminAdd($password,$email));

            $pass = Hash::make($password);

            $user = User::create([
                'name' => $request['username'],
                'email' => $request['email'],
                'department' => 'Admin',
                'role_id' => '1',
                'fillInfo' => '0',
                'status' => '1',
                'password' =>$pass,
                'code' => '1',
                ]);

            $preLogo = 'coop-logo.png';
            $logo = forLogo::create([
                    'adminId' =>$user->id,
                    'logo' => $preLogo,
                    ]);
    
            

            return response()->json($logo);
        }


    public function forgotPass(Request $request,$email){
          
        $user = User::where('email', '=', $email)->first();     
        $secret = forgotPass::where('userId', '=',$user->id)->first();   
        $count = forgotPass::where('userId', '=',$user->id)->count();
        $url = Str::random(30);
        $token = $user->password;
        $id = $user->id;
        $link = 'http://localhost:4200/change-pass/'. $id . '/' .  $url;

        EmailOtp::create([
        'user_email'=> $email,
        'code' => 0
        ]);
        Mail::to($email)->send(new forgotPassword($link,$email));

        if($count!=0){
            $secret->delete();    
        }
        $secret = forgotPass::create([
        'userId' => $id,
        'secret' => $token
         ]);
        return response()->json($user);
        
         
    }
    


    public function forgotChange(Request $request,$id){
        $secret = forgotPass::where('userId', '=',$id)->first();     
        $users = User::where('id', '=',$id)->first();

        $returnData = array(
            'status' => 'error',
            'message' => 'Wrong credentials!'
        );

        if($secret){   
            if($secret->secret == $users->password){
                if($request->password != $request->confirm_pass){
                    return  response()->json($returnData, 402);
                }
                else if($request->password == $request->confirm_pass){   
                    $secret->delete();                    
                    $users->password = Hash::make($request->password);
                    $users->save();
                    return response()->json($users);
                }     
            }
            return  response()->json($returnData, 401);
        }
        return  response()->json($returnData, 404);
    }


    public function changePass(Request $request, $email){
        $user = User::where('email', '=',$email)->first();
        $secret = forgotPass::where('userId', '=',$user->id)->first();   
        $count = forgotPass::where('userId', '=',$user->id)->count();
        $returnData = array(
            'status' => 'error',
            'message' => 'Wrong credentials!'
        );
            if($user && Hash::check($request->current_pass, $user->password))
            {
                    if($request->new_pass==$request->retype_pass){
                        if($count!=0){
                            $secret->delete();    
                        }

                    $user->password = Hash::make($request->new_pass);
                    $user->save();
                    return response()->json($user);
                    }
                
                    return  response()->json($returnData, 401);
                }             
                    return  response()->json($returnData, 401);
    }




    public function submitOtp(Request $request, $id){
                $users = User::find($id);
                $returnData = array(
                    'status' => 'error',
                    'message' => 'Wrong credentials!'
                );
               if($users->code==$request->code){
                $users->code = 0;
                $users->save();
                return response()->json($users);
                // return $this->respondWithToken(true);
               }
               return  response()->json($returnData, 401);
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


            
   
            public function memberAccounting($id){
                $mem = Members::find($id);
                return response()->json($mem);
            }



            public function memberInfo(Request $request, $email){
              
              


                
                $members = Members::where('email', '=', $email)->first();
                    $members->spouse = $request->spouse;
                    $members->civil_status = $request->civil_status;
                    $members->tin_number = $request->tin_number;
                    $members->occupation = $request->occupation;
                    $members->employment_status = $request->employment_status;
                    $members->company_address = $request->company_address;
                    $members->address = $request->current_address.' ' . $request->selectedBarangayDescription .' ' .
                    $request->selectedCityDescription .' ' . $request->selectedProvinceDescription .' ' . $request->selectedRegionDescription .' ' . $request->postal_code;
                    
                    $members->save();

                    
                    

                    $bene = $request->input();
                   

                    
                        foreach($bene['row'] as $key=>$value){
                           
                                 BenificiaryMembers::create([
                                'benificiary_id' =>  $members->id,
                                'benificiary_name' =>  $value['benificiary_name'],
                                'benificiary_birthdate'=>  $value['benificiary_birthdate'],
                                'benificiary_relation' =>  $value['benificiary_relation'],
                                ]);
                         }

                        

                     
               
                        $user = User::where('email', '=', $email)->first();
                        $user->fillInfo = 0;
                        $user->save();
                  
                      
                return response()->json($members);
            

            }

            
            public function skipAddInfo($email){
                $user = User::where('email', '=', $email)->first();
                $user->fillInfo = 0;
                $user->save();
                return response()->json($user);      
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
