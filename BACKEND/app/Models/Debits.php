<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Debits extends Model
{
    use HasFactory;
    protected $table = 'debits';
    protected $primaryKey = 'id';
    protected $fillable = 
    [
        'credits_id',
        'open_balance',
        'payment',
        'pay_date',
        'status'
    ];
}
