<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CitiesModel extends Model
{
    use HasFactory;
    protected $table = 'ph_cities';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'psgc_code',
        'city_municipality_description',
        'region_code ',
        'province_code',
        'city_municipality_code',
        'created_at',
        'updated_at',
    ];
}
