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

Route::get('/salas', 'SalaController@index');
Route::get('/sala/{id}', 'SalaController@show');
Route::post('/sala-post', 'SalaController@store');
Route::put('/sala-up/{id}', 'SalaController@update');
Route::delete('/sala-del/{id}', 'SalaController@destroy');

Route::get('/agendamentos', 'AgendamentoController@index');
Route::get('/agendamento/{id}', 'AgendamentoController@show');
Route::post('/agendamento-post', 'AgendamentoController@store');
Route::put('/agendamento-up/{id}', 'AgendamentoController@update');
Route::delete('/agendamento-del/{id}', 'AgendamentoController@destroy');
Route::post('/agendamento-filter', 'AgendamentoController@filterHora');