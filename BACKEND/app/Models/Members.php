<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Members extends Model
{
    protected $table = 'members';
	public $timestamps = true;
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'predef',
		'account_id',
		'first_name',
		'middle_name',
		'last_name',
		'suffix',
		'birthdate',
		'address',
		'spouse',
		'civil_status',
		'tin_number',
		'occupation',
		'gender',
		'department',
		'employment_status',
		'company_name',
		'company_address',
		'email',
		'mobile_number' ];
    }
