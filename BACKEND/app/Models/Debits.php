<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Credits;

class Debits extends Model
{
    use HasFactory;
    protected $table = 'debits';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'credits_id',
        'payables_id',
        'open_balance',
        'orig_amount',
        'payment',
        'pay_date',
        'status',
        'due_date'
    ];

    public function debt(): BelongsTo
    {
        return $this->belongsTo(Credits::class, 'credits_id', 'id');
    }
}
