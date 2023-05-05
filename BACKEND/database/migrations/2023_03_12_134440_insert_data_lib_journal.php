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
        //ASSET ACCOUNTS - 10000
        //DB::table('lib_journals')->insert(array('journal_number' => '10000', 'journal_name' => 'ASSET ACCOUNTS'));
        //CURRENT ASSETS 11000 - 12000
        //Cash and Cash Equivalents 11100 - 11180
        DB::table('lib_journals')->insert(array('journal_number' => '11110', 'journal_name' => 'Cash on Hand'));
        DB::table('lib_journals')->insert(array('journal_number' => '11120', 'journal_name' => 'Checks & Other Cash Items (COCI)'));
        DB::table('lib_journals')->insert(array('journal_number' => '11130', 'journal_name' => 'Cash in Bank'));
        DB::table('lib_journals')->insert(array('journal_number' => '11140', 'journal_name' => 'Cash in Cooperative Federation'));
        DB::table('lib_journals')->insert(array('journal_number' => '11150', 'journal_name' => 'Petty Cash Fund'));
        DB::table('lib_journals')->insert(array('journal_number' => '11160', 'journal_name' => 'Revolving Fund'));
        DB::table('lib_journals')->insert(array('journal_number' => '11170', 'journal_name' => 'Change Fund'));
        DB::table('lib_journals')->insert(array('journal_number' => '11180', 'journal_name' => 'ATM Fund'));
        // Loans And Receivables 11200 - 11300
        DB::table('lib_journals')->insert(array('journal_number' => '11210', 'journal_name' => 'Loans Receivable - Current'));
        DB::table('lib_journals')->insert(array('journal_number' => '11220', 'journal_name' => 'Loans Receivable - Past Due'));
        DB::table('lib_journals')->insert(array('journal_number' => '11230', 'journal_name' => 'Loans Receivable Restructured'));
        DB::table('lib_journals')->insert(array('journal_number' => '11240', 'journal_name' => 'Loans Receivable - Loans in Litigation'));
        DB::table('lib_journals')->insert(array('journal_number' => '11241', 'journal_name' => 'Unearned Interests and Discounts'));
        DB::table('lib_journals')->insert(array('journal_number' => '11242', 'journal_name' => 'Allowance for Probable Losses - Loans'));
        DB::table('lib_journals')->insert(array('journal_number' => '11250', 'journal_name' => 'Accounts Receivables Trade - Current'));
        DB::table('lib_journals')->insert(array('journal_number' => '11260', 'journal_name' => 'Accounts Receivables Trade - Past Due'));
        DB::table('lib_journals')->insert(array('journal_number' => '11270', 'journal_name' => 'Accounts Receivables Trade - Restructured'));
        DB::table('lib_journals')->insert(array('journal_number' => '11280', 'journal_name' => 'Accounts Receivables Trade - in Litigation'));
        DB::table('lib_journals')->insert(array('journal_number' => '11281', 'journal_name' => 'Allowance for Probable Losses - Accounts Receivable Trade'));
        DB::table('lib_journals')->insert(array('journal_number' => '11290', 'journal_name' => 'Installment Receivables - Current'));
        DB::table('lib_journals')->insert(array('journal_number' => '11300', 'journal_name' => 'Installment Receivables - Past Due'));
        DB::table('lib_journals')->insert(array('journal_number' => '11310', 'journal_name' => 'Installment Receivables - Restructured'));
        DB::table('lib_journals')->insert(array('journal_number' => '11320', 'journal_name' => 'Installment Receivables - in Litigation'));
        DB::table('lib_journals')->insert(array('journal_number' => '11321', 'journal_name' => 'Allowance for Probable Losses - Installment Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11322', 'journal_name' => 'Unrealized Gross Margin'));
        DB::table('lib_journals')->insert(array('journal_number' => '11330', 'journal_name' => 'Sales Contract Receivable'));
        DB::table('lib_journals')->insert(array('journal_number' => '11331', 'journal_name' => 'Allowance for Probable Losses - Sales Contract Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11340', 'journal_name' => 'Accounts Receivable - non trade'));
        DB::table('lib_journals')->insert(array('journal_number' => '11341', 'journal_name' => 'Allowance for Probable Losses - Accounts Receivablenon trade'));
        DB::table('lib_journals')->insert(array('journal_number' => '11350', 'journal_name' => 'Advances to Officers, Employees and Members'));
        DB::table('lib_journals')->insert(array('journal_number' => '11360', 'journal_name' => 'Due from  Accountable Officers, Employees and Members'));
        DB::table('lib_journals')->insert(array('journal_number' => '11370', 'journal_name' => 'Finance Lease Receivable'));
        DB::table('lib_journals')->insert(array('journal_number' => '11371', 'journal_name' => 'Allowance for Impairment – Finance Lease Receivable'));
        DB::table('lib_journals')->insert(array('journal_number' => '11380', 'journal_name' => 'Other Current Receivables'));
        // Financial Assets 11400
        DB::table('lib_journals')->insert(array('journal_number' => '11400', 'journal_name' => 'Financial Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '11410', 'journal_name' => 'Financial asset at fair value through profit or loss'));
        DB::table('lib_journals')->insert(array('journal_number' => '11420', 'journal_name' => 'Financial asset at cost'));
        // Inventories 11500
        DB::table('lib_journals')->insert(array('journal_number' => '11500', 'journal_name' => 'Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11510', 'journal_name' => 'Merchandise Inventory'));
        DB::table('lib_journals')->insert(array('journal_number' => '11520', 'journal_name' => 'Repossessed Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11530', 'journal_name' => 'Spare Parts/Materials & Other Goods Inventory'));
        DB::table('lib_journals')->insert(array('journal_number' => '11540', 'journal_name' => 'Raw Materials Inventory'));
        DB::table('lib_journals')->insert(array('journal_number' => '11550', 'journal_name' => 'Work in Process Inventory'));
        DB::table('lib_journals')->insert(array('journal_number' => '11560', 'journal_name' => 'Finished Goods Inventory'));
        DB::table('lib_journals')->insert(array('journal_number' => '11570', 'journal_name' => 'Inventory Agricultural Produce'));
        DB::table('lib_journals')->insert(array('journal_number' => '11580', 'journal_name' => 'Equipment for Lease Inventory'));
        DB::table('lib_journals')->insert(array('journal_number' => '11590', 'journal_name' => 'Allowance for impairment - Inventory'));
        // Biological Assets 11600
        DB::table('lib_journals')->insert(array('journal_number' => '11600', 'journal_name' => 'Biological Assets'));
        // Other Current Assets - 12000
        // DB::table('lib_journals')->insert(array('journal_number' => '12000', 'journal_name' => 'Other Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '12110', 'journal_name' => 'Input Tax'));
        DB::table('lib_journals')->insert(array('journal_number' => '12120', 'journal_name' => 'Creditable VAT'));
        DB::table('lib_journals')->insert(array('journal_number' => '12130', 'journal_name' => 'Creditable Withholding Tax'));
        DB::table('lib_journals')->insert(array('journal_number' => '12140', 'journal_name' => 'Deposit to Suppliers'));
        DB::table('lib_journals')->insert(array('journal_number' => '12150', 'journal_name' => 'Unused Supplies'));
        DB::table('lib_journals')->insert(array('journal_number' => '12160', 'journal_name' => 'Assets Acquired in Settlement of Loans/Accounts'));
        DB::table('lib_journals')->insert(array('journal_number' => '12161', 'journal_name' => 'Accumulated Depreciation and ImpairmentAssets Acquired in Settlement of loans/accounts'));
        DB::table('lib_journals')->insert(array('journal_number' => '12170', 'journal_name' => 'Prepaid Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '12200', 'journal_name' => 'Other Current Assets'));
        // NON CURRENT ASSETS 13000 - 17000
        DB::table('lib_journals')->insert(array('journal_number' => '13100', 'journal_name' => 'Financial Assets Long Term'));
        DB::table('lib_journals')->insert(array('journal_number' => '13110', 'journal_name' => 'Financial asset at cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '13120', 'journal_name' => 'Financial Asset at amortized cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '13200', 'journal_name' => 'Investment in Subsidiaries'));
        DB::table('lib_journals')->insert(array('journal_number' => '13300', 'journal_name' => 'Investment in Associates'));
        DB::table('lib_journals')->insert(array('journal_number' => '13400', 'journal_name' => 'Investment in Joint Ventures'));
        DB::table('lib_journals')->insert(array('journal_number' => '13500', 'journal_name' => 'Investment Property'));
        DB::table('lib_journals')->insert(array('journal_number' => '13510', 'journal_name' => 'Investment Property - Land'));
        DB::table('lib_journals')->insert(array('journal_number' => '13520', 'journal_name' => 'Investment Property - Building'));
        DB::table('lib_journals')->insert(array('journal_number' => '13521', 'journal_name' => 'Accumulated Depreciation - Investment Property - Building'));
        DB::table('lib_journals')->insert(array('journal_number' => '13530', 'journal_name' => 'Real Properties Acquired (RPA)'));
        DB::table('lib_journals')->insert(array('journal_number' => '13610', 'journal_name' => 'Accumulated Depreciation - RPA'));
        // Property, Plant and Equipment - 14000
        // DB::table('lib_journals')->insert(array('journal_number' => '14000', 'journal_name' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14110', 'journal_name' => 'Land'));
        DB::table('lib_journals')->insert(array('journal_number' => '14120', 'journal_name' => 'Land Improvements'));
        DB::table('lib_journals')->insert(array('journal_number' => '14121', 'journal_name' => 'Accumulated Depreciation - Land Improvements'));
        DB::table('lib_journals')->insert(array('journal_number' => '14130', 'journal_name' => 'Building and Improvements'));
        DB::table('lib_journals')->insert(array('journal_number' => '14131', 'journal_name' => 'Accumulated Depreciation - Building and Improvements'));
        DB::table('lib_journals')->insert(array('journal_number' => '14140', 'journal_name' => 'Building on Leased/Usufruct Land'));
        DB::table('lib_journals')->insert(array('journal_number' => '14141', 'journal_name' => 'Accumulated Depreciation - Building on Leased/Usufruct Land'));
        DB::table('lib_journals')->insert(array('journal_number' => '14150', 'journal_name' => 'Utility Plant'));
        DB::table('lib_journals')->insert(array('journal_number' => '14151', 'journal_name' => 'Accumulated Depreciation - Utility Plant'));
        DB::table('lib_journals')->insert(array('journal_number' => '14160', 'journal_name' => 'Property, Plant & Equipment -Under Finance Lease'));
        DB::table('lib_journals')->insert(array('journal_number' => '14161', 'journal_name' => 'AccumulatedDepreciation - Property, Plant & Equipment - Under Finance Lease'));
        DB::table('lib_journals')->insert(array('journal_number' => '14170', 'journal_name' => 'Construction in Progress'));
        DB::table('lib_journals')->insert(array('journal_number' => '14171', 'journal_name' => 'Accumulated Depreciation - Property, Plant &Equipment – Under Finance Lease'));
        DB::table('lib_journals')->insert(array('journal_number' => '14180', 'journal_name' => 'Furniture, Fixtures & Equipment (FFE)'));
        DB::table('lib_journals')->insert(array('journal_number' => '14181', 'journal_name' => 'Accumulated Depreciation FFE'));
        DB::table('lib_journals')->insert(array('journal_number' => '14190', 'journal_name' => 'Machineries, Tools and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14191', 'journal_name' => 'Accumulated Depreciation -  Machineries, Tools and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14200', 'journal_name' => 'Kitchen, Canteen & Catering Equipment/Utensils'));
        DB::table('lib_journals')->insert(array('journal_number' => '14201', 'journal_name' => 'Accumulated Depreciation -  Kitchen, Canteen & Catering Equipment/Utensils'));
        DB::table('lib_journals')->insert(array('journal_number' => '14210', 'journal_name' => 'Transportation Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14211', 'journal_name' => 'Accumulated Depreciation - Transportation Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14220', 'journal_name' => 'Linens and Uniforms'));
        DB::table('lib_journals')->insert(array('journal_number' => '14221', 'journal_name' => 'Accumulated Depreciation - Linens and Uniforms'));
        DB::table('lib_journals')->insert(array('journal_number' => '14230', 'journal_name' => 'Nursery/Greenhouses'));
        DB::table('lib_journals')->insert(array('journal_number' => '14231', 'journal_name' => 'Accumulated Depreciation - Nursery/Greenhouse'));
        DB::table('lib_journals')->insert(array('journal_number' => '14240', 'journal_name' => 'Leasehold Rights & Improvements'));
        DB::table('lib_journals')->insert(array('journal_number' => '14290', 'journal_name' => 'Other Property, Plant and Equipment'));
        // Biological Assets - 15000
        DB::table('lib_journals')->insert(array('journal_number' => '15000', 'journal_name' => 'Biological Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '15100', 'journal_name' => 'Biological Assets - Animals'));
        DB::table('lib_journals')->insert(array('journal_number' => '15110', 'journal_name' => 'Accumulated Depreciation - Biological Assets - Animals'));
        DB::table('lib_journals')->insert(array('journal_number' => '15200', 'journal_name' => 'Biological Assets - Plants'));
        DB::table('lib_journals')->insert(array('journal_number' => '15210', 'journal_name' => 'Accumulated Depreciation Biological Assets - Plants'));
        // Intangible Assets - 16000
        DB::table('lib_journals')->insert(array('journal_number' => '16000', 'journal_name' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '16100', 'journal_name' => 'Franchise'));
        DB::table('lib_journals')->insert(array('journal_number' => '16200', 'journal_name' => 'Franchise Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '16300', 'journal_name' => 'Copyright'));
        DB::table('lib_journals')->insert(array('journal_number' => '16400', 'journal_name' => 'Patent'));
        DB::table('lib_journals')->insert(array('journal_number' => '17000', 'journal_name' => 'Other Non-Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '17100', 'journal_name' => 'Computerization Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '17200', 'journal_name' => 'Other Funds and Deposits'));
        DB::table('lib_journals')->insert(array('journal_number' => '17300', 'journal_name' => 'Due from Head Office/Branch/ Satellites'));
        DB::table('lib_journals')->insert(array('journal_number' => '17400', 'journal_name' => 'Deposit on Returnable Containers'));
        DB::table('lib_journals')->insert(array('journal_number' => '17900', 'journal_name' => 'Miscellaneous Assets'));
        // LIABILITIES 20000
        // DB::table('lib_journals')->insert(array('journal_number' => '20000', 'journal_name' => 'LIABILITIES'));
        // CURRENT LIABILITIES 21000 - 23000
        DB::table('lib_journals')->insert(array('journal_number' => '21100', 'journal_name' => 'Deposit Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '21110', 'journal_name' => 'Saving Deposits'));
        DB::table('lib_journals')->insert(array('journal_number' => '21120', 'journal_name' => 'Time Deposits'));
        DB::table('lib_journals')->insert(array('journal_number' => '21200', 'journal_name' => 'Trade and Other Payables'));
        DB::table('lib_journals')->insert(array('journal_number' => '21210', 'journal_name' => 'Accounts Payable Trade'));
        DB::table('lib_journals')->insert(array('journal_number' => '21220', 'journal_name' => 'Accounts Payable Non Trade'));
        DB::table('lib_journals')->insert(array('journal_number' => '21230', 'journal_name' => 'Loans Payable - Current'));
        DB::table('lib_journals')->insert(array('journal_number' => '21240', 'journal_name' => 'Finance Lease Payable - current'));
        DB::table('lib_journals')->insert(array('journal_number' => '21250', 'journal_name' => 'Due to deployed members'));
        DB::table('lib_journals')->insert(array('journal_number' => '21260', 'journal_name' => 'Cash Bond Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '21290', 'journal_name' => 'Other Payables'));
        DB::table('lib_journals')->insert(array('journal_number' => '21300', 'journal_name' => 'Accrued Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '21310', 'journal_name' => 'Due to Regulatory Agencies'));
        DB::table('lib_journals')->insert(array('journal_number' => '21320', 'journal_name' => 'SSS/ECC/Philhealth/Pag-ibig Premium Contributions Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '21330', 'journal_name' => 'SSS/Pag-Ibig Loans Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '21340', 'journal_name' => 'Withholding Tax Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '21350', 'journal_name' => 'Output Tax'));
        DB::table('lib_journals')->insert(array('journal_number' => '21360', 'journal_name' => 'VAT Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '21370', 'journal_name' => 'Income Tax Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '21390', 'journal_name' => 'Other Accrued Expenses'));
        // Other Current Liabilities - 21400
        // DB::table('lib_journals')->insert(array('journal_number' => '21400', 'journal_name' => 'Other Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '21410', 'journal_name' => 'Deposit from Customers'));
        DB::table('lib_journals')->insert(array('journal_number' => '21420', 'journal_name' => 'Advances from Customers'));
        DB::table('lib_journals')->insert(array('journal_number' => '21430', 'journal_name' => 'School Program Support Fund Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '21440', 'journal_name' => 'Interest on Share Capital Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '21450', 'journal_name' => 'Patronage Refund Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '21460', 'journal_name' => 'Due to Union/Federation (CETF)'));
        DB::table('lib_journals')->insert(array('journal_number' => '21490', 'journal_name' => 'Other Current Liabilities'));
        // NON-CURRENT  LIABILITIES 22000
        // DB::table('lib_journals')->insert(array('journal_number' => '22000', 'journal_name' => 'NON-CURRENT LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '22100', 'journal_name' => 'Loans Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '22200', 'journal_name' => 'Discounts on Loans Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '22300', 'journal_name' => 'Revolving Capital Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '22400', 'journal_name' => 'Retirement Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '22500', 'journal_name' => 'Finance Lease Payable - Long Term'));
        // Other Non-Current Liabilities 23000
        // DB::table('lib_journals')->insert(array('journal_number' => '23000', 'journal_name' => 'Other Non-Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '23110', 'journal_name' => 'Project Subsidy Fund'));
        DB::table('lib_journals')->insert(array('journal_number' => '23120', 'journal_name' => 'Members` Benefit and Other Funds Payable'));
        DB::table('lib_journals')->insert(array('journal_number' => '23130', 'journal_name' => 'Due to Head Office/Branch/Satellite'));
        DB::table('lib_journals')->insert(array('journal_number' => '23140', 'journal_name' => 'CSF Guarantee Fund'));
        DB::table('lib_journals')->insert(array('journal_number' => '23190', 'journal_name' => 'Other Non Current Liabilities'));
        // EQUITY 30000
        DB::table('lib_journals')->insert(array('journal_number' => '30100', 'journal_name' => 'MEMBERS` EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30110', 'journal_name' => 'Subscribed Share Capital - Common'));
        DB::table('lib_journals')->insert(array('journal_number' => '30120', 'journal_name' => 'Subscription Receivable - Common'));
        DB::table('lib_journals')->insert(array('journal_number' => '30220', 'journal_name' => 'Subscriptions Receivable Preferred'));
        DB::table('lib_journals')->insert(array('journal_number' => '30230', 'journal_name' => 'Paid-up Share Capital-Preferred'));
        DB::table('lib_journals')->insert(array('journal_number' => '30231', 'journal_name' => 'Treasury Shares Capital -Preferred'));
        DB::table('lib_journals')->insert(array('journal_number' => '30300', 'journal_name' => 'Deposit for Share Capital Subscription'));
        DB::table('lib_journals')->insert(array('journal_number' => '30400', 'journal_name' => 'Undivided Net Surplus'));
        DB::table('lib_journals')->insert(array('journal_number' => '30500', 'journal_name' => 'Net Loss'));
        DB::table('lib_journals')->insert(array('journal_number' => '30600', 'journal_name' => 'Donations/Grants'));
        DB::table('lib_journals')->insert(array('journal_number' => '30700', 'journal_name' => 'Statutory Funds'));
        DB::table('lib_journals')->insert(array('journal_number' => '30710', 'journal_name' => 'Reserve Fund'));
        DB::table('lib_journals')->insert(array('journal_number' => '30720', 'journal_name' => 'Coop. Education & Training Fund'));
        DB::table('lib_journals')->insert(array('journal_number' => '30730', 'journal_name' => 'Community Development Fund'));
        DB::table('lib_journals')->insert(array('journal_number' => '30740', 'journal_name' => 'Optional Fund'));
        DB::table('lib_journals')->insert(array('journal_number' => '30800', 'journal_name' => 'Revaluation Surplus'));
        // STATEMENT OF OPERATIONS
        // REVENUE - 40000
        // DB::table('lib_journals')->insert(array('journal_number' => '40000', 'journal_name' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40100', 'journal_name' => 'Income from Credit Operations'));
        DB::table('lib_journals')->insert(array('journal_number' => '40110', 'journal_name' => 'Interest Income from Loans'));
        DB::table('lib_journals')->insert(array('journal_number' => '40120', 'journal_name' => 'Service Fees'));
        DB::table('lib_journals')->insert(array('journal_number' => '40130', 'journal_name' => 'Filing Fees'));
        DB::table('lib_journals')->insert(array('journal_number' => '40140', 'journal_name' => 'Fines, Penalties, Surcharges'));
        DB::table('lib_journals')->insert(array('journal_number' => '40200', 'journal_name' => 'Income from Service Operations'));
        DB::table('lib_journals')->insert(array('journal_number' => '40210', 'journal_name' => 'Service Income'));
        DB::table('lib_journals')->insert(array('journal_number' => '40220', 'journal_name' => 'Interest Income from Lease Agreement'));
        DB::table('lib_journals')->insert(array('journal_number' => '40300', 'journal_name' => 'Income from Marketing/Consumers/Production Operations'));
        DB::table('lib_journals')->insert(array('journal_number' => '40310', 'journal_name' => 'Sales'));
        DB::table('lib_journals')->insert(array('journal_number' => '40320', 'journal_name' => 'Installment Sales'));
        DB::table('lib_journals')->insert(array('journal_number' => '40330', 'journal_name' => 'Sales Returns & Allowances'));
        DB::table('lib_journals')->insert(array('journal_number' => '40340', 'journal_name' => 'Sales Discounts'));
        DB::table('lib_journals')->insert(array('journal_number' => '40400', 'journal_name' => 'Other Income'));
        DB::table('lib_journals')->insert(array('journal_number' => '40410', 'journal_name' => 'Income/Interest from Investment/Deposits'));
        DB::table('lib_journals')->insert(array('journal_number' => '40420', 'journal_name' => 'Membership Fee'));
        DB::table('lib_journals')->insert(array('journal_number' => '40430', 'journal_name' => 'Commission Income'));
        DB::table('lib_journals')->insert(array('journal_number' => '40450', 'journal_name' => 'Miscellaneous Income'));
        // Cost of Goods Sold - 50000
        //DB::table('lib_journals')->insert(array('journal_number' => '50000', 'journal_name' => 'Cost of Goods Sold'));
        DB::table('lib_journals')->insert(array('journal_number' => '51000', 'journal_name' => 'Cost of Goods Sold'));
        DB::table('lib_journals')->insert(array('journal_number' => '51110', 'journal_name' => 'Purchases'));
        DB::table('lib_journals')->insert(array('journal_number' => '51120', 'journal_name' => 'Raw Material Purchases'));
        DB::table('lib_journals')->insert(array('journal_number' => '51130', 'journal_name' => 'Purchase Returns & Allowances'));
        DB::table('lib_journals')->insert(array('journal_number' => '51140', 'journal_name' => 'Purchase Discounts'));
        DB::table('lib_journals')->insert(array('journal_number' => '51160', 'journal_name' => 'Freight In'));
        DB::table('lib_journals')->insert(array('journal_number' => '51170', 'journal_name' => 'Direct Labor'));
        DB::table('lib_journals')->insert(array('journal_number' => '51180', 'journal_name' => 'Factory/Processing Overhead'));
        DB::table('lib_journals')->insert(array('journal_number' => '51200', 'journal_name' => 'Inventory Loss'));
        // Cost of Services - 60000
        DB::table('lib_journals')->insert(array('journal_number' => '60000', 'journal_name' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61000', 'journal_name' => 'Project Management Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '61110', 'journal_name' => 'Labor and Technical Supervision'));
        DB::table('lib_journals')->insert(array('journal_number' => '61210', 'journal_name' => 'Salaries & Wages'));
        DB::table('lib_journals')->insert(array('journal_number' => '61230', 'journal_name' => 'Employees’ Benefits'));
        DB::table('lib_journals')->insert(array('journal_number' => '61240', 'journal_name' => 'SSS, Philhealth, Pag-Ibig Contribution'));
        DB::table('lib_journals')->insert(array('journal_number' => '61250', 'journal_name' => 'Retirement Benefit Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '61280', 'journal_name' => 'Professional and Consultancy Fees'));
        DB::table('lib_journals')->insert(array('journal_number' => '61370', 'journal_name' => 'Supplies'));
        DB::table('lib_journals')->insert(array('journal_number' => '61410', 'journal_name' => 'Power, Light and Water'));
        DB::table('lib_journals')->insert(array('journal_number' => '61430', 'journal_name' => 'Insurance'));
        DB::table('lib_journals')->insert(array('journal_number' => '61440', 'journal_name' => 'Repairs and Maintenance'));
        DB::table('lib_journals')->insert(array('journal_number' => '61450', 'journal_name' => 'Rentals'));
        DB::table('lib_journals')->insert(array('journal_number' => '61490', 'journal_name' => 'Gas, Oil & Lubricants'));
        DB::table('lib_journals')->insert(array('journal_number' => '61520', 'journal_name' => 'Miscellaneous'));
        DB::table('lib_journals')->insert(array('journal_number' => '61530', 'journal_name' => 'Depreciation'));
        DB::table('lib_journals')->insert(array('journal_number' => '61540', 'journal_name' => 'Amortization'));
        DB::table('lib_journals')->insert(array('journal_number' => '62000', 'journal_name' => 'Generation Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '62120', 'journal_name' => 'Power Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '62130', 'journal_name' => 'Labor and Technical Supervision'));
        DB::table('lib_journals')->insert(array('journal_number' => '62210', 'journal_name' => 'Salaries & Wages'));
        DB::table('lib_journals')->insert(array('journal_number' => '62230', 'journal_name' => 'Employees’ Benefits'));
        DB::table('lib_journals')->insert(array('journal_number' => '62240', 'journal_name' => 'SSS,Philhealth/ECC/Pag-Ibig Contribution'));
        DB::table('lib_journals')->insert(array('journal_number' => '62250', 'journal_name' => 'Retirement Benefit Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '62250', 'journal_name' => 'Miscellaneous'));
        DB::table('lib_journals')->insert(array('journal_number' => '62280', 'journal_name' => 'Professional and Consultancy Fees'));
        DB::table('lib_journals')->insert(array('journal_number' => '62370', 'journal_name' => 'Supplies'));
        DB::table('lib_journals')->insert(array('journal_number' => '62410', 'journal_name' => 'Power, Light and Water'));
        DB::table('lib_journals')->insert(array('journal_number' => '62430', 'journal_name' => 'Insurance'));
        DB::table('lib_journals')->insert(array('journal_number' => '62440', 'journal_name' => 'Repairs and Maintenance'));
        DB::table('lib_journals')->insert(array('journal_number' => '62450', 'journal_name' => 'Rentals'));
        DB::table('lib_journals')->insert(array('journal_number' => '62490', 'journal_name' => 'Gas, Oil & Lubricants'));
        DB::table('lib_journals')->insert(array('journal_number' => '62530', 'journal_name' => 'Depreciation'));
        DB::table('lib_journals')->insert(array('journal_number' => '62540', 'journal_name' => 'Amortization'));
        DB::table('lib_journals')->insert(array('journal_number' => '62590', 'journal_name' => 'Impairment Loss'));
        DB::table('lib_journals')->insert(array('journal_number' => '63000', 'journal_name' => 'Distribution Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '63120', 'journal_name' => 'Power Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '63130', 'journal_name' => 'Labor and Technical Supervision'));
        DB::table('lib_journals')->insert(array('journal_number' => '63210', 'journal_name' => 'Salaries & Wages'));
        DB::table('lib_journals')->insert(array('journal_number' => '63230', 'journal_name' => 'Employees’ Benefits'));
        DB::table('lib_journals')->insert(array('journal_number' => '63240', 'journal_name' => 'SSS, Phil health, ECC, Pag-Ibig Contribution'));
        DB::table('lib_journals')->insert(array('journal_number' => '63250', 'journal_name' => 'Retirement Benefit Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '63280', 'journal_name' => 'Professional and Consultancy Fees'));
        DB::table('lib_journals')->insert(array('journal_number' => '63370', 'journal_name' => 'Supplies'));
        DB::table('lib_journals')->insert(array('journal_number' => '63390', 'journal_name' => 'Training/ Seminars'));
        DB::table('lib_journals')->insert(array('journal_number' => '63410', 'journal_name' => 'Power, Light and Water'));
        DB::table('lib_journals')->insert(array('journal_number' => '63420', 'journal_name' => 'Travel and Transportation'));
        DB::table('lib_journals')->insert(array('journal_number' => '63430', 'journal_name' => 'Insurance'));
        DB::table('lib_journals')->insert(array('journal_number' => '63440', 'journal_name' => 'Repairs and Maintenance'));
        DB::table('lib_journals')->insert(array('journal_number' => '63450', 'journal_name' => 'Rentals'));
        DB::table('lib_journals')->insert(array('journal_number' => '63470', 'journal_name' => 'Communication'));
        DB::table('lib_journals')->insert(array('journal_number' => '63490', 'journal_name' => 'Gas, Oil & Lubricants'));
        DB::table('lib_journals')->insert(array('journal_number' => '63520', 'journal_name' => 'Miscellaneous'));
        DB::table('lib_journals')->insert(array('journal_number' => '63530', 'journal_name' => 'Depreciation'));
        DB::table('lib_journals')->insert(array('journal_number' => '63540', 'journal_name' => 'Amortization'));
        DB::table('lib_journals')->insert(array('journal_number' => '63590', 'journal_name' => 'Impairment Loss'));
        DB::table('lib_journals')->insert(array('journal_number' => '64000', 'journal_name' => 'Transport Service Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '64140', 'journal_name' => 'Driver’s/Conductor’s Fees'));
        DB::table('lib_journals')->insert(array('journal_number' => '64150', 'journal_name' => 'Vehicle Registration and Licensing  Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '64160', 'journal_name' => 'Toll Fees'));
        DB::table('lib_journals')->insert(array('journal_number' => '64170', 'journal_name' => 'Incidental Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '64430', 'journal_name' => 'Insurance'));
        DB::table('lib_journals')->insert(array('journal_number' => '64440', 'journal_name' => 'Repairs and Maintenance'));
        DB::table('lib_journals')->insert(array('journal_number' => '64490', 'journal_name' => 'Gas, Oil & Lubricants'));
        DB::table('lib_journals')->insert(array('journal_number' => '64530', 'journal_name' => 'Depreciation'));
        // EXPENSES - 70000
        // DB::table('lib_journals')->insert(array('journal_number' => '70000', 'journal_name' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '71000', 'journal_name' => 'Financing Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '71100', 'journal_name' => 'Interest Expense on Borrowings'));
        DB::table('lib_journals')->insert(array('journal_number' => '71200', 'journal_name' => 'Interest Expense on Deposits'));
        DB::table('lib_journals')->insert(array('journal_number' => '71300', 'journal_name' => 'Other Financing Charges'));
        DB::table('lib_journals')->insert(array('journal_number' => '72000', 'journal_name' => 'Selling/ Marketing Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '72180', 'journal_name' => 'Product/Service Marketing and Promotion Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '72190', 'journal_name' => 'Product/ Service Development'));
        DB::table('lib_journals')->insert(array('journal_number' => '72200', 'journal_name' => 'Product Research'));
        DB::table('lib_journals')->insert(array('journal_number' => '72210', 'journal_name' => 'Salaries & Wages'));
        DB::table('lib_journals')->insert(array('journal_number' => '72220', 'journal_name' => 'Incentives and Allowances'));
        DB::table('lib_journals')->insert(array('journal_number' => '72230', 'journal_name' => 'Employees Benefits'));
        DB::table('lib_journals')->insert(array('journal_number' => '72240', 'journal_name' => 'SSS, Philhealth, ECC, Pag-Ibig Premium Contribution'));
        DB::table('lib_journals')->insert(array('journal_number' => '72250', 'journal_name' => 'Retirement Benefit Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '72260', 'journal_name' => 'Commission Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '72270', 'journal_name' => 'Advertising & Promotion'));
        DB::table('lib_journals')->insert(array('journal_number' => '72280', 'journal_name' => 'Professional Fees'));
        DB::table('lib_journals')->insert(array('journal_number' => '72290', 'journal_name' => 'Royalties'));
        DB::table('lib_journals')->insert(array('journal_number' => '72310', 'journal_name' => 'Store/ Canteen/ Kitchen and Catering Supplies Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '72320', 'journal_name' => 'Breakage & Losses on Kitchen Utensils'));
        DB::table('lib_journals')->insert(array('journal_number' => '72330', 'journal_name' => 'Freight Out/Delivery Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '72340', 'journal_name' => 'Spoilage, Breakage And Losses'));
        DB::table('lib_journals')->insert(array('journal_number' => '72350', 'journal_name' => 'Storage/Warehousing Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '72410', 'journal_name' => 'Power, Light and Water'));
        DB::table('lib_journals')->insert(array('journal_number' => '72420', 'journal_name' => 'Travel and Transportation'));
        DB::table('lib_journals')->insert(array('journal_number' => '72430', 'journal_name' => 'Insurance'));
        DB::table('lib_journals')->insert(array('journal_number' => '72440', 'journal_name' => 'Repairs and Maintenance'));
        DB::table('lib_journals')->insert(array('journal_number' => '72450', 'journal_name' => 'Rentals'));
        DB::table('lib_journals')->insert(array('journal_number' => '72460', 'journal_name' => 'Taxes, Fees and Charges'));
        DB::table('lib_journals')->insert(array('journal_number' => '72470', 'journal_name' => 'Communication'));
        DB::table('lib_journals')->insert(array('journal_number' => '72480', 'journal_name' => 'Representation'));
        DB::table('lib_journals')->insert(array('journal_number' => '72490', 'journal_name' => 'Gas, Oil & Lubricants'));
        DB::table('lib_journals')->insert(array('journal_number' => '72520', 'journal_name' => 'Miscellaneous Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '72530', 'journal_name' => 'Depreciation'));
        DB::table('lib_journals')->insert(array('journal_number' => '72540', 'journal_name' => 'Amortization'));
        DB::table('lib_journals')->insert(array('journal_number' => '72550', 'journal_name' => 'Amortization of Leasehold Rights & Improvement'));
        DB::table('lib_journals')->insert(array('journal_number' => '72660', 'journal_name' => 'Periodicals, Magazines & Subscription'));
        DB::table('lib_journals')->insert(array('journal_number' => '73000', 'journal_name' => 'Administrative Cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '73210', 'journal_name' => 'Salaries & Wages'));
        DB::table('lib_journals')->insert(array('journal_number' => '73230', 'journal_name' => 'Employees Benefits'));
        DB::table('lib_journals')->insert(array('journal_number' => '73240', 'journal_name' => 'SSS,Philhealth, ECC, Pag-ibig Premium Contributions'));
        DB::table('lib_journals')->insert(array('journal_number' => '73250', 'journal_name' => 'Retirement Benefit Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '73270', 'journal_name' => 'Officers’ Honorarium and Allowances'));
        DB::table('lib_journals')->insert(array('journal_number' => '73300', 'journal_name' => 'Litigation Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '73360', 'journal_name' => 'School Program Support'));
        DB::table('lib_journals')->insert(array('journal_number' => '73370', 'journal_name' => 'Office Supplies'));
        DB::table('lib_journals')->insert(array('journal_number' => '73380', 'journal_name' => 'Meetings and Conferences'));
        DB::table('lib_journals')->insert(array('journal_number' => '73390', 'journal_name' => 'Trainings/ Seminars'));
        DB::table('lib_journals')->insert(array('journal_number' => '73400', 'journal_name' => 'Certifications and Recognitions'));
        DB::table('lib_journals')->insert(array('journal_number' => '73410', 'journal_name' => 'Power, Light & Water'));
        DB::table('lib_journals')->insert(array('journal_number' => '73420', 'journal_name' => 'Travel & Transportation'));
        DB::table('lib_journals')->insert(array('journal_number' => '73430', 'journal_name' => 'Insurance'));
        DB::table('lib_journals')->insert(array('journal_number' => '73440', 'journal_name' => 'Repairs & Maintenance'));
        DB::table('lib_journals')->insert(array('journal_number' => '73450', 'journal_name' => 'Rentals'));
        DB::table('lib_journals')->insert(array('journal_number' => '73460', 'journal_name' => 'Taxes,  Fees and Charges'));
        DB::table('lib_journals')->insert(array('journal_number' => '73470', 'journal_name' => 'Communication'));
        DB::table('lib_journals')->insert(array('journal_number' => '73480', 'journal_name' => 'Representation'));
        DB::table('lib_journals')->insert(array('journal_number' => '73490', 'journal_name' => 'Gas, Oil & Lubricants'));
        DB::table('lib_journals')->insert(array('journal_number' => '73500', 'journal_name' => 'Collection Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '73510', 'journal_name' => 'General Support Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '73520', 'journal_name' => 'Miscellaneous Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '73530', 'journal_name' => 'Depreciation'));
        DB::table('lib_journals')->insert(array('journal_number' => '73540', 'journal_name' => 'Amortization'));
        DB::table('lib_journals')->insert(array('journal_number' => '73550', 'journal_name' => 'Amortization of Leasehold Rights and Improvement'));
        DB::table('lib_journals')->insert(array('journal_number' => '73560', 'journal_name' => 'Probable Losses on Loan /Accounts/Installment Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '73590', 'journal_name' => 'Impairment Losses'));
        DB::table('lib_journals')->insert(array('journal_number' => '73600', 'journal_name' => 'Bank Charges'));
        DB::table('lib_journals')->insert(array('journal_number' => '73610', 'journal_name' => 'General Assembly Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '73620', 'journal_name' => 'Members Benefit Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '73630', 'journal_name' => 'Affiliation Fee'));
        DB::table('lib_journals')->insert(array('journal_number' => '73640', 'journal_name' => 'Social & Community Service Expense'));
        DB::table('lib_journals')->insert(array('journal_number' => '73650', 'journal_name' => 'Provision for  CGF (KBGF)'));
        // Other Items – Subsidy/ Gain (Losses) - 80000
        // DB::table('lib_journals')->insert(array('journal_number' => '80000', 'journal_name' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '80100', 'journal_name' => 'Project Subsidy'));
        DB::table('lib_journals')->insert(array('journal_number' => '80200', 'journal_name' => 'Donation and Grant Subsidy'));
        DB::table('lib_journals')->insert(array('journal_number' => '80300', 'journal_name' => 'Optional Fund Subsidy'));
        DB::table('lib_journals')->insert(array('journal_number' => '80400', 'journal_name' => 'Educational Fund Subsidy'));
        DB::table('lib_journals')->insert(array('journal_number' => '80500', 'journal_name' => 'Subsidized Project Expenses'));
        DB::table('lib_journals')->insert(array('journal_number' => '81100', 'journal_name' => 'Gains or Losses on Sale of Property & Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '81200', 'journal_name' => 'Gains or Losses in Financial Assets through Profit and Loss'));
        DB::table('lib_journals')->insert(array('journal_number' => '81300', 'journal_name' => 'Gains or Losses in Financial Assets at cost'));
        DB::table('lib_journals')->insert(array('journal_number' => '81400', 'journal_name' => 'Gains or Losses on RPA'));
        DB::table('lib_journals')->insert(array('journal_number' => '81500', 'journal_name' => 'Gains or Losses on assets acquired in settlement of loans'));
        DB::table('lib_journals')->insert(array('journal_number' => '81600', 'journal_name' => 'Gains or Losses on Sale of Repossessed Item'));
        DB::table('lib_journals')->insert(array('journal_number' => '81700', 'journal_name' => 'Gains or Losses from Foreign Exchange Valuation'));
        DB::table('lib_journals')->insert(array('journal_number' => '82000', 'journal_name' => 'Prior Years’ Adjustment'));
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
