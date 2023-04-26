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
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('predef')->default('WAH');
            $table->integer('account_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('suffix')->nullable();
            $table->date('birthdate');
            $table->string('address');
            $table->string('spouse')->nullable();
            $table->string('civil_status');
            $table->string('tin_number');
            $table->string('occupation');
            $table->string('gender', 10);
            $table->string('department');
            $table->string('employment_status');
            $table->string('company_name');
            $table->string('company_address');
            $table->string('email');
            $table->string('mobile_number');
            $table->timestamp('time_date_created')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
};
