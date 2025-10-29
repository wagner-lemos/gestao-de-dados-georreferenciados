<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\LayerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);

    Route::get('/geojson', [LayerController::class, 'geojson']);

    Route::get('/layers', [LayerController::class, 'index']);
    Route::get('/layers/{id}', [LayerController::class, 'show']);
    Route::post('/layers', [LayerController::class, 'store']);
    Route::put('/layers/{id}', [LayerController::class, 'update']);
    Route::delete('/layers/{id}', [LayerController::class, 'destroy']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
