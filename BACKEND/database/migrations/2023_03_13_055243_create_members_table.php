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
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('suffix')->nullable();
            $table->date('birthdate');
            $table->string('address')->nullable();
            $table->string('spouse')->nullable();
            $table->string('civil_status')->nullable();
            $table->string('tin_number')->nullable();
            $table->string('occupation')->nullable();
            $table->string('gender', 10);
            $table->string('department');
            $table->string('employment_status')->nullable();
            $table->string('company_name');
            $table->string('company_address')->nullable();
            $table->string('email');
            $table->string('mobile_number');
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
