<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class actLog extends Model
{
    use HasFactory;
    protected $table = 'activity_logs';
    protected $fillable = [
     'name',
     'department',
     'activity',
     'created_at',
    ];
}
