<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Colaborador extends Model
{
    protected $table = 'colaboradores';

    public $nome;

    public static function getNome(){
        return $nome;
    }
}
