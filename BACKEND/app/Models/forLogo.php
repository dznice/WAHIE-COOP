<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class forLogo extends Model
{
    use HasFactory;
    protected $table = 'cooplogo';
    protected $fillable = [
     'logo',
     'adminId',
    ];
}
