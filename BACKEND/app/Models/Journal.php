<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    use HasFactory;
    protected $table = 'lib_journals';
    protected $primaryKey = 'id';
    protected $fillable = ['journal_number', 'journal_name', 'journal_type'];
}
