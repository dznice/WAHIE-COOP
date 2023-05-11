<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DebitsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'credits_id' => $this->credits_id,
            'debit' => $this->whenLoaded('debt'),
            'debit' => $this->whenLoaded('debt'),
            'cred' => $this->whenLoaded('cred'),
            'entries' => $this->whenLoaded('entries'),
            'transac' => $this->whenLoaded('transac'),
            'member' => $this->whenLoaded('member'),
            'open_balance' => $this->open_balance,
            'orig_amount' => $this->orig_amount,
            'payment' => $this->payment,
            'pay_date' => $this->pay_date,
            'status' => $this->status,
            'paystats' => $this->paystats,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
