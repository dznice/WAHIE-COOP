<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreditsResource extends JsonResource
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
            'users_id' => $this->users_id,
            'journals_id' => $this->journals_id,
            'payables_id' => $this->payables_id,
            'due_date' => $this->due_date,
            'interest' => $this->interest,
            'credit_amount' => $this->credit_amount,
            'debit_amount' => $this->debit_amount,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
