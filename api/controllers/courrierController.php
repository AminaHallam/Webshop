<?php 

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");
/* include_once("./../controllers/productController.php"); */


class CourrierController extends MainController {

    public $createCourrier = "createCourrier";

    function __construct() {
        parent::__construct("Courrier", "Courrier");
    }




    function add($entity) {

    }

    function getAll() {
        return $this->database->fetchAll($this->createCourrier);
    }

    public function getById($id) {

    }


    public function update($newValue, $entity) {

    }
    
    public function delete($id) {

    }





}

    ?>