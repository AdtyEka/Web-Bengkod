<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HistoryController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

// Auth pages — accessible by anyone
Route::prefix('auth')->name('auth.')->group(function () {
    Route::inertia('/login', 'Auth/login/page')->name('login');
    Route::inertia('/register', 'Auth/register/page')->name('register');
    Route::inertia('/forgot-password', 'Auth/forgot-password/page')->name('forgot-password');
});

// Auth actions — only for guests (unauthenticated users)
Route::prefix('auth')->name('auth.')->middleware('guest')->group(function () {
    Route::post('/login', LoginController::class)->name('login.store');
    Route::post('/register', RegisterController::class)->name('register.store');
});

Route::post('/auth/logout', LogoutController::class)->name('auth.logout')->middleware('auth');

Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::inertia('/cv-matcher', 'admin/cv-matcher/page')->name('cv-matcher');
    Route::inertia('/interview', 'admin/interview/page')->name('interview');
    Route::get('/history', HistoryController::class)->name('history');
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::patch('/settings/profile', [SettingsController::class, 'updateProfile'])->name('settings.profile');
    Route::patch('/settings/password', [SettingsController::class, 'updatePassword'])->name('settings.password');
});
