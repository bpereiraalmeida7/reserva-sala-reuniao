<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Colaborador;
use DB;

class ColaboradorController extends Controller
{
    public function index()
    {
        /* $colaboradores = Colaborador::get();
        return response()->json($colaboradores); */

        $file = fopen('../storage/app/colaboradores.json', 'r');
        $line = fgets($file);
        
        return $line;
    }

    public function show($id)
    {
        $colaborador = Colaborador::findOrFail($id);
        return response()->json($colaborador);
    }
}
