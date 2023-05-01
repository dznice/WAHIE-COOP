<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Members;
use App\Http\Controllers\MemberController;
use App\Http\Resources\MemberResource;
use App\Models\Beneficiary;
use App\Http\Controllers\BeneficiaryController;
use App\Http\Resources\BeneficiaryResource;
use App\Models\Entries;
use App\Http\Controllers\JournalEntryController;
use App\Http\Resources\JournalEntryResource;
use App\Models\Journal;
use App\Models\LibJournal;
use App\Http\Controllers\LibJournalController;
use App\Http\Resources\LibJournalResource;
use App\Http\Resources\DebitsResource;
use App\Models\Debits;
use App\Http\Resources\CreditsResource;
use App\Models\Credits;
use App\Http\Resources\PayablesResource;
use App\Models\Payables;
use App\Http\Resources\TransactionsResource;
use App\Models\Transactions;
use App\Http\Resources\LibEntriesResource;
use App\Models\LibEntries;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('login', [App\Http\Controllers\Api\AuthController::class, 'login']);

Route::post('register', [App\Http\Controllers\Api\AuthController::class, 'register']);

Route::get('/users', [App\Http\Controllers\userController::class, 'users']);
Route::post('/users/updateOtp/{id}', [App\Http\Controllers\userController::class, 'submitOtp']);
Route::put('/users/{id}', [App\Http\Controllers\userController::class, 'activateUser']);
Route::post('/users/resendOtp/{id}', [App\Http\Controllers\userController::class, 'resendOtp']);

//LibJournal Accounts
Route::get('/journals', function() {
    return LibJournalResource::collection(LibJournal::all());
});

Route::get('/journal/{id}', function($id) {
    return new LibJournalResource(LibJournal::findOrFail($id));
});

Route::post('/journals', [LibJournalController::class, 'store']);

Route::put('/journal/{id}', [LibJournalController::class, 'update']);

Route::delete('/journal/{id}', [LibJournalController::class, 'destroy']);

//Journal Entry
Route::get('/accounts', function(){
    return JournalEntryResource::collection(Entries::all());
});
Route::get('/account/{id}', function($id){
    return new JournalEntryResource(Entries::findOrFail($id));
});
// Route::post('/account', [JournalEntryController::class, 'store']);
Route::post('/accounts', [JournalEntryController::class, 'store']);
Route::put('/account/{id}', [JournalEntryController::class, 'update']);
Route::delete('/account/{id}', [JournalEntryController::class, 'destroy']);


//Members
Route::get('/members', function(){
    return MemberResource::collection(Members::all());
});
Route::get('/members', function(){
    return MemberResource::collection(Members::all());
});
Route::get('/memberId', [MemberResource::class, 'showid']);

Route::post('/members', [MemberController::class, 'store']);
Route::put('/member/{id}', [MemberController::class, 'update']);
Route::delete('/member/{id}', [MemberController::class, 'destroy']);

//Beneficiary
Route::get('/beneficiaries', function(){
    return BeneficiaryResource::collection(Members::all());
});
Route::get('/beneficiary/{id}', function($id){
    return new BeneficiaryResource(Members::findOrFail($id));
});
Route::post('/beneficiaries', [BeneficiaryController::class, 'store']);
Route::put('/beneficiary/{id}', [BeneficiaryController::class, 'update']);
Route::delete('/beneficiary/{id}', [BeneficiaryController::class, 'destroy']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//LibEntries
Route::get('/entries', function() {
    return LibEntriesResource::collection(LibEntries::all());
});

Route::get('/entry/{id}', function($id) {
    return new LibEntriesResource(LibEntries::findOrFail($id));
});

//Credits
Route::get('/credits', function() {
    return CreditsResource::collection(Credits::all());
});

Route::get('/credit/{id}', function($id) {
    return new CreditsResource(Credits::findOrFail($id));
});

//Debits
Route::get('/debits', function() {
    return DebitsResource::collection(Debits::all());
});

Route::get('/debit/{id}', function($id) {
    return new DebitsResource(Debits::findOrFail($id));
});

//Payables
Route::get('/payables', function() {
    return PayablesResource::collection(Payables::all());
});

Route::get('/payable/{id}', function($id) {
    return new PayablesResource(Payables::findOrFail($id));
});

//Transactions
Route::get('/transactions', function() {
    return TransactionsResource::collection(Transactions::all());
});

Route::get('/transaction/{id}', function($id) {
    return new TransactionsResource(Transactions::findOrFail($id));
});





// Route::group([ 'middleware' => 'api'], function ($router) {


//     Route::post('logout', [App\Http\Controllers\Api\AuthController::class, 'logout ']);
//     Route::post('refresh', [App\Http\Controllers\AuthController::class, 'login']);
//     // Route::post('me', [App\Http\Controllers\AuthController::class, 'login']);

// });
// //superadmin
// Route::middleware(['auth','notAdmin'])->group(function () {
//     Route::get('/superadmin/first-change-password', [App\Http\Controllers\HomeController::class, 'fChangPass'])->name('fChangPass');
//     Route::post('/superadmin/first-change-password', [App\Http\Controllers\superadminController::class, 'fChange']);
//     Route::middleware(['fChange'])->group(function () {

//     Route::get('/superadmin/home', [App\Http\Controllers\HomeController::class, 'superHome'])->name('super.home');
//     Route::get('/superadmin/admin-table', [App\Http\Controllers\HomeController::class, 'adminTable']);

// Route::post('/superadmin/admin-table', [App\Http\Controllers\superadminController::class, 'update']);
// Route::get('/changeStatus', [App\Http\Controllers\superadminController::class, 'update']);

// });
// });


// //---------------------------------------------------------------------------------------------------------------------------

// //admin
// Route::middleware(['auth','notSuperadmin'])->group(function () {
//     Route::get('/approval', [App\Http\Controllers\HomeController::class, 'approval'])->name('approval'); //check if verified

// Route::middleware(['approved'])->group(function () {
//         Route::get('/confirm-otp', [App\Http\Controllers\HomeController::class, 'confirmOtp'])->name('confirm-otp');  //check if code is zero
//         Route::post('/confirm-otp', [App\Http\Controllers\HomeController::class, 'confirmOtpForm']);
// Route::middleware(['codeZero'])->group(function () {
//             Route::get('/adminDisabled', [App\Http\Controllers\HomeController::class, 'adminDisabled'])->name('adminDisabled'); //check if disabled

// Route::middleware(['adminDisabled'])->group(function () {
//                 Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
//             });
//         });
//         });
//     });
