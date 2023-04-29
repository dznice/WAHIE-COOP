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
        Schema::create('benificiary_members', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('benificiary_id');//should not be unique
            $table->string('benificiary_name');
            $table->date('benificiary_birthdate');
            $table->string('benificiary_relation');
            $table->foreign('benificiary_id')-> references('id')->on('members');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('benificiary_members');
    }
};
