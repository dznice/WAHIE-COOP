<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/users/updateOtp/{id}', [App\Http\Controllers\Api\AuthController::class, 'submitOtp']);
Route::post('/users/resendOtp/{id}', [App\Http\Controllers\Api\AuthController::class, 'resendOtp']);

Route::post('/users/superChange/{id}', [App\Http\Controllers\userController::class, 'superChange']);

Route::get('/users', [App\Http\Controllers\userController::class, 'users']);
Route::put('/users/{id}', [App\Http\Controllers\userController::class, 'activateUser']);

Route::get('/memberList', [App\Http\Controllers\userController::class, 'memberList']);
Route::get('/memberList/{id}', [App\Http\Controllers\userController::class, 'memberInfo']);

Route::get('/beneficiaries', [App\Http\Controllers\userController::class, 'beneficiaries']);





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
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