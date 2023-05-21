<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarangayModel extends Model
{
    use HasFactory;
    protected $table = 'ph_barangays';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'barangay_code',
        'barangay_description',
        'region_code ',
        'province_code',
        'city_municipality_code',
        'created_at',
        'updated_at',
    ];
}
