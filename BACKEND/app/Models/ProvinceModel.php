<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProvinceModel extends Model
{
    use HasFactory;
    protected $table = 'ph_provinces';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'psgc_code',
        'province_description',
        'region_code ',
        'province_code',
        'created_at',
        'updated_at',
    ];
}
