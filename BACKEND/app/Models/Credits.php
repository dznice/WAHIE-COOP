<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credits extends Model
{
    use HasFactory;
    protected $table = 'credits';
    protected $primaryKey = 'id';
    protected $fillable = 
    [
        'users_id',
        'journals_id',
        'payables_id',
        'amount',
    ];
}
