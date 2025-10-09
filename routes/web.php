<?php

use App\Http\Controllers\DinosaurController;

Route::get('/', [DinosaurController::class, 'index']);
Route::get('/dinosaurs/{dinosaur}', [DinosaurController::class, 'show']);
Route::inertia('/about', 'About');
