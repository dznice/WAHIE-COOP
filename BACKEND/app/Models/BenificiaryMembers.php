<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BenificiaryMembers extends Model
{
    use HasFactory;
    protected $table = 'benificiary_members';
    protected $primaryKey = 'id';
    protected $fillable = ['benificiary_id','benificiary_name', 'benificiary_birthdate', 'benificiary_relation'];
}
