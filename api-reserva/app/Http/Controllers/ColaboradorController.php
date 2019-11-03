<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Colaborador;
use DB;
use Storage;
use App\Json;


class ColaboradorController extends Controller
{
    public function index()
    {
        $colaboradores = Colaborador::get();
        return response()->json($colaboradores);

        /* $file = fopen('../database/colaboradores.json', 'r');
        $line = fgets($file); */

        return $line;
    }

    public function show($id)
    {
       /*  $colaborador = Colaborador::findOrFail($id);
        return response()->json($colaborador); */

        $file = fopen('../database/colaboradores.json', 'r');
        $line = fgets($file);
        $json = json_decode($line, true);
        foreach($json as $item){
            if ($item['_id'] == $id){
                $dados = $item;
                break;
            }
        }

        return $dados;
    }

    public function destroy($id)
    {
        /* $file = fopen('../database/colaboradores.json', 'r+');
        $line = fgets($file);
        $json = json_decode($line, true);
        foreach($json as $item){
            if ($item['_id'] == $id){
                $dados = $item;
                $line->unset($item);
                break;
            }
            //$dados->forget($dados);
        } */

        $contents = Storage::get('colaboradores.json');
        $json = json_decode($contents, true);
        foreach($json as $item){
            if ($item['id'] == 2){
                $dados = $item['id'];
                $contents->delete((int)$dados);
                break;
            }

        }



        //return $teste;


    }
}
