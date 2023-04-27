<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entries extends Model
{
    use HasFactory;
    protected $table = 'entries';
    protected $primaryKey = 'id';
    protected $fillable = 
    [
        //'journal_no',
        //'journal_date',
        'account', 
        'debit', 
        'credit', 
        'description', 
        'name'
    ];
}
