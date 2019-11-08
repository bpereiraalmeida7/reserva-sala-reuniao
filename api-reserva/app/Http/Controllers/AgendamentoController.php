<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Agendamento;
use App\Services\LaraFirebase;
use Coderatio\PhpFirebase\PhpFirebase;
use Illuminate\Http\Response;


class AgendamentoController extends Controller
{
    protected $pfb;

    public function __construct()
    {
        $this->pfb = new LaraFirebase('\secret\reserva-541fd-c721e9b11e48.json');
        $this->pfb->setTable('agendamento');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->checkInternetConnection();
        return response()->json([
            'connected' => true,
            'agendamento' => $this->pfb->getRecords()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $this->checkInternetConnection();
            $insertRecord = $this->pfb->insertRecord([
                'colaborador_id' => $request->colaborador_id,
                'sala_id' => $request->sala_id,
                'data_reserva' => $request->data_reserva,
                'hora_inicio' => $request->hora_inicio,
                'hora_fim' => $request->hora_fim,
                'date' => now()->toDateTimeString()
            ], true);

            return response()->json([
                'connected' => true,
                'agendamento' => $insertRecord
            ]);
        }catch (Exception $e){
            return $e->getMessage();
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @return Response
     */
    public function show($id)
    {
        $this->checkInternetConnection();
        return response()->json($this->pfb->getRecord($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $this->checkInternetConnection();
        return response()->json([
            'connected' => true,
            'agendamento' => $this->pfb->getRecord($request->salaId)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Sala  $sala
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $this->checkInternetConnection();
        $agendamento = $this->pfb->updateRecord($id, [
            'colaborador_id' => $request->colaborador_id,
            'sala_id' => $request->sala_id,
            'data_reserva' => $request->data_reserva,
            'hora_inicio' => $request->hora_inicio,
            'hora_fim' => $request->hora_fim,
            'date' => now()->toDateTimeString()
        ]);

        return response()->json($agendamento);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @return void
     */
    public function destroy($id)
    {
        $this->checkInternetConnection();
        $this->pfb->deleteRecord($id);
         return response()->json([
             'connected' => true,
             'agendamento' => $this->pfb->getRecords()
         ]);
    }

    public function filterHora(Request $request)
    {
        try{
            if ($request->hora_inicio && $request->hora_fim){
                $this->checkInternetConnection();
                $agendamento = $this->pfb->getRecordFilter([
                    'hora_inicio' => $request->hora_inicio,
                    'hora_fim' => $request->hora_fim
                ]);

                return response()->json($agendamento);
            }else{
                return 'false';     
            }
        }catch (Exception $e){
            return $e->getMessage();
        }
    }

    public function checkInternetConnection()
    {
        $connected = @fsockopen("www.google.com", 80);
        if ($connected) {
            fclose($connected);
            return true; //action when connected
        }
        exit(json_encode([
            'connected' => false,
            'data' => []
        ]));
    }
}
