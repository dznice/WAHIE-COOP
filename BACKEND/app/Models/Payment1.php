<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment1 extends Model
{
    use HasFactory;
    protected $table = 'test';
    protected $primaryKey = 'id';
    protected $fillable = 
    [
        'member',
        'description',
        'original_amount',
        'due_date',
        'open_balance',
        'payment',
    ];
}
