<?php 

include_once("./../controllers/mainController.php");
include_once('./../classes/createInstanceFunction.php');


class ProductController extends MainController {

    public $createProduct = "createProduct";

    function __construct() {
        parent::__construct("Product", "Product");
    }

    public function getAll() {
        return $this->database->fetchAll($this->createProduct);
    }

    public function getById($id) {
        return $this->database->fetchById($id, $this->createProduct);
    }
    
    public function getProductsFromCategory($id){

        error_log(serialize($id));

        $query = "SELECT p.productId, p.Name, p.Description, p.UnitPrice, p.UnitsInStock, p.Image
        FROM product p 
        JOIN productincategory pc
            ON pc.ProductID = p.ProductID
        WHERE pc.categoryID = " . $id. ";";
        return $this->database->freeQuery($query, $this->createProduct); 
    }  

}


?>