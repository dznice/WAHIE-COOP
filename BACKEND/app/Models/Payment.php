<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $table = 'trial';
    protected $primaryKey = 'id';
    protected $fillable = 
    [
        'journal_no',
        'journal_date',
    ];
}
