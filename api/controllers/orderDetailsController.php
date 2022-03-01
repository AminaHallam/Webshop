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
        // Fungerar ej med normalisering? 
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
       // Fungerar ej med normalisering? 
    }





    /* Special Queries */

    public function addProducts($products, $orderId) {

        for ($i=0; $i < count($products); $i++) { 
                
            $product = $products[$i];

            $createOrderDetails = createOrderDetails($orderId, $product->Id, $product->quantity);  
            
            $addedProducts = $this->database->insert($createOrderDetails);    
        }

        return $addedProducts;

    }


    public function getOrderDetailsFromOrder($orderId, $productId) {

        $query = "SELECT od.ProductID, od.OrderID, od.Quantity
        FROM `orderdetails` od
        JOIN `order` o
        ON od.OrderID = o.Id
        WHERE od.OrderID = ".$orderId." AND od.productId = ".$productId.";";

        $orderDetails = $this->database->freeQuery($query, $this->createOrderDetails); 

        return $orderDetails; 


    }

}


?>