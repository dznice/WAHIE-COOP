<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Journal;
use App\Http\Controllers\JournalController;
use App\Http\Resources\JournalResource;
use App\Models\Members;
use App\Http\Controllers\MemberController;
use App\Http\Resources\MemberResource;
use App\Models\Beneficiary;
use App\Http\Controllers\BeneficiaryController;
use App\Http\Resources\BeneficiaryResource;
use App\Models\LibEntries;
use App\Http\Controllers\JournalEntryController;
use App\Http\Resources\JournalEntryResource;

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
//Journal Entry
Route::get('/accounts', function(){
    return JournalEntryResource::collection(LibEntries::all());
});
Route::get('/account/{id}', function($id){
    return new JournalEntryResource(LibEntries::findOrFail($id));
});
Route::post('/accounts', [JournalEntryController::class, 'store']);
Route::put('/account/{id}', [JournalEntryController::class, 'update']);
Route::delete('/account/{id}', [JournalEntryController::class, 'destroy']);

//Members
Route::get('/members', function(){
    return MemberResource::collection(Members::all());
});
Route::get('/member/{id}', function($id){
    return new MemberResource(Members::findOrFail($id));
});
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

// Journal Lib Entry
Route::get('/journals', function() {
    return JournalResource::collection(Journal::all());
});

Route::get('/journal/{id}', function($id) {
    return new JournalResource(Journal::findOrFail($id));
});

Route::post('/journals', [JournalController::class, 'store']);

Route::put('/journal/{id}', [JournalController::class, 'update']);

Route::delete('/journal/{id}', [JournalController::class, 'destroy']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Auth::routes();



//superadmin
Route::middleware(['auth','notAdmin'])->group(function () {
    Route::get('/superadmin/first-change-password', [App\Http\Controllers\HomeController::class, 'fChangPass'])->name('fChangPass');
    Route::post('/superadmin/first-change-password', [App\Http\Controllers\superadminController::class, 'fChange']);
    Route::middleware(['fChange'])->group(function () {

    Route::get('/superadmin/home', [App\Http\Controllers\HomeController::class, 'superHome'])->name('super.home');
    Route::get('/superadmin/admin-table', [App\Http\Controllers\HomeController::class, 'adminTable']);

Route::post('/superadmin/admin-table', [App\Http\Controllers\superadminController::class, 'update']);
Route::get('/changeStatus', [App\Http\Controllers\superadminController::class, 'update']);

});
});


//---------------------------------------------------------------------------------------------------------------------------

//admin
Route::middleware(['auth','notSuperadmin'])->group(function () {
    Route::get('/approval', [App\Http\Controllers\HomeController::class, 'approval'])->name('approval'); //check if verified

Route::middleware(['approved'])->group(function () {
        Route::get('/confirm-otp', [App\Http\Controllers\HomeController::class, 'confirmOtp'])->name('confirm-otp');  //check if code is zero
        Route::post('/confirm-otp', [App\Http\Controllers\HomeController::class, 'confirmOtpForm']);
Route::middleware(['codeZero'])->group(function () {
            Route::get('/adminDisabled', [App\Http\Controllers\HomeController::class, 'adminDisabled'])->name('adminDisabled'); //check if disabled

Route::middleware(['adminDisabled'])->group(function () {
                Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');





#Sms Notification

Route::get('/send-sms-notification', [App\Http\Controllers\NotificationController::class, 'sendSmsNotification']);

#insert data
Route::get('/member_create',[App\Http\Controllers\MemberInsertController::class, 'insertform'])->name('member form');
Route::post('/member_create',[App\Http\Controllers\MemberInsertController::class, 'insert'])->name('member form create');

 //send sms
//  Route::get('/member_create', [App\Http\Controllers\NotificationController::class, 'member_create']);
//  Route::post('/member_create', [App\Http\Controllers\NotificationController::class, 'sendSmsNotification']);

 //Journal entry
Route::get('/accounting/journalentry', [App\Http\Controllers\HomeController::class, 'display']);
Route::post('/save', [App\Http\Controllers\HomeController::class, 'save']);


});
});
});
});
