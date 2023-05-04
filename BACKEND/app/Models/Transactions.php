<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Members;

class Transactions extends Model
{
    use HasFactory;
    protected $table = 'transactions';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'users_id',
        'members_id',
        'transaction_number',
        'transaction_date'
    ];

    public function member(): BelongsTo
    {
        return $this->belongsTo(Members::class, 'members_id', 'id');
    }
}
