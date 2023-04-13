<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'predef' => $this->predef,
            'account_id' => $this->account_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'middle_name' => $this->middle_name,
            'suffix' => $this->suffix,
            'birthdate' => $this->birthdate,
            'address' => $this->address,
            'spouse' => $this->spouse,
            'civil_status' => $this->civil_status,
            'tin_number' => $this->tin_number,
            'occupation' => $this->occupation,
            'gender' => $this->gender,
            'department' => $this->department,
            'employment_status' => $this->employment_status,
            'company_name' => $this->company_name,
            'company_address' => $this->company_address,
            'job_title' => $this->job_title,
            'email' => $this->email,
            'mobile_number' => $this->mobile_number
        ];
    }

    public function check(){

        $data = DB::table('members')->pluck('account_id');

            return view('member_create',['members'=> $data]);
        }
}
