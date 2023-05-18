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

        DB::table('lib_users')->insert(array('user_type' => 'Admin', 'identifier'=>0));
        DB::table('lib_users')->insert(array('user_type' => 'Superadmin', 'identifier'=>1));
        DB::table('lib_users')->insert(array('user_type' => 'Member', 'identifier'=>2));

        Schema::create('lib_department', function (Blueprint $table) {
            $table->id();
            $table->String('department_name')->unique();
            $table->timestamps();
        });
        DB::table('lib_department')->insert(array('department_name' => 'Superadmin'));

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('department')->nullable();
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
