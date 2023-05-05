<?php

namespace App\Http\Resources;

//use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JournalEntryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    // public function toArray(Request $request): array
    // {
    //     return [
    //         'id' => $this->id,
    //         'journal_no' => $this->journal_no,
    //         'account' => $this->account,
    //         'debit' => $this->debit,
    //         'credit' => $this->credit,
    //         'description' => $this->description,
    //         'name' => $this->name,
    //         'created_at' => $this->created_at,
    //         'updated_at' => $this->updated_at,

    //     ];
    // }
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'journal_no' => $this->journal_no,
            'journal_date' => $this->journal_date,
        ];
    }
}
