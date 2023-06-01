<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Users;
use App\Models\Members;
use App\Models\departments;
use App\Models\actLog;
use App\Models\smsDue;
use App\Http\Resources\UsersResource;
use App\Models\BenificiaryMembers;
use Illuminate\Support\Facades\Hash;
use App\Mail\enableAdmin;
use App\Mail\MailOtp;
use App\Models\Debits;
use App\Models\Credits;
use App\Models\EmailOtp;
use App\Models\Payables;
use App\Models\Transactions;
use Illuminate\Support\Facades\Mail;
use Spatie\QueryBuilder\QueryBuilder;
use  Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use PDO;

class userController extends Controller
{

    public function users(){
   $users = User::all();
   return response()->json($users);
    }
    
    public function userMembers(){
        $members = User::where('role_id', '=', 3)->get();
        return response()->json($members);
    }

    public function navChangePass(Request $request){
        $user = User::find($request->userId);
        $returnData = array(
            'status' => 'error',
            'message' => 'Wrong credentials!'
        );

        if( Hash::check($request->current_pass, $user->password))
        {
                if($request->new_pass==$request->confirm_pass && $request->new_pass!=NULL){      
                    $user->password = Hash::make($request->new_pass);
                    $user->save();
                    return response()->json($user);
                }
                return  response()->json($returnData, 401);
            }
            return  response()->json($returnData, 401);
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
        $returnData = array(
            'status' => 'error',
            'message' => 'Wrong credentials!'
        );
        if($request->password== $request->confirm_pass){
        $users->password = Hash::make($request['password']);
        $users->code = 0;
        $users->save();
        return response()->json($users);
    }
    return response()->json($returnData, 401);
    }

    public function adminChange(Request $request, $id){

        $users = User::find($id);
        $returnData = array(
            'status' => 'error',
            'message' => 'Wrong credentials!'
        );
        if($request->password== $request->confirm_pass){
        $users->name = ucfirst($request->name);
        $users->password = Hash::make($request['password']);
        $users->code = 0;
        $users->save();
        return response()->json($users);
         }
    return response()->json($returnData, 401);
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

    public function memberAccount($email)
    {
        $member = Members::where('email', '=', $email)->first();
        $memberId = $member->id;
        return response()->json($memberId);
    }

    public function deptAdd(Request $request){
        $validated = $request->validate([
            'department_name' =>'unique:lib_department'
        ]);
       $deps = ucfirst($request->department);
       if($deps!=null){
        $department = departments::create([
            'department_name' => $deps,        
            ]);
        return response()->json($department);
       }
       return response()->json('error', 406);
    }

    public function showDept(){
        $department = departments::all();
        return response()->json($department);
     }

     public function addActivity(Request $request){
        $activity = actLog::create([
            'name' => $request['name'],
            'department' => $request['department'],
            'activity' => $request['activity']
            ]);
        return response()->json($activity);
     }

     public function actLog(){
        $actLog = actLog::all();
        return response()->json($actLog);
     }

     
     public function dueDateSMS(){
         
        $basic  = new \Vonage\Client\Credentials\Basic("e775c656", "WNAjcdSYXE3AwZxF");
        $client = new \Vonage\Client($basic);

        $sms = smsDue::all();
        $smscount = $sms->count();
        $today = Carbon::now()->format('Y-m-d');
        $debits = Debits::all();
         
            foreach ($debits as $debs){
                foreach ($sms as $number)
                { 
          
                    if($debs->status=='Paid'){ 
                        $number->delete();

                    }
                    else if($debs->status=='Overdue')
                    {
                        if($today ==  $debs->due_date){
                            if($smscount>0){
                                $memNumber = '63' . $number->mobile_number;
                                $response = $client->sms()->send(
                                    new \Vonage\SMS\Message\SMS($memNumber, 'COOP', 'Par utang mo pakibayad'.$number->id)
                                );
                                $number->delete();
                                break;
                                return $this->dueDateSMS();  
                            }
                       
                        
                        }    
                    }
                }
             
        }    
     
                
            return response()->json($sms);
     }
     

     public function sendDate(Request $request){


        $users =  Members::where('id', '=', $request->account)->first();
        $sms = smsDue::create([
            'mobile_number' => $users->mobile_number,
            'sendDate' => $request->sendDate,
            'journal_id' => $request->journal_id
            ]);
        return response()->json($sms);
     }

     public function totalMemBalance()
     {
         $totals = DB::table('debits')
             ->join('payables', 'debits.payables_id', '=', 'payables.id')
             ->join('credits', 'payables.id', '=', 'credits.payables_id')
             ->join('transactions', 'payables.transaction_id', '=', 'transactions.id')
             ->join('members', 'transactions.members_id', '=', 'members.id')
             ->whereNotNull('transactions.id') // Check for existence of related transaction
             ->groupBy('transactions.id', 'debits.status')
             ->select('transactions.id', DB::raw('MAX(debits.status) as status'))
             ->get();
     
         return response()->json($totals);
     }

    
    }