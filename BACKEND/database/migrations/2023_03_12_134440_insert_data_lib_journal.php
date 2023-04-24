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
        DB::table('lib_journals')->insert(array('journal_number' => '101', 'journal_name' => 'Petty Cash Fund','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '102', 'journal_name' => 'Cash on hand','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '103', 'journal_name' => 'Cash in Bank DBP Checking Account','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '104', 'journal_name' => 'Regular Loans Receivable current','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '105', 'journal_name' => 'Over 360 days Past due Regular Loans','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '106', 'journal_name' => 'Allowance for Past Due Account Loans','journal_type'  => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '107', 'journal_name' => 'Buy Out Loans Receivable ','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '108', 'journal_name' => 'Emergency Loans Receivable','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '109', 'journal_name' => 'Appliance Loans Receivable','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '110', 'journal_name' => 'Account Receivable PGT','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '111', 'journal_name' => 'Investment in Non-Marketable Securities (TSCF)','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '112', 'journal_name' => 'Advances to officers, employees and members','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '113', 'journal_name' => 'Other Current Receivables insurance premium','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '114', 'journal_name' => 'Other Current Asset','journal_type' => 'Asset'));
        DB::table('lib_journals')->insert(array('journal_number' => '115', 'journal_name' => 'Other Funds and Deposits','journal_type' => 'Asset'));
        // Inserting Liabilities
        DB::table('lib_journals')->insert(array('journal_number' => '116', 'journal_name' => 'Interest on Share Capital','journal_type' => 'Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '117', 'journal_name' => 'Patronage Refund','journal_type' => 'Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '118', 'journal_name' => 'Loans Payable','journal_type' => 'Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '119', 'journal_name' => 'Due to Union/Fed','journal_type' => 'Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '120', 'journal_name' => 'Insurance Premium Payable','journal_type' => 'Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '121', 'journal_name' => 'Accrued Expense Payable','journal_type' => 'Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '122', 'journal_name' => 'Savings Deposit','journal_type' => 'Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '123', 'journal_name' => 'Other Current Liabilities','journal_type' => 'Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '124', 'journal_name' => 'Time Deposit','journal_type' => 'Liabilities'));
        // Inserting Equity
        DB::table('lib_journals')->insert(array('journal_number' => '125', 'journal_name' => 'Paid Up Capital','journal_type' => 'Equity'));
        DB::table('lib_journals')->insert(array('journal_number' => '126', 'journal_name' => 'Donations/Grants','journal_type' => 'Equity'));
        DB::table('lib_journals')->insert(array('journal_number' => '127', 'journal_name' => 'General Reserve Fund','journal_type' => 'Equity'));
        DB::table('lib_journals')->insert(array('journal_number' => '128', 'journal_name' => 'Education & Training Fund','journal_type' => 'Equity'));
        DB::table('lib_journals')->insert(array('journal_number' => '129', 'journal_name' => 'Community Development Fund','journal_type' => 'Equity'));
        DB::table('lib_journals')->insert(array('journal_number' => '130', 'journal_name' => 'Optional Fund','journal_type' => 'Equity'));
        // Inserting Other Item
        DB::table('lib_journals')->insert(array('journal_number' => '131', 'journal_name' => 'Optional Fund Subsidy','journal_type' => 'Other Item'));
        DB::table('lib_journals')->insert(array('journal_number' => '132', 'journal_name' => 'Gains on Investment','journal_type' => 'Other Item'));
        DB::table('lib_journals')->insert(array('journal_number' => '133', 'journal_name' => 'Prior Year adjustmets (can be positive or negative)','journal_type' => 'Other Item'));
        // Inserting Expense
        DB::table('lib_journals')->insert(array('journal_number' => '134', 'journal_name' => 'Interest Expense and other financing charges','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '135', 'journal_name' => 'Admin Officers Honorarium and Allowances','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '136', 'journal_name' => 'Admin Salaries and wages','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '137', 'journal_name' => 'Admin Travel and Transportation','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '138', 'journal_name' => 'Admin Employees Benefits','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '139', 'journal_name' => 'Admin Meeting and Conferences','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '140', 'journal_name' => 'Admin Representation','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '141', 'journal_name' => 'Admin Office Supplies','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '142', 'journal_name' => 'Admin Taxes, fees and charges','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '143', 'journal_name' => 'Admin Miscellaneous Expense','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '144', 'journal_name' => 'Admin Insurance Expense','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '145', 'journal_name' => 'Admin Communication','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '146', 'journal_name' => 'Admin Social Community Service','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '147', 'journal_name' => 'Admin General Assembly ','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '148', 'journal_name' => 'Admin Professional Fee','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '149', 'journal_name' => 'Admin  Members Benefit','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '150', 'journal_name' => 'Admin Training and Seminar','journal_type' => 'Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '151', 'journal_name' => 'Admin Provision for probable losses on loans','journal_type' => 'Expense'));
        //Inserting Revenue
        DB::table('lib_journals')->insert(array('journal_number' => '152', 'journal_name' => 'Interest  Income Regular loans','journal_type' => 'Revenue'));
        DB::table('lib_journals')->insert(array('journal_number' => '153', 'journal_name' => 'Interest Income Buy Out loans','journal_type' => 'Revenue'));
        DB::table('lib_journals')->insert(array('journal_number' => '154', 'journal_name' => 'Interest  Income Emergency loans','journal_type' => 'Revenue'));
        DB::table('lib_journals')->insert(array('journal_number' => '155', 'journal_name' => 'Interest Income Appliance loans','journal_type' => 'Revenue'));
        DB::table('lib_journals')->insert(array('journal_number' => '156', 'journal_name' => 'Service Fee','journal_type' => 'Revenue'));
        DB::table('lib_journals')->insert(array('journal_number' => '157', 'journal_name' => 'Fines, Penalties and Surcharges','journal_type' => 'Revenue'));
        DB::table('lib_journals')->insert(array('journal_number' => '158', 'journal_name' => 'Filing Fee','journal_type' => 'Revenue'));
        DB::table('lib_journals')->insert(array('journal_number' => '159', 'journal_name' => 'Miscellaneous Income','journal_type' => 'Revenue'));
        DB::table('lib_journals')->insert(array('journal_number' => '160', 'journal_name' => 'Income/Interest from Investment/Deposits','journal_type' => 'Revenue'));
        DB::table('lib_journals')->insert(array('journal_number' => '161', 'journal_name' => 'Membership Fee','journal_type' => 'Revenue'));
        DB::table('lib_journals')->insert(array('journal_number' => '162', 'journal_name' => 'Commission Income','journal_type' => 'Revenue'));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lib_journals');
    }
};
