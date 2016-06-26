<?php

namespace API\Query;

use MySQLi;

class QuerySQL
{

    private $queries;
    private $conn;
    private $connMySQL;

    public function __construct($connMySQL, $queries)
    {
        $this->connMySQL = $connMySQL;
        $this->queries = $queries;
    }

    public function queryJson($what, $sel)
    {
        //trigger_error(json_encode($this->queries), E_USER_NOTICE);
        if (!array_key_exists($what, $this->queries)) {
            return null;
        }
        /*$this->conn = new PDO(
            "mysql:host=".$this->connMySQL->host_name.";dbname=".$this->connMySQL->database,
            $this->connMySQL->user_name,
            $this->connMySQL->password
        );
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);*/
        $this->conn = new mysqli(
            $this->connMySQL['hostname'],
            $this->connMySQL['username'],
            $this->connMySQL['password'],
            $this->connMySQL['database']
        );
        if ($this->conn->connect_error) {
            return null;
        } else {
    //        trigger_error("sortie requete", E_USER_NOTICE);
            $result=$this->conn->query($this->queries[$what].$sel);
            $ret = (($result)?$result->fetch_all(MYSQLI_ASSOC):null);
            $this->conn->close();
            return $ret;
        }
    }

/*    public function httpResponse ()
    {
        Header("Cache-Control: no-cache, must-revalidate");
        Header ("Content-type: application/json; charset=utf-8");
        echo $this->queryJson();
    }*/
}
