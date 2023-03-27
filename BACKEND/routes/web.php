<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



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