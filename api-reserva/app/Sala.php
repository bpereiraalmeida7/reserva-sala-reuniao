<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    public $nome;
    public $quantidade;
    public $computador;
    public $projetor;
    public $video;

    public static function getNome(){
        return $nome = 'nome';
    }

    public static function getQuantidade(){
        return $quantidade = 'quantidade';
    }

    public static function getComputador(){
        return $computador = 'computador';
    }

    public static function getProjetor(){
        return $projetor = 'projetor';
    }

    public static function getVideo(){
        return $video = 'video';
    }
}
