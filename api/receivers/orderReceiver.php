<?php

try {

    include_once("./../controllers/orderController.php");
    include_once("./../controllers/orderDetailsController.php");


    if($_SERVER["REQUEST_METHOD"] == "GET") {

        if($_GET["action"] == "getAll") {

            $controller = new OrderController(); 
            echo(json_encode($controller->getAll()));
            
            exit;

        } else if($_GET["action"] == "getById") {

            $controller = new OrderController();

            if(!isset($_GET["id"])) {
                throw new Exception("Missing ID", 501);
                exit;
            }

            
            echo(json_encode($controller->getById((int)$_GET["id"])));
            exit; 

        } else if($_GET["action"] == "getByOtherId") {


            if($_GET["type"] == "Status") {

                if(!isset($_GET["id"])) {
                    throw new Exception("Missing ID", 501);
                    exit;
                }
                
                $controller = new OrderController(); 
                echo(json_encode($controller->getOrdersFromOtherId($_GET["id"],$_GET["type"])));


            } else if ($_GET["type"] == "User") {

                if(!isset($_GET["id"])) {
                    throw new Exception("Missing ID", 501);
                    exit;
                }

                $controller = new OrderController(); 
                
                echo(json_encode($controller->getOrdersFromOtherId((int)$_GET["id"],$_GET["type"])));

            }
        }

    }  else if($_SERVER["REQUEST_METHOD"] == "POST") {

        if($_POST["endpoint"] == "createOrder") {
                
            if($_SESSION["inloggedUser"]) {
                // Skapar order
                $controller = new OrderController();
                $lastInsertedId = json_encode($controller->add(json_decode($_POST["createOrder"])));

                // Lägger till produkter på order
                $controller2 = new OrderDetailsController();
                $addProducts = json_encode($controller2->addProducts(json_decode($_POST["products"]), json_decode($lastInsertedId)));

                $controller3 = new ProductController();
                $updateUnitsInstock = json_encode($controller3->update(json_decode($_POST["products"])));
                error_log(serialize($updateUnitsInstock));
                // Gör en sista funktion med att ta bort quantity. 
            
                echo $lastInsertedId;

                exit; 

            }
        } 
    }    

} catch(Exception $e) {
    echo json_encode(array("Message" => $e->getMessage(), "Status" => $e->getCode()));
}


?>