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
            $table->double('open_balance');
            $table->double('payment');
            $table->date('pay_date');
            $table->integer('status');

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
