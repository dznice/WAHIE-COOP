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
        DB::table('lib_entries')->insert(array('entry_name' => 'Journal Entry'));
        DB::table('lib_entries')->insert(array('entry_name' => 'Invoice'));
        DB::table('lib_entries')->insert(array('entry_name' => 'Payment'));
        
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
