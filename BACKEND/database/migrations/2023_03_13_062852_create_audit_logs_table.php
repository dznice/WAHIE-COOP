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
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('users_id');
            $table->unsignedBigInteger('members_id');
            $table->unsignedBigInteger('transaction_id');
            $table->timestamp('time_date');
            $table->timestamps();

            $table->foreign('users_id')-> references('id')->on('users');
            $table->foreign('members_id')-> references('id')->on('members');
            $table->foreign('transaction_id')-> references('id')->on('transactions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('audit_logs');
    }
};
