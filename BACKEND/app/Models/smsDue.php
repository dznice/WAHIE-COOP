<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class smsDue extends Model
{
    use HasFactory;
    protected $table = 'smsdue';
    protected $fillable =
    [
        'mobile_number',
        'sendDate',
        'journal_id',

    ];
}
