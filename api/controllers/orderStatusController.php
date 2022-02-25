<?php

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");


class OrderStatusController extends MainController {

    public $createOrderStatus = "createOrderStatus"; 

    function __construct() {
        parent::__construct("OrderStatus", "OrderStatus"); 
    }

    function add($entity) {

    }

    function getAll() {
        return $this->database->fetchAll($this->createOrderStatus);
    }

    public function getById($id) {

        $orderStatus = $this->database->fetchById($id, $this->createOrderStatus); 

        return $orderStatus; 

    }


    public function update($newValue, $entity) {

    }
    
    public function delete($id) {

    }




    public function getOrderStatus($id) {
        $query = "SELECT c.Id, c.Status, c.Description
        FROM `orderstatus` c
        JOIN `order` o
        ON o.StatusID = c.Id
        WHERE o.id = ".$id.";";

        return $this->database->freeQuery($query, $this->createOrderStatus);

    }




}



?>