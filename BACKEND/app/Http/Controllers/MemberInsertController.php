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
       // $rows = DB::table('members')->count();
       
         
        //    foreach ($data as $member){ 
        //     if($member==$count){ 
        //       $count++;
        //     }
        //    elseif($member!=$count){
        //     $data = $count;
        //    break;
        //    } 
        //   }


            return view('member_create',['members'=> $data]);
        }
        public function insert(addMember $request){
       
            $input = $request->all();
        Members::create($input);
  
        return back()->with('success', 'Member created successfully.');

        //      $id = ($request->predef .$request->account_id);
      
        //     Members::create([
        //         'account_id' => $id ,
        //         'first_name' => $request->first_name,
        //         'middle_name' => $request->middle_name,
        //         'last_name' => $request->last_name,
        //         'suffix' => $request->suffix,
        //         'first_name' => $request->first_name,
        //         'birthdate' => $request->birthdate,
        //         'address' => $request->address,
        //         'spouse' => $request->spouse,
        //         'civil_status' => $request->civil_status,
        //         'tin_number' => $request->tin_number,
        //         'occupation' => $request->occupation,
        //         'gender' => $request->gender,
        //         'department' => $request->department,
        //         'employment_status' => $request->employment_status,
        //         'company_name' => $request->company_name,
        //         'company_address' => $request->company_address,
        //         'job_title' => $request->job_title,
        //         'email' => $request->email,
        //         'mobile_number' => $request->mobile_number
        //     ]);

     
        // echo "Record inserted successfully.<br/>";
        // echo '<a href = "/insert">Click Here</a> to go back.';
        
        }
        
}

 // //foreach
        //     //condition
        //    // $members = DB::table('users')->pluck('account_id');
       




   // $account_id = $request->input('account_id');
        // $first_name = $request->input('first_name');
        // $middle_name = $request->input('middle_name');
        // $last_name = $request->input('last_name');
        // $suffix = $request->input('suffix');
        // $birthdate = $request->input('birthdate');
        // $address = $request->input('address');
        // $spouse = $request->input('spouse');
        // $tin_number = $request->input('tin_number');
        // $occupation = $request->input('occupation');
        // $gender = $request->input('gender');
        // $department = $request->input('department');
        // $employment_status = $request->input('employment_status');
        // $company_name = $request->input('company_name');
        // $company_address = $request->input('company_address');
        // $job_title = $request->input('job_title');
        // $email = $request->input('email');
        // $mobile_number = $request->input('mobile_number');
        // $data=array("account_id"=>$account_id,
        //             "first_name"=>$first_name,
        //             "middle_name"=>$middle_name,
        //             "last_name"=>$last_name,
        //             "suffix"=>$suffix,
        //             "birthdate"=>$birthdate,
        //             "address"=>$address,
        //             "spouse"=>$spouse,
        //             "tin_number"=>$tin_number,
        //             "occupation"=>$occupation,
        //             "gender"=>$gender,
        //             "department"=>$department,
        //             "member_office"=>$member_office,
        //             "employment_status"=>$employment_status,
        //             "company_name"=>$company_name,
        //             "company_address"=>$company_address,
        //             "job_title"=>$job_title,
        //             "email"=>$email,
        //             "mobile_number"=>$mobile_number
        //             );
        //     DB::table('members')->insert($data);