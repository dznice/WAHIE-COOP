<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BeneficiaryResource extends JsonResource
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
            'benificiary_name' => $this->benificiary_name,
            'benificiary_birthdate' => $this->benificiary_birthdate,
            'benificiary_relation' => $this->benificiary_relation,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
