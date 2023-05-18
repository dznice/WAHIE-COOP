<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Members;
use App\Models\LibJournal;

class JournalLogs extends Model
{
    use HasFactory;
    protected $table = 'journal_logs';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'journals_id',
        'members_id',
        'journal_no',
        'journal_date',
        'credit_amount',
        'debit_amount',
        'description',
        'total_credit',
        'total_debit',
        'transac_no'

    ];

    public function memberlogs(): BelongsTo
    {
        return $this->belongsTo(Members::class, 'members_id', 'id');
    }

    public function entrylogs(): BelongsTo
    {
        return $this->belongsTo(LibJournal::class, 'journals_id', 'id');
    }
}
