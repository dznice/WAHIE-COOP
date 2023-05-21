<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegionModel extends Model
{
    use HasFactory;
    protected $table = 'ph_regions';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'psgc_code',
        'region_description',
        'region_code',
        'created_at',
        'updated_at',
    ];
}
