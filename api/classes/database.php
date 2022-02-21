<?php

class Database {
    
    public $db;
    public $selectedTable;
    public $selectedClass;

    function __construct($table, $class) { 
        $dns = "mysql:host=localhost;dbname=webshop"; 
        $user = "root";  
        $password = "root"; 

        $this->db = new PDO($dns, $user, $password); 
        $this->db->exec("set names utf8"); 

        $this->selectedTable = $table; 
        $this->selectedClass = $class; 
    }




    
    public function fetchAll($createInstanceFunction) { 
        
        $query = $this->db->prepare("SELECT * FROM " . $this->selectedTable . ";"); 
        $query->execute(); 
        $result = $query->fetchAll(PDO::FETCH_FUNC, $createInstanceFunction); 
        
        /* error_log(serialize($result)); */
        return $result;  
    }


    public function fetchById($id, $createInstanceFunction) {

        $query = $this->db->prepare("SELECT * FROM " . $this->selectedTable . " WHERE Id= " . $id . ";");
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_FUNC, $createInstanceFunction);

        if(empty($result)){
            throw new Exception($this->selectedClass . " with ID " . $id . " not found...", 500);
            exit;
        }
        return $result[0];
    }


    public function freeQuery($sqlQuery, $createInstanceFunction) {
        
      //   error_log(serialize($sqlQuery));
        

        $query = $this->db->prepare($sqlQuery);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_FUNC, $createInstanceFunction);
        
        error_log(serialize($result));
        
        return $result;
    }

    public function insert($entity) {
        $columns = "";
        $columnsAmount = ""; 
        $values = [];

        foreach ((array)$entity as $key => $value) {
            if ($key != "Id") {
                $columns .= $key . ",";
                $columnsAmount .= "?,"; 
                array_push($values, $value);
            }
        }
        
        $columns = substr($columns, 0 , -1);
        $columnsAmount = substr($columnsAmount, 0 , -1);
        
        /* error_log(count($values));
        error_log(json_encode($values));
        error_log("detta är " .$columns); */
        
        $query = $this->db->prepare("INSERT INTO ". $this->selectedTable ." (" .$columns. ") VALUES (" . $columnsAmount . ")");
        
        $status = $query->execute($values);

        if(!$status) {
            
            return false; 
            
        } else {
            
            return $lastId = $this->db->lastInsertId();

        }


    }

}


?>