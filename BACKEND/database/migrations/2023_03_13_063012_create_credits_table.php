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
        Schema::create('credits', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('users_id');
            $table->unsignedBigInteger('journals_id')->nullable();
            $table->unsignedBigInteger('payables_id');
            $table->datetime('due_date')->nullable();
            $table->double('interest')->nullable();
            $table->double('credit_amount')->nullable();
            $table->double('debit_amount')->nullable();
            $table->timestamps();

            $table->foreign('users_id')-> references('id')->on('users');
            $table->foreign('journals_id')-> references('id')->on('lib_journals');
            $table->foreign('payables_id')-> references('id')->on('payables');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('credits');
    }
};
