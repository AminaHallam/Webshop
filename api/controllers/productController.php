<?php 

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");


class ProductController extends MainController {

    private $createFunction = "createProduct";

    function __construct() {
        parent::__construct("Product", "Product");
    }


    public function getAll() { 
        return $this->database->fetchAll($this->createFunction);  
    }

    public function getById($id) {
        return $this->database->fetchById($id, $this->createFunction);
    }










    /* Special Queries */





    /* Hämtar alla produkter som tillhör en specifik kategori */
    public function getProductsFromCategory($categoryID) { 
        $query = "SELECT p.Id, p.Name, p.Description, p.UnitPrice, p.UnitsInStock, p.Image
        FROM product p 
        JOIN productincategory pc
            ON pc.ProductId = p.Id
        WHERE pc.CategoryId = " . $categoryID. ";";
        return $this->database->freeQuery($query, $this->createFunction); 
    }  






/* 

    public function add($product) {
        try {

            $producToAdd = createProduct(null, $product->name, $product->price, $product->description);
            return $this->database->insert($producToAdd);

        } catch(Exception $e) {
            throw new Exception("The product is not in correct format...", 500);
        }
    }


    public function delete($id) {
        return $this->database->delete($id);
    } */





}


?>