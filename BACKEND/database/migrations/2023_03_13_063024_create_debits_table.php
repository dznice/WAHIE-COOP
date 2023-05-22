<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('debits', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('credits_id');
            $table->double('open_balance')->nullable();
            $table->double('orig_amount');
            $table->double('payment')->nullable();
            $table->date('pay_date')->nullable();
            $table->date('due_date')->nullable();
            $table->float('interest_rate')->nullable();
            $table->string('status');
            $table->string('paymentMethod')->default('');
            $table->string('paymentIdentifier')->default('');
            $table->timestamps();

            $table->foreign('credits_id')-> references('id')->on('credits');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('debits');
    }
};
