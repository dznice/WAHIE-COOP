<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trial', function (Blueprint $table) {
            $table->id();
            $table->integer('received');
            $table->string('member');
            $table->string('email');
            $table->string('payment_date');
            $table->string('payment_method');
            $table->string('reference_no');
            $table->string('deposit_to');
            $table->string('description');
            $table->string('original_amount');
            $table->string('open_balance');
            $table->string('payment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trial');
    }
};
