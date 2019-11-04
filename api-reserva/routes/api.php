<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/colaboradores', 'ColaboradorController@index');
Route::get('/colaborador/{id}', 'ColaboradorController@show');
Route::post('/colaborador-post', 'ColaboradorController@store');
Route::put('/colaborador-up/{id}', 'ColaboradorController@update');
Route::delete('/colaborador-del/{id}', 'ColaboradorController@destroy');