<?php 

class Database {
    
    public $db;
    public $selectedTable;
    public $selectedClass;

    function __construct($table, $class) {
        $dns = "mysql:host=localhost;dbname=webshop";  // TODO CHANGE DBNAME? 
        $user = "root";
        $password = "root";

        $this->db = new PDO($dns, $user, $password);
        $this->db->exec("set names utf8");

        $this->selectedTable = $table;
        $this->selectedClass = $class;
    }
}


?>