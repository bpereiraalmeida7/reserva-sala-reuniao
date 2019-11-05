<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Sala;
use App\Services\LaraFirebase;
use Coderatio\PhpFirebase\PhpFirebase;
use Illuminate\Http\Response;


class SalaController extends Controller
{
    protected $pfb;

    public function __construct()
    {
        $this->pfb = new LaraFirebase('\secret\reserva-541fd-c721e9b11e48.json');
        $this->pfb->setTable('salas');
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
            'salas' => $this->pfb->getRecords()
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
                'nome' => $request->nome,
                'quantidade' => $request->quantidade,
                'computador' => $request->computador,
                'projetor' => $request->projetor,
                'video' => $request->video,
                'date' => now()->toDateTimeString()
            ], true);

            return response()->json([
                'connected' => true,
                'salas' => $insertRecord
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
            'salas' => $this->pfb->getRecord($request->salaId)
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
        $sala = $this->pfb->updateRecord($id, [
            'nome' => $request->nome,
            'quantidade' => $request->quantidade,
            'computador' => $request->computador,
            'projetor' => $request->projetor,
            'video' => $request->video,
            'date' => now()->toDateTimeString()
        ]);

        return response()->json($sala);
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
             'salas' => $this->pfb->getRecords()
         ]);
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
