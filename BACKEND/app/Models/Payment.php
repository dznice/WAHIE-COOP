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
        'received',
        'member',
        'email',
        'payment_date',
        'payment_method',
        'reference_no',
        'deposit_to',
        'description',
        'original_amount',
        'open_balance',
        'payment',
    ];
}
