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
        Schema::create('lib_milestones', function (Blueprint $table) {
            $table->id();
            $table->string('milestone_title');
            $table->string('milestone_description');
            $table->integer('milestone_count');
            $table->integer('milestone_goal');
            $table->timestamp('date_achieved');
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
        Schema::dropIfExists('lib_milestones');
    }
};
