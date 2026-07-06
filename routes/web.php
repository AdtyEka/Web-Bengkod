<?php

use App\Http\Controllers\CvMatcherController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HistoryController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');


// Auth routes — only for guests (unauthenticated users)
Route::prefix('auth')->name('auth.')->middleware('guest')->group(function () {
    Route::get('/login', fn () => inertia('auth/login/page'))->name('login');
    Route::get('/register', fn () => inertia('auth/register/page'))->name('register');
    Route::get('/forgot-password', fn () => inertia('auth/forgot-password/page'))->name('forgot-password');

    Route::post('/login', LoginController::class)->name('login.store')->middleware('throttle:login');
    Route::post('/register', RegisterController::class)->name('register.store');
});

Route::post('/auth/logout', LogoutController::class)->name('auth.logout')->middleware('auth');

Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::get('/cv-matcher', [CvMatcherController::class, 'index'])->name('cv-matcher');
    Route::post('/cv-matcher/analyze', [CvMatcherController::class, 'analyze'])->name('cv-matcher.analyze');
    Route::inertia('/interview', 'admin/interview/page')->name('interview');
    Route::get('/history', HistoryController::class)->name('history');
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::patch('/settings/profile', [SettingsController::class, 'updateProfile'])->name('settings.profile');
    Route::patch('/settings/password', [SettingsController::class, 'updatePassword'])->name('settings.password');
});
