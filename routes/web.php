<?php

use App\Http\Controllers\CvMatcherController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/cv-matcher', [CvMatcherController::class, 'index'])->name('cv-matcher.index');
Route::post('/cv-matcher/analyze', [CvMatcherController::class, 'analyze'])->name('cv-matcher.analyze');
