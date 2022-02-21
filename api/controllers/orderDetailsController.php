<?php 

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");
include_once("./../controllers/productController.php");
include_once("./../controllers/userController.php");
include_once("./../classes/database.php");


class OrderDetailsController extends MainController {

    private $createOrderDetails = "createOrderDetails";   

    function __construct() {
        parent::__construct("orderdetails", "orderdetails"); 
    }



    public function getAll() {  
        return $this->database->fetchAll($this->createFunction);  
    }





    public function getById($id) {

    }


    public function add($entity) {

    }


    // Lägger till produkter på ordern
    public function addProducts($products, $orderId) {
    
        for ($i=0; $i < count($products); $i++) { 
                
                $product = $products[$i];

                $createOrderDetails = createOrderDetails($orderId, $product->product->Id, $product->quantity);  
                
                $addedProducts = $this->database->insert($createOrderDetails);    
        }

        return $addedProducts;

    }

}


?>