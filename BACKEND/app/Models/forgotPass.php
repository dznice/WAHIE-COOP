<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class forgotPass extends Model
{
    use HasFactory;
    protected $table = 'forgotpass';
    protected $fillable = [
        'userId',
        'secret',
    ];

}
