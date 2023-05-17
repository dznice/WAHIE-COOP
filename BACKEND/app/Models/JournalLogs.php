<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'total_debit'

    ];
}
