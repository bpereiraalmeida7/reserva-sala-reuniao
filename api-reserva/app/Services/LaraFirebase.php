<?php

namespace App\Services;

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use App\Colaborador;
use App\Sala;
use App\Agendamento;

class LaraFirebase
{

    protected $database;
    protected $table = 'records';
    public $primaryKey = 'id';
    protected $firebase;
    public $secretKeyJsonPath = '';

    /**
     * The class constructor. We get our firebase database ready here.
     *
     * @var string
     */
    public function __construct($secretKeyJsonPath = '') {
        $this->secretKeyJsonPath = $secretKeyJsonPath;
        if ($this->secretKeyJsonPath == '') {
            $this->secretKeyJsonPath = Engine::$secretKeyPath;
        }
        $serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . $this->secretKeyJsonPath);
        $this->firebase = (new Factory)->withServiceAccount($serviceAccount)->create();

        $this->database = $this->firebase->getDatabase();
    }

    /**
     * Set the path to your Google service account service key json file
     *
     * @param $keyJsonFilePath
     * @return $this
     */
    public function setSecretKeyJsonFilePath($keyJsonFilePath)
    {
        $this->secretKeyJsonPath = $keyJsonFilePath;

        return $this;
    }

    /**
     * Use library dependent factory
     *
     * @return \Kreait\Firebase
     */
    public function factory()
    {
        return $this->firebase;
    }

    /**
     * The function creates a table in the firebase datastore.
     *
     * @param string $table
     * @return $this
     */
    public function setTable(string $table)
    {
        $this->table = $table;

        return $this;
    }

    /**
     * Set the primary key to be used for crud actions
     *
     * @param string $primaryKey
     * @return $this
     */
    public function setPrimaryKey(string $primaryKey)
    {
        $this->primaryKey = $primaryKey;

        return $this;
    }

    /**
     * This function returns all records
     *
     * @return mixed
     */
    public function getRecords()
    {
        return $this->database->getReference($this->table)->getValue();
    }

    /**
     * This function returns a specific record by id
     *
     * @param int $recordID
     * @return null|array
     */
    public function getRecord($recordID)
    {
        foreach ($this->getRecords() as $key => $record) {
            if ($record[$this->primaryKey] == $recordID) {
                return $record;
            }
        }

        return null;
    }

    /**
     * This function adds new records|record
     * It will return this or inserted records if $returnData is set true.
     *
     * @param array $data
     * @param bool $returnData
     * @return $this|mixed
     * @throws \Exception
     */
    public function insertRecord(array $data, $returnData = false)
    {
        $countedRecords = 0;
            if(count($this->getRecords()) > 0){
                $countedRecords = count($this->getRecords());
            }
        
        $data[$this->primaryKey] = $countedRecords > 1 ? $countedRecords + 1 : 1;
        $this->database->getReference()
            ->getChild($this->table)
            ->getChild($countedRecords)
            ->set($data);

        if ($returnData) {
            return $this->getRecord($data[$this->primaryKey]);
        }

        return $this;
    }

    /**
     * This function updates a record
     * It will return updated records
     *
     * @param int $recordID
     * @param array $data
     * @return array
     */
    public function updateRecord(int $recordID, array $data)
    {
        foreach ($this->getRecords() as $key => $record) {
            if ($recordID == $record[$this->primaryKey]) {
                foreach ($data as $dataKey => $dataValue) {
                    if (isset($record[$dataKey])) {
                        $record[$dataKey] = $dataValue;
                    }
                }

                $this->database->getReference()
                    ->getChild($this->table)
                    ->getChild($key)
                    ->set($record);
            }
        }

        return $this->getRecord($recordID);
    }

    /**
     * This function deletes a record from your database.
     * It will return boolean after action was commited
     *
     * @param int $recordID
     * @return bool
     */
    public function deleteRecord(int $recordID) {
        foreach ($this->getRecords() as $key => $record) {
            if ($record['id'] == $recordID) {
                $this->database->getReference()
                    ->getChild($this->table)
                    ->getChild($key)
                    ->set(null);

                return true;
            }
        }

        return false;
    }

    /* Na função abaixo, ele utiliza os dados de hora inicial e final para fazer o filtro e retorna o merge dos dois arrays. O resultado do merge volta para o component do Angular, onde é tratado com o restante do filtro.
    O firebase não conta com queries tão elaboradas como o sql relacional, por isso desta forma fica mais fácil de tratar. A lógica abaixo é equivalente a query SQL com "WHERE 'condicao' OR 'condicao'" */
    public function getRecordFilter($array)
    {
        $horaInicio = $array['hora_inicio']; 
        $horaFim = $array['hora_fim'];
        
        $array1 = $this->database->getReference($this->table)->orderByChild('hora_inicio')->startAt($horaInicio)->endAt($horaFim)->getValue();
        $array2 = $this->database->getReference($this->table)->orderByChild('hora_fim')->startAt($horaInicio)->endAt($horaFim)->getValue();
        
        return array_merge($array1, $array2);
    }
}

