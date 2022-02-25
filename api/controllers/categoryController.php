<?php 

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");
include_once("./../controllers/productController.php");


class CategoryController extends MainController {

    public $createCategory = "createCategory";

    function __construct() {
        parent::__construct("Category", "Category");
    }


    public function add($entity) {

    }

    function getAll() {
        return $this->database->fetchAll($this->createCategory);
    }

    public function getById($id) {
        $category = $this->database->fetchById($id, $this->createCategory);    
        $productController = new ProductController();
        $products = $productController->getProductsFromCategory($id); 

        $category->products = $products;  

        return $category;
    }


    public function update($newValue, $entity) {

    }

    public function delete($id) {

    }






}

    ?>