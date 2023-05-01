<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payables extends Model
{
    use HasFactory;
    protected $table = 'payables';
    protected $primaryKey = 'id';
    protected $fillable = 
    [
        'transaction_id',
        'entry_id',
        'transaction_number',
        'description'
    ];
}
