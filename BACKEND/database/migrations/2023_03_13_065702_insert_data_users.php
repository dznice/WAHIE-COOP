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
        DB::table('users')->insert(array('name' => 'SuperAdmin','email' => 'superadmin@gmail.com','role_id' => '2','status' => '1','code' => '1','email_verified_at' => null,'password' => Hash::make('admin123'),'remember_token' => null, 'fillInfo' => 0));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
