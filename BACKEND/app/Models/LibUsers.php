<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LibUsers extends Model
{
    use HasFactory;
    protected $table = 'lib_users';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'user_type',
        'identifier'
    ];
}
