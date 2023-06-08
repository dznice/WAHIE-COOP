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
        DB::table('lib_journals')->insert(array('journal_number' => '11110', 'journal_name' => 'Cash on Hand', 'journal_type' => 'Cash and Cash Equivalents'));
        DB::table('lib_journals')->insert(array('journal_number' => '11120', 'journal_name' => 'Checks & Other Cash Items (COCI)', 'journal_type' => 'Cash and Cash Equivalents'));
        DB::table('lib_journals')->insert(array('journal_number' => '11130', 'journal_name' => 'Cash in Bank', 'journal_type' => 'Cash and Cash Equivalents'));
        DB::table('lib_journals')->insert(array('journal_number' => '11140', 'journal_name' => 'Cash in Cooperative Federation', 'journal_type' => 'Cash and Cash Equivalents'));
        DB::table('lib_journals')->insert(array('journal_number' => '11150', 'journal_name' => 'Petty Cash Fund', 'journal_type' => 'Cash and Cash Equivalents'));
        DB::table('lib_journals')->insert(array('journal_number' => '11160', 'journal_name' => 'Revolving Fund', 'journal_type' => 'Cash and Cash Equivalents'));
        DB::table('lib_journals')->insert(array('journal_number' => '11170', 'journal_name' => 'Change Fund', 'journal_type' => 'Cash and Cash Equivalents'));
        DB::table('lib_journals')->insert(array('journal_number' => '11180', 'journal_name' => 'ATM Fund', 'journal_type' => 'Cash and Cash Equivalents'));
        // Loans And Receivables 11200 - 11300
        DB::table('lib_journals')->insert(array('journal_number' => '11210', 'journal_name' => 'Loans Receivable - Current', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11220', 'journal_name' => 'Loans Receivable - Past Due', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11230', 'journal_name' => 'Loans Receivable Restructured', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11240', 'journal_name' => 'Loans Receivable - Loans in Litigation', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11241', 'journal_name' => 'Unearned Interests and Discounts', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11242', 'journal_name' => 'Allowance for Probable Losses - Loans', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11250', 'journal_name' => 'Accounts Receivables Trade - Current', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11260', 'journal_name' => 'Accounts Receivables Trade - Past Due', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11270', 'journal_name' => 'Accounts Receivables Trade - Restructured', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11280', 'journal_name' => 'Accounts Receivables Trade - in Litigation', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11281', 'journal_name' => 'Allowance for Probable Losses - Accounts Receivable Trade', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11290', 'journal_name' => 'Installment Receivables - Current', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11300', 'journal_name' => 'Installment Receivables - Past Due', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11310', 'journal_name' => 'Installment Receivables - Restructured', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11320', 'journal_name' => 'Installment Receivables - in Litigation', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11321', 'journal_name' => 'Allowance for Probable Losses - Installment Receivables', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11322', 'journal_name' => 'Unrealized Gross Margin', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11330', 'journal_name' => 'Sales Contract Receivable', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11331', 'journal_name' => 'Allowance for Probable Losses - Sales Contract Receivables', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11340', 'journal_name' => 'Accounts Receivable - non trade', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11341', 'journal_name' => 'Allowance for Probable Losses - Accounts Receivablenon trade', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11350', 'journal_name' => 'Advances to Officers, Employees and Members', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11360', 'journal_name' => 'Due from  Accountable Officers, Employees and Members', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11370', 'journal_name' => 'Finance Lease Receivable', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11371', 'journal_name' => 'Allowance for Impairment – Finance Lease Receivable', 'journal_type' => 'Loans And Receivables'));
        DB::table('lib_journals')->insert(array('journal_number' => '11380', 'journal_name' => 'Other Current Receivables', 'journal_type' => 'Loans And Receivables'));
        // Financial Assets 11400
        DB::table('lib_journals')->insert(array('journal_number' => '11400', 'journal_name' => 'Financial Assets', 'journal_type' => 'Financial Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '11410', 'journal_name' => 'Financial asset at fair value through profit or loss', 'journal_type' => 'Financial Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '11420', 'journal_name' => 'Financial asset at cost', 'journal_type' => 'Financial Assets'));
        // Inventories 11500
        DB::table('lib_journals')->insert(array('journal_number' => '11500', 'journal_name' => 'Inventories', 'journal_type' => 'Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11510', 'journal_name' => 'Merchandise Inventory', 'journal_type' => 'Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11520', 'journal_name' => 'Repossessed Inventories', 'journal_type' => 'Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11530', 'journal_name' => 'Spare Parts/Materials & Other Goods Inventory', 'journal_type' => 'Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11540', 'journal_name' => 'Raw Materials Inventory', 'journal_type' => 'Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11550', 'journal_name' => 'Work in Process Inventory', 'journal_type' => 'Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11560', 'journal_name' => 'Finished Goods Inventory', 'journal_type' => 'Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11570', 'journal_name' => 'Inventory Agricultural Produce', 'journal_type' => 'Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11580', 'journal_name' => 'Equipment for Lease Inventory', 'journal_type' => 'Inventories'));
        DB::table('lib_journals')->insert(array('journal_number' => '11590', 'journal_name' => 'Allowance for impairment - Inventory', 'journal_type' => 'Inventories'));
        // Biologicals Assets 11600
        DB::table('lib_journals')->insert(array('journal_number' => '11600', 'journal_name' => 'Biological Assets', 'journal_type' => 'Biologicals Assets'));
        // Other Current Assets - 12000
        // DB::table('lib_journals')->insert(array('journal_number' => '12000', 'journal_name' => 'Other Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '12110', 'journal_name' => 'Input Tax', 'journal_type' => 'Other Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '12120', 'journal_name' => 'Creditable VAT', 'journal_type' => 'Other Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '12130', 'journal_name' => 'Creditable Withholding Tax', 'journal_type' => 'Other Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '12140', 'journal_name' => 'Deposit to Suppliers', 'journal_type' => 'Other Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '12150', 'journal_name' => 'Unused Supplies', 'journal_type' => 'Other Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '12160', 'journal_name' => 'Assets Acquired in Settlement of Loans/Accounts', 'journal_type' => 'Other Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '12161', 'journal_name' => 'Accumulated Depreciation and ImpairmentAssets Acquired in Settlement of loans/accounts', 'journal_type' => 'Other Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '12170', 'journal_name' => 'Prepaid Expenses', 'journal_type' => 'Other Current Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '12200', 'journal_name' => 'Other Current Assets', 'journal_type' => 'Other Current Assets'));
        // NON CURRENT ASSETS 13000 - 17000
        DB::table('lib_journals')->insert(array('journal_number' => '13100', 'journal_name' => 'Financial Assets Long Term', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13110', 'journal_name' => 'Financial asset at cost', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13120', 'journal_name' => 'Financial Asset at amortized cost', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13200', 'journal_name' => 'Investment in Subsidiaries', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13300', 'journal_name' => 'Investment in Associates', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13400', 'journal_name' => 'Investment in Joint Ventures', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13500', 'journal_name' => 'Investment Property', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13510', 'journal_name' => 'Investment Property - Land', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13520', 'journal_name' => 'Investment Property - Building', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13521', 'journal_name' => 'Accumulated Depreciation - Investment Property - Building', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13530', 'journal_name' => 'Real Properties Acquired (RPA)', 'journal_type' => 'NON CURRENT ASSETS'));
        DB::table('lib_journals')->insert(array('journal_number' => '13610', 'journal_name' => 'Accumulated Depreciation - RPA', 'journal_type' => 'NON CURRENT ASSETS'));
        // Property, Plant and Equipment - 14000
        // DB::table('lib_journals')->insert(array('journal_number' => '14000', 'journal_name' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14110', 'journal_name' => 'Land', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14120', 'journal_name' => 'Land Improvements', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14121', 'journal_name' => 'Accumulated Depreciation - Land Improvements', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14130', 'journal_name' => 'Building and Improvements', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14131', 'journal_name' => 'Accumulated Depreciation - Building and Improvements', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14140', 'journal_name' => 'Building on Leased/Usufruct Land', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14141', 'journal_name' => 'Accumulated Depreciation - Building on Leased/Usufruct Land', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14150', 'journal_name' => 'Utility Plant', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14151', 'journal_name' => 'Accumulated Depreciation - Utility Plant', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14160', 'journal_name' => 'Property, Plant & Equipment -Under Finance Lease', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14161', 'journal_name' => 'AccumulatedDepreciation - Property, Plant & Equipment - Under Finance Lease', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14170', 'journal_name' => 'Construction in Progress', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14171', 'journal_name' => 'Accumulated Depreciation - Property, Plant &Equipment – Under Finance Lease', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14180', 'journal_name' => 'Furniture, Fixtures & Equipment (FFE)', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14181', 'journal_name' => 'Accumulated Depreciation FFE', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14190', 'journal_name' => 'Machineries, Tools and Equipment', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14191', 'journal_name' => 'Accumulated Depreciation -  Machineries, Tools and Equipment', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14200', 'journal_name' => 'Kitchen, Canteen & Catering Equipment/Utensils', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14201', 'journal_name' => 'Accumulated Depreciation -  Kitchen, Canteen & Catering Equipment/Utensils', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14210', 'journal_name' => 'Transportation Equipment', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14211', 'journal_name' => 'Accumulated Depreciation - Transportation Equipment', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14220', 'journal_name' => 'Linens and Uniforms', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14221', 'journal_name' => 'Accumulated Depreciation - Linens and Uniforms', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14230', 'journal_name' => 'Nursery/Greenhouses', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14231', 'journal_name' => 'Accumulated Depreciation - Nursery/Greenhouse', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14240', 'journal_name' => 'Leasehold Rights & Improvements', 'journal_type' => 'Property, Plant and Equipment'));
        DB::table('lib_journals')->insert(array('journal_number' => '14290', 'journal_name' => 'Other Property, Plant and Equipment', 'journal_type' => 'Property, Plant and Equipment'));
        // Biological Assets - 15000
        DB::table('lib_journals')->insert(array('journal_number' => '15000', 'journal_name' => 'Biological Assets', 'journal_type' => 'Biological Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '15100', 'journal_name' => 'Biological Assets - Animals', 'journal_type' => 'Biological Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '15110', 'journal_name' => 'Accumulated Depreciation - Biological Assets - Animals', 'journal_type' => 'Biological Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '15200', 'journal_name' => 'Biological Assets - Plants', 'journal_type' => 'Biological Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '15210', 'journal_name' => 'Accumulated Depreciation Biological Assets - Plants', 'journal_type' => 'Biological Assets'));
        // Intangible Assets - 16000
        DB::table('lib_journals')->insert(array('journal_number' => '16000', 'journal_name' => 'Intangible Assets', 'journal_type' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '16100', 'journal_name' => 'Franchise', 'journal_type' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '16200', 'journal_name' => 'Franchise Cost', 'journal_type' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '16300', 'journal_name' => 'Copyright', 'journal_type' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '16400', 'journal_name' => 'Patent', 'journal_type' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '17000', 'journal_name' => 'Other Non-Current Assets', 'journal_type' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '17100', 'journal_name' => 'Computerization Cost', 'journal_type' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '17200', 'journal_name' => 'Other Funds and Deposits', 'journal_type' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '17300', 'journal_name' => 'Due from Head Office/Branch/ Satellites', 'journal_type' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '17400', 'journal_name' => 'Deposit on Returnable Containers', 'journal_type' => 'Intangible Assets'));
        DB::table('lib_journals')->insert(array('journal_number' => '17900', 'journal_name' => 'Miscellaneous Assets', 'journal_type' => 'Intangible Assets'));
        // LIABILITIES 20000
        // DB::table('lib_journals')->insert(array('journal_number' => '20000', 'journal_name' => 'LIABILITIES'));
        // CURRENT LIABILITIES 21000 - 23000
        DB::table('lib_journals')->insert(array('journal_number' => '21100', 'journal_name' => 'Deposit Liabilities', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21110', 'journal_name' => 'Saving Deposits', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21120', 'journal_name' => 'Time Deposits', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21200', 'journal_name' => 'Trade and Other Payables', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21210', 'journal_name' => 'Accounts Payable Trade', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21220', 'journal_name' => 'Accounts Payable Non Trade', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21230', 'journal_name' => 'Loans Payable - Current', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21240', 'journal_name' => 'Finance Lease Payable - current', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21250', 'journal_name' => 'Due to deployed members', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21260', 'journal_name' => 'Cash Bond Payable', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21290', 'journal_name' => 'Other Payables', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21300', 'journal_name' => 'Accrued Expenses', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21310', 'journal_name' => 'Due to Regulatory Agencies', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21320', 'journal_name' => 'SSS/ECC/Philhealth/Pag-ibig Premium Contributions Payable', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21330', 'journal_name' => 'SSS/Pag-Ibig Loans Payable', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21340', 'journal_name' => 'Withholding Tax Payable', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21350', 'journal_name' => 'Output Tax', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21360', 'journal_name' => 'VAT Payable', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21370', 'journal_name' => 'Income Tax Payable', 'journal_type' => 'LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '21390', 'journal_name' => 'Other Accrued Expenses', 'journal_type' => 'LIABILITIES'));
        // Other Current Liabilities - 21400
        // DB::table('lib_journals')->insert(array('journal_number' => '21400', 'journal_name' => 'Other Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '21410', 'journal_name' => 'Deposit from Customers', 'journal_type' => 'Other Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '21420', 'journal_name' => 'Advances from Customers', 'journal_type' => 'Other Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '21430', 'journal_name' => 'School Program Support Fund Payable', 'journal_type' => 'Other Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '21440', 'journal_name' => 'Interest on Share Capital Payable', 'journal_type' => 'Other Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '21450', 'journal_name' => 'Patronage Refund Payable', 'journal_type' => 'Other Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '21460', 'journal_name' => 'Due to Union/Federation (CETF)', 'journal_type' => 'Other Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '21490', 'journal_name' => 'Other Current Liabilities', 'journal_type' => 'Other Current Liabilities'));
        // NON-CURRENT  LIABILITIES 22000
        // DB::table('lib_journals')->insert(array('journal_number' => '22000', 'journal_name' => 'NON-CURRENT LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '22100', 'journal_name' => 'Loans Payable', 'journal_type' => 'NON-CURRENT  LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '22200', 'journal_name' => 'Discounts on Loans Payable', 'journal_type' => 'NON-CURRENT  LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '22300', 'journal_name' => 'Revolving Capital Payable', 'journal_type' => 'NON-CURRENT  LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '22400', 'journal_name' => 'Retirement Payable', 'journal_type' => 'NON-CURRENT  LIABILITIES'));
        DB::table('lib_journals')->insert(array('journal_number' => '22500', 'journal_name' => 'Finance Lease Payable - Long Term', 'journal_type' => 'NON-CURRENT  LIABILITIES'));
        // Other Non-Current Liabilities 23000
        // DB::table('lib_journals')->insert(array('journal_number' => '23000', 'journal_name' => 'Other Non-Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '23110', 'journal_name' => 'Project Subsidy Fund', 'journal_type' => 'Other Non-Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '23120', 'journal_name' => 'Members` Benefit and Other Funds Payable', 'journal_type' => 'Other Non-Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '23130', 'journal_name' => 'Due to Head Office/Branch/Satellite', 'journal_type' => 'Other Non-Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '23140', 'journal_name' => 'CSF Guarantee Fund', 'journal_type' => 'Other Non-Current Liabilities'));
        DB::table('lib_journals')->insert(array('journal_number' => '23190', 'journal_name' => 'Other Non Current Liabilities', 'journal_type' => 'Other Non-Current Liabilities'));
        // EQUITY 30000
        DB::table('lib_journals')->insert(array('journal_number' => '30100', 'journal_name' => 'MEMBERS` EQUITY', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30110', 'journal_name' => 'Subscribed Share Capital - Common', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30120', 'journal_name' => 'Subscription Receivable - Common', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30220', 'journal_name' => 'Subscriptions Receivable Preferred', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30230', 'journal_name' => 'Paid-up Share Capital-Preferred', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30231', 'journal_name' => 'Treasury Shares Capital -Preferred', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30300', 'journal_name' => 'Deposit for Share Capital Subscription', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30400', 'journal_name' => 'Undivided Net Surplus', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30500', 'journal_name' => 'Net Loss', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30600', 'journal_name' => 'Donations/Grants', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30700', 'journal_name' => 'Statutory Funds', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30710', 'journal_name' => 'Reserve Fund', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30720', 'journal_name' => 'Coop. Education & Training Fund', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30730', 'journal_name' => 'Community Development Fund', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30740', 'journal_name' => 'Optional Fund', 'journal_type' => 'EQUITY'));
        DB::table('lib_journals')->insert(array('journal_number' => '30800', 'journal_name' => 'Revaluation Surplus', 'journal_type' => 'EQUITY'));
        // STATEMENT OF OPERATIONS
        // REVENUE - 40000
        // DB::table('lib_journals')->insert(array('journal_number' => '40000', 'journal_name' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40100', 'journal_name' => 'Income from Credit Operations', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40110', 'journal_name' => 'Interest Income from Loans', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40120', 'journal_name' => 'Service Fees', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40130', 'journal_name' => 'Filing Fees', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40140', 'journal_name' => 'Fines, Penalties, Surcharges', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40200', 'journal_name' => 'Income from Service Operations', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40210', 'journal_name' => 'Service Income', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40220', 'journal_name' => 'Interest Income from Lease Agreement', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40300', 'journal_name' => 'Income from Marketing/Consumers/Production Operations', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40310', 'journal_name' => 'Sales', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40320', 'journal_name' => 'Installment Sales', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40330', 'journal_name' => 'Sales Returns & Allowances', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40340', 'journal_name' => 'Sales Discounts', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40400', 'journal_name' => 'Other Income', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40410', 'journal_name' => 'Income/Interest from Investment/Deposits', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40420', 'journal_name' => 'Membership Fee', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40430', 'journal_name' => 'Commission Income', 'journal_type' => 'REVENUE'));
        DB::table('lib_journals')->insert(array('journal_number' => '40450', 'journal_name' => 'Miscellaneous Income', 'journal_type' => 'REVENUE'));
        // Cost of Goods Sold - 50000
        //DB::table('lib_journals')->insert(array('journal_number' => '50000', 'journal_name' => 'Cost of Goods Sold'));
        DB::table('lib_journals')->insert(array('journal_number' => '51000', 'journal_name' => 'Cost of Goods Sold', 'journal_type' => 'Cost of Goods Sold'));
        DB::table('lib_journals')->insert(array('journal_number' => '51110', 'journal_name' => 'Purchases', 'journal_type' => 'Cost of Goods Sold'));
        DB::table('lib_journals')->insert(array('journal_number' => '51120', 'journal_name' => 'Raw Material Purchases', 'journal_type' => 'Cost of Goods Sold'));
        DB::table('lib_journals')->insert(array('journal_number' => '51130', 'journal_name' => 'Purchase Returns & Allowances', 'journal_type' => 'Cost of Goods Sold'));
        DB::table('lib_journals')->insert(array('journal_number' => '51140', 'journal_name' => 'Purchase Discounts', 'journal_type' => 'Cost of Goods Sold'));
        DB::table('lib_journals')->insert(array('journal_number' => '51160', 'journal_name' => 'Freight In', 'journal_type' => 'Cost of Goods Sold'));
        DB::table('lib_journals')->insert(array('journal_number' => '51170', 'journal_name' => 'Direct Labor'));
        DB::table('lib_journals')->insert(array('journal_number' => '51180', 'journal_name' => 'Factory/Processing Overhead', 'journal_type' => 'Cost of Goods Sold'));
        DB::table('lib_journals')->insert(array('journal_number' => '51200', 'journal_name' => 'Inventory Loss', 'journal_type' => 'Cost of Goods Sold'));
        // Cost of Services - 60000
        DB::table('lib_journals')->insert(array('journal_number' => '60000', 'journal_name' => 'Cost of Services', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61000', 'journal_name' => 'Project Management Cost', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61110', 'journal_name' => 'Labor and Technical Supervision', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61210', 'journal_name' => 'Salaries & Wages', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61230', 'journal_name' => 'Employees’ Benefits', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61240', 'journal_name' => 'SSS, Philhealth, Pag-Ibig Contribution', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61250', 'journal_name' => 'Retirement Benefit Expenses', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61280', 'journal_name' => 'Professional and Consultancy Fees', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61370', 'journal_name' => 'Supplies', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61410', 'journal_name' => 'Power, Light and Water', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61430', 'journal_name' => 'Insurance', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61440', 'journal_name' => 'Repairs and Maintenance', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61450', 'journal_name' => 'Rentals', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61490', 'journal_name' => 'Gas, Oil & Lubricants', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61520', 'journal_name' => 'Miscellaneous', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61530', 'journal_name' => 'Depreciation', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '61540', 'journal_name' => 'Amortization', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62000', 'journal_name' => 'Generation Cost', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62120', 'journal_name' => 'Power Cost', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62130', 'journal_name' => 'Labor and Technical Supervision', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62210', 'journal_name' => 'Salaries & Wages', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62230', 'journal_name' => 'Employees’ Benefits', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62240', 'journal_name' => 'SSS,Philhealth/ECC/Pag-Ibig Contribution', 'journal_type' => 'Cost of Services'));
       // DB::table('lib_journals')->insert(array('journal_number' => '62250', 'journal_name' => 'Retirement Benefit Expenses', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62250', 'journal_name' => 'Miscellaneous', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62280', 'journal_name' => 'Professional and Consultancy Fees', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62370', 'journal_name' => 'Supplies', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62410', 'journal_name' => 'Power, Light and Water', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62430', 'journal_name' => 'Insurance', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62440', 'journal_name' => 'Repairs and Maintenance', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62450', 'journal_name' => 'Rentals', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62490', 'journal_name' => 'Gas, Oil & Lubricants', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62530', 'journal_name' => 'Depreciation', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62540', 'journal_name' => 'Amortization', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '62590', 'journal_name' => 'Impairment Loss', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63000', 'journal_name' => 'Distribution Cost', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63120', 'journal_name' => 'Power Cost', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63130', 'journal_name' => 'Labor and Technical Supervision', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63210', 'journal_name' => 'Salaries & Wages', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63230', 'journal_name' => 'Employees’ Benefits', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63240', 'journal_name' => 'SSS, Phil health, ECC, Pag-Ibig Contribution', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63250', 'journal_name' => 'Retirement Benefit Expenses', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63280', 'journal_name' => 'Professional and Consultancy Fees', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63370', 'journal_name' => 'Supplies', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63390', 'journal_name' => 'Training/ Seminars', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63410', 'journal_name' => 'Power, Light and Water', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63420', 'journal_name' => 'Travel and Transportation', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63430', 'journal_name' => 'Insurance', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63440', 'journal_name' => 'Repairs and Maintenance', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63450', 'journal_name' => 'Rentals', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63470', 'journal_name' => 'Communication', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63490', 'journal_name' => 'Gas, Oil & Lubricants', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63520', 'journal_name' => 'Miscellaneous', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63530', 'journal_name' => 'Depreciation', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63540', 'journal_name' => 'Amortization', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '63590', 'journal_name' => 'Impairment Loss', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '64000', 'journal_name' => 'Transport Service Cost', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '64140', 'journal_name' => 'Driver’s/Conductor’s Fees', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '64150', 'journal_name' => 'Vehicle Registration and Licensing  Expenses', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '64160', 'journal_name' => 'Toll Fees', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '64170', 'journal_name' => 'Incidental Expenses', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '64430', 'journal_name' => 'Insurance', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '64440', 'journal_name' => 'Repairs and Maintenance', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '64490', 'journal_name' => 'Gas, Oil & Lubricants', 'journal_type' => 'Cost of Services'));
        DB::table('lib_journals')->insert(array('journal_number' => '64530', 'journal_name' => 'Depreciation', 'journal_type' => 'Cost of Services'));
        // EXPENSES - 70000
        // DB::table('lib_journals')->insert(array('journal_number' => '70000', 'journal_name' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '71000', 'journal_name' => 'Financing Cost', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '71100', 'journal_name' => 'Interest Expense on Borrowings', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '71200', 'journal_name' => 'Interest Expense on Deposits', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '71300', 'journal_name' => 'Other Financing Charges', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72000', 'journal_name' => 'Selling/ Marketing Cost', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72180', 'journal_name' => 'Product/Service Marketing and Promotion Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72190', 'journal_name' => 'Product/ Service Development', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72200', 'journal_name' => 'Product Research', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72210', 'journal_name' => 'Salaries & Wages', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72220', 'journal_name' => 'Incentives and Allowances', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72230', 'journal_name' => 'Employees Benefits', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72240', 'journal_name' => 'SSS, Philhealth, ECC, Pag-Ibig Premium Contribution', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72250', 'journal_name' => 'Retirement Benefit Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72260', 'journal_name' => 'Commission Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72270', 'journal_name' => 'Advertising & Promotion', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72280', 'journal_name' => 'Professional Fees', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72290', 'journal_name' => 'Royalties', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72310', 'journal_name' => 'Store/ Canteen/ Kitchen and Catering Supplies Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72320', 'journal_name' => 'Breakage & Losses on Kitchen Utensils', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72330', 'journal_name' => 'Freight Out/Delivery Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72340', 'journal_name' => 'Spoilage, Breakage And Losses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72350', 'journal_name' => 'Storage/Warehousing Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72410', 'journal_name' => 'Power, Light and Water', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72420', 'journal_name' => 'Travel and Transportation', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72430', 'journal_name' => 'Insurance', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72440', 'journal_name' => 'Repairs and Maintenance', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72450', 'journal_name' => 'Rentals', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72460', 'journal_name' => 'Taxes, Fees and Charges', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72470', 'journal_name' => 'Communication', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72480', 'journal_name' => 'Representation', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72490', 'journal_name' => 'Gas, Oil & Lubricants', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72520', 'journal_name' => 'Miscellaneous Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72530', 'journal_name' => 'Depreciation', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72540', 'journal_name' => 'Amortization', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72550', 'journal_name' => 'Amortization of Leasehold Rights & Improvement', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '72660', 'journal_name' => 'Periodicals, Magazines & Subscription', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73000', 'journal_name' => 'Administrative Cost', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73210', 'journal_name' => 'Salaries & Wages', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73230', 'journal_name' => 'Employees Benefits', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73240', 'journal_name' => 'SSS,Philhealth, ECC, Pag-ibig Premium Contributions', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73250', 'journal_name' => 'Retirement Benefit Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73270', 'journal_name' => 'Officers’ Honorarium and Allowances', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73300', 'journal_name' => 'Litigation Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73360', 'journal_name' => 'School Program Support', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73370', 'journal_name' => 'Office Supplies', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73380', 'journal_name' => 'Meetings and Conferences', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73390', 'journal_name' => 'Trainings/ Seminars', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73400', 'journal_name' => 'Certifications and Recognitions', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73410', 'journal_name' => 'Power, Light & Water', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73420', 'journal_name' => 'Travel & Transportation', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73430', 'journal_name' => 'Insurance', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73440', 'journal_name' => 'Repairs & Maintenance', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73450', 'journal_name' => 'Rentals', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73460', 'journal_name' => 'Taxes,  Fees and Charges', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73470', 'journal_name' => 'Communication', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73480', 'journal_name' => 'Representation', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73490', 'journal_name' => 'Gas, Oil & Lubricants', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73500', 'journal_name' => 'Collection Expense', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73510', 'journal_name' => 'General Support Services', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73520', 'journal_name' => 'Miscellaneous Expense', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73530', 'journal_name' => 'Depreciation', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73540', 'journal_name' => 'Amortization', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73550', 'journal_name' => 'Amortization of Leasehold Rights and Improvement', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73560', 'journal_name' => 'Probable Losses on Loan /Accounts/Installment Receivables', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73590', 'journal_name' => 'Impairment Losses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73600', 'journal_name' => 'Bank Charges', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73610', 'journal_name' => 'General Assembly Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73620', 'journal_name' => 'Members Benefit Expenses', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73630', 'journal_name' => 'Affiliation Fee', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73640', 'journal_name' => 'Social & Community Service Expense', 'journal_type' => 'EXPENSES'));
        DB::table('lib_journals')->insert(array('journal_number' => '73650', 'journal_name' => 'Provision for  CGF (KBGF)', 'journal_type' => 'EXPENSES'));
        // Other Items – Subsidy/ Gain (Losses) - 80000
        // DB::table('lib_journals')->insert(array('journal_number' => '80000', 'journal_name' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '80100', 'journal_name' => 'Project Subsidy', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '80200', 'journal_name' => 'Donation and Grant Subsidy', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '80300', 'journal_name' => 'Optional Fund Subsidy', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '80400', 'journal_name' => 'Educational Fund Subsidy', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '80500', 'journal_name' => 'Subsidized Project Expenses', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '81100', 'journal_name' => 'Gains or Losses on Sale of Property & Equipment', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '81200', 'journal_name' => 'Gains or Losses in Financial Assets through Profit and Loss', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '81300', 'journal_name' => 'Gains or Losses in Financial Assets at cost', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '81400', 'journal_name' => 'Gains or Losses on RPA', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '81500', 'journal_name' => 'Gains or Losses on assets acquired in settlement of loans', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '81600', 'journal_name' => 'Gains or Losses on Sale of Repossessed Item', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '81700', 'journal_name' => 'Gains or Losses from Foreign Exchange Valuation', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
        DB::table('lib_journals')->insert(array('journal_number' => '82000', 'journal_name' => 'Prior Years’ Adjustment', 'journal_type' => 'Other Items – Subsidy/ Gain (Losses)'));
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
