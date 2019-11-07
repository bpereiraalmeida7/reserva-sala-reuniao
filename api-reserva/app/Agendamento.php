<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    public $colaborador_id;
    public $sala_id;
    public $data_reserva;
    public $hora_inicio;
    public $hora_fim;
    public $computador;
    public $projetor;
    public $video;

    public static function getColaboradorId(){
        return $colaborador_id = 'colaborador_id';
    }

    public static function getSalaId(){
        return $sala_id = 'sala_id';
    }

    public static function getDataReserva(){
        return $data_reserva = 'data_reserva';
    }

    public static function getHoraInicio(){
        return $hora_inicio = 'hora_inicio';
    }

    public static function getHoraFim(){
        return $hora_fim = 'hora_fim';
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
