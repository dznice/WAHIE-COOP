<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\LibJournal;
use App\Models\Payables;

class Credits extends Model
{
    use HasFactory;
    protected $table = 'credits';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'users_id',
        'journals_id',
        'payables_id',
        'amount',
    ];

    public function cred(): BelongsTo
    {
        return $this->belongsTo(Payables::class, 'payables_id', 'id');
    }

    public function journ(): BelongsTo
    {
        return $this->belongsTo(LibJournal::class, 'journals_id', 'id');
    }
}
