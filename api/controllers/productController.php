<?php 

include_once("./../controllers/mainController.php");


class ProductController extends MainController {

    private $viewProducts = "viewProduct";

    function __construct() {
        parent::__construct("Products", "Product");
    }

    public function getAll() {
        return $this->database->fetchAll($this->viewProducts);
    }

}


?>