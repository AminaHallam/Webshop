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
        
        $query = $this->db->prepare($sqlQuery);
        $response = $query->execute();
        $result = $query->fetchAll(PDO::FETCH_FUNC, $createInstanceFunction);
        
        if($result) {
            return $result;

        } else if($response) {
            return true;

        } else {
            return false;
        }

    }
 

    public function update($entity) {
       
        $columns = "";
      
        foreach ((array)$entity as $key => $value) {
            $columns .= "$key = $value, ";  
        }
        
        $columns = substr($columns, 0 , -2);

        $query = $this->db->prepare("UPDATE ". $this->selectedTable ." SET " .$columns. " WHERE Id= ".$entity->Id.";");
        $status = $query->execute();

        if(!$status) {
            return false; 
            
        } else {
            return true;
        }

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
        
/*         error_log(count($values));
        error_log(json_encode($values));
        error_log("detta är antalet kolumner " .$columns); */
        
        $query = $this->db->prepare("INSERT INTO ". $this->selectedTable ." (" .$columns. ") VALUES (" . $columnsAmount . ")");

        
        $status = $query->execute($values);
        $lastId = $this->db->lastInsertId();

        if(!$status) {
            
            return false; 
            
        } else if($lastId > 0) {
            
            return $lastId;

        } else {

            return "Insert into ".$this->selectedTable. " was a success if no created Id was expected!";
        }


    }

}


?>
