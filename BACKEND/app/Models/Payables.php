<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\LibEntries;
use App\Models\Transactions;
use App\Models\Members;
use App\Models\Credits;

class Payables extends Model
{
    use HasFactory;
    protected $table = 'payables';
    protected $primaryKey = 'id';
    protected $fillable =
    [
        'transaction_id',
        'entry_id',
        'transaction_number',
        'description'
    ];


    public function entries(): BelongsTo
    {
        return $this->belongsTo(LibEntries::class, 'entry_id', 'id');
    }

    public function transac(): BelongsTo
    {
        return $this->belongsTo(Transactions::class, 'transaction_id', 'id');
    }

    public function creds() {
        $id=Payables::all();

       return $creditAmountSum = Payables::join('credits', 'payables_id', '=', 'credits.payables_id')
                    ->where('payables.id', $id) // replace $id with the specific payables ID you want to get the sum for
                    ->sum('credits.credit_amount');

    }

}


