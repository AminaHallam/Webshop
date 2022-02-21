<?php 

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");
include_once("./../controllers/productController.php");
include_once("./../controllers/userController.php");



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


    // Skapar order. 
    public function add($OrderInfo) {
        try {

            $createOrder = createOrder(null, $OrderInfo->StatusId, $OrderInfo->UserId, $OrderInfo->CourrierId, date('Y-m-d H:i:s'), null, null);   
            
            return $this->database->insert($createOrder);
 
        }   
        catch(Exception $e) {
            throw new Exception("This dosent work");
        }
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


?>