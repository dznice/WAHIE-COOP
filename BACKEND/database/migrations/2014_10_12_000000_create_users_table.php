1<?php

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
        Schema::create('lib_users', function (Blueprint $table) {
            $table->id();
            $table->String('user_type');
            $table->integer('identifier');
        });

        DB::table('lib_users')->insert(array('user_type' => 'admin', 'identifier'=>0));
        DB::table('lib_users')->insert(array('user_type' => 'superadmin', 'identifier'=>1));
        DB::table('lib_users')->insert(array('user_type' => 'member', 'identifier'=>2));

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->unsignedBigInteger('role_id')->unsigned()->nullable()->default('1');
            $table->integer('status')->default('2');
            $table->integer('fillInfo');
            $table->integer('code');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('role_id')-> references('id')->on('lib_users');
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('lib_users');
        Schema::dropIfExists('user_status');
    }
};
