<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::inertia('/', 'admin/dashboard/page')->name('dashboard');
});
