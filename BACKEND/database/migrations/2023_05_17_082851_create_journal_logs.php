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
        Schema::create('journal_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('journals_id');
            $table->unsignedBigInteger('members_id');
            $table->integer('journal_no');
            $table->date('journal_date');
            $table->date('due_date')->nullable();
            $table->integer('interest')->nullable();
            $table->double('interest_amount')->nullable();
            $table->double('credit_amount');
            $table->double('debit_amount');
            $table->string('description')->nullable();
            $table->double('total_credit');
            $table->double('total_debit');
            $table->timestamps();


            $table->foreign('journals_id')-> references('id')->on('lib_journals');
            $table->foreign('members_id')-> references('id')->on('members');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journal_logs');
    }
};
