<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::prefix('auth')->name('auth.')->group(function () {
    Route::inertia('/login', 'auth/login/page')->name('login');
    Route::inertia('/register', 'auth/register/page')->name('register');
    Route::inertia('/forgot-password', 'auth/forgot-password/page')->name('forgot-password');
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::inertia('/', 'admin/dashboard/page')->name('dashboard');
    Route::inertia('/cv-matcher', 'admin/cv-matcher/page')->name('cv-matcher');
    Route::inertia('/interview', 'admin/interview/page')->name('interview');
    Route::inertia('/history', 'admin/history/page')->name('history');
    Route::inertia('/settings', 'admin/settings/page')->name('settings');
});
