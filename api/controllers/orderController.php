<?php 

try {

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");
include_once("./../controllers/productController.php");
include_once("./../controllers/userController.php");
include_once("./../controllers/orderDetailsController.php");



class OrderController extends MainController {

    private $createFunction = "createOrder";   

    function __construct() {
        parent::__construct("`Order`", "Order"); 
    }



    public function getAll() {  
        return $this->database->fetchAll($this->createFunction);  
    }





    public function getById($id) {
        
        /* Hämtar bara ordern */
        $order = $this->database->fetchById($id, $this->createFunction); 

        /* Hämtar usern som är kopplad till ordern */
        $userController = new UserController();
        $user = $userController->getUserFromOrder($id);
        $order->user = $user;

        /* Hämtar produkterna som är kopplade till det specifika orderidt - Lyckas inte med quantity */
        $productController = new ProductController();
        $products = $productController->getProductsFromOrder($id);
        $order->products = $products;

        return $order;

    }


    public function add($OrderInfo) {
        
        $products = json_decode($_SESSION["myCart"]);

        if(!$products) {
            throw new Exception("Cart is empty", 500);
            exit;
        }

        $createOrder = createOrder(null, $OrderInfo->StatusId, $OrderInfo->UserId, $OrderInfo->CourrierId, date('Y-m-d H:i:s'), null, null);   
        
        $lastInsertedId = $this->database->insert($createOrder);

        if(!$lastInsertedId) {
            throw new Exception("Order was not created", 500);
            exit;
        } 

        // Lägger till produkter på order
        $controller = new OrderDetailsController();
        $addProducts = json_encode($controller->addProducts($products, json_decode($lastInsertedId)));

        if(!$addProducts) {
            throw new Exception("Products was not placed on order", 500);
            exit;
        } 

        // Uppdaterar unitsInStock på produkt
        $controller2 = new ProductController();
        $updateUnitsInstock = json_encode($controller2->update($products, "-"));

        if(!$updateUnitsInstock) {
            throw new Exception("Updating qty in database failed", 500);
            exit;
        }

        unset($_SESSION["myCart"]);

        return true;

    }
















    public function update(){


    }


   
    public function delete() {


    }




/* Special Queries */


    /* Hämtar orders som är kopplade till ett specifikt userid eller statusid */
    public function getOrdersFromOtherId($Id, $type) { 
        $query = "SELECT * FROM `order`
        WHERE ".$type."Id = ".$Id.";";

        return $this->database->freeQuery($query, $this->createFunction); 
    }  


}

} catch(Exception $e) {
    echo json_encode(array("Message" => $e->getMessage(), "Status" => $e->getCode()));
}


?>