<?php

use App\Http\Controllers\DinosaurController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DinosaurController::class, 'index']);
Route::get('/dinosaurs/{dinosaur}', [DinosaurController::class, 'show']);
