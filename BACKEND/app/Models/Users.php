<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\LibUsers;

class Users extends Model
{
    use HasFactory;
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'name',
        'email',
        'role_id ',
        'status',
        'fillInfo',
        'code',
        'created_at',
        'updated_at',
    ];

    public function userrole(): BelongsTo
    {
        return $this->belongsTo(LibUsers::class, 'role_id', 'id');
    }
}
