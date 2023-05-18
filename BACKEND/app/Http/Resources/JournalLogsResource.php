<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JournalLogsResource extends JsonResource
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
            'journals_id' => $this->journals_id,
            'members_id' => $this->members_id,
            'memberlogs' => $this->whenLoaded('memberlogs'),
            'entrylogs' => $this->whenLoaded('entrylogs'),
            'journal_no' => $this->journal_no,
            'journal_date' => $this->journal_date,
            'credit_amount' => $this->credit_amount,
            'debit_amount' => $this->debit_amount,
            'description' => $this->description,
            'total_credit' => $this->total_credit,
            'total_debit' => $this->total_debit,
            'transac_no' => $this->transac_no,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
