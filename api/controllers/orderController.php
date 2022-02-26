<?php 

try {

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");
include_once("./../controllers/productController.php");
include_once("./../controllers/userController.php");
include_once("./../controllers/orderDetailsController.php");
include_once("./../controllers/courrierController.php"); 
include_once("./../controllers/orderStatusController.php"); 



class OrderController extends MainController {

    private $createFunction = "createOrder";   

    function __construct() {
        parent::__construct("`Order`", "Order"); 
    }


    public function add($OrderInfo) {
        
        $products = json_decode($_SESSION["myCart"]);

        if(!$products) {
            throw new Exception("Cart is empty", 500);
            exit;
        }
        
        $createOrder = createOrder(null, $OrderInfo->StatusId, $OrderInfo->UserId, $OrderInfo->CourrierId, date('Y-m-d H:i:s'), null, null);   
        
        // Tar bort adderade attribut som ligger i klassen order som inte tillhör instansen.
        unset($createOrder->products);
        unset($createOrder->user);
        unset($createOrder->courrier);
        unset($createOrder->orderStatus);

        $lastInsertedId = $this->database->insert($createOrder);

       
        if(!$lastInsertedId) {
            throw new Exception("Order was not created", 500);
            exit;
        } 

        // Lägger till produkter på order
        $orderDetailsController = new OrderDetailsController();
        $addProducts = json_encode($orderDetailsController->addProducts($products, json_decode($lastInsertedId)));

        if(!$addProducts) {
            throw new Exception("Products was not placed on order", 500);
            exit;
        } 

        // Uppdaterar unitsInStock på produkt
        $productController = new ProductController();
        $updateUnitsInstock = json_encode($productController->updateQtyProductOrder($products));

        if(!$updateUnitsInstock) {
            throw new Exception("Updating qty in database failed", 500);
            exit;
        }

        unset($_SESSION["myCart"]);

        return true;

    }



    public function getAll() {  
        return $this->database->fetchAll($this->createFunction);  
    }


    public function getById($id) {
        
        $order = $this->database->fetchById($id, $this->createFunction); 

        $userController = new UserController();
        $user = $userController->getUserFromOrder($id);
        $order->user = $user;

        $courrierController = new courrierController(); 
        $courrier = $courrierController->getCourrierFromOrder($id); 
        $order->courrier = $courrier;

        $orderStatusController = new orderStatusController(); 
        $orderStatus = $orderStatusController->getOrderStatus($id); 
        $order->orderStatus = $orderStatus; 

        /* Hämtar produkterna som är kopplade till det specifika orderidt - Lyckas inte med quantity */
        $productController = new ProductController();
        $products = $productController->getProductsFromOrder($id);
        $order->products = $products;

        return $order;

    }


    public function update($newValue, $entity) {

    }


    public function delete($id) {

    }












/* Special Queries */


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