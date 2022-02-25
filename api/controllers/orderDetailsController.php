<?php 

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");
include_once("./../controllers/productController.php");
include_once("./../controllers/userController.php");
include_once("./../classes/database.php");


class OrderDetailsController extends MainController {

    private $createOrderDetails = "createOrderDetails";   

    function __construct() {
        parent::__construct("orderdetails", "Orderdetails"); 
    }



    public function add($entity) {

    }


    public function getAll() {  
        return $this->database->fetchAll($this->createFunction);  
    }


    public function getById($id) {

        
        return $this->database->fetchById($id, $this->createFunction);

    }


    public function update($newValue, $entity) {

    }
    public function delete($id) {

    }





    /* Special Queries */

    public function addProducts($products, $orderId) {

        for ($i=0; $i < count($products); $i++) { 
                
            $product = $products[$i];

            $createOrderDetails = createOrderDetails($orderId, $product->product->Id, $product->quantity);  
            
            $addedProducts = $this->database->insert($createOrderDetails);    
        }

        return $addedProducts;

    }


    public function getOrderDetailsFromOrder($id) {

        $query = "SELECT o.ProductID, o.OrderID, o.Quantity
        FROM `orderdetails` o
        JOIN `order` od
        ON o.OrderID = od.Id
        WHERE o.OrderID = ".$id.";";

        $orderDetails = $this->database->freeQuery($query, $this->createOrderDetails); 

        return $orderDetails; 


    }

}


?>