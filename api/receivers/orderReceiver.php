<?php

try {

    include_once("./../controllers/orderController.php");
    include_once("./../controllers/ProductController.php");
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
        } else if($_GET["action"] == "getorderDetails") {

            if($_GET["id"]) {

                echo json_encode("TJENARE");

            }
        }

    }  else if($_SERVER["REQUEST_METHOD"] == "POST") {

        if($_POST["endpoint"] == "createOrder") {
                
            if($_SESSION["inloggedUser"]) {

               $products = json_decode($_SESSION["myCart"]);

                // Skapar order
                $controller = new OrderController();
                $lastInsertedId = json_encode($controller->add(json_decode($_POST["createOrder"])));

                 if(!$lastInsertedId) {
                    echo json_encode(false);
                } 

                // Lägger till produkter på order
                $controller2 = new OrderDetailsController();
                $addProducts = json_encode($controller2->addProducts($products, json_decode($lastInsertedId)));

                if(!$addProducts) {
                    throw new Exception("Products was not placed on order", 500);
                    exit;
                } 

                // Uppdaterar unitsInStock på produkt
                $controller3 = new ProductController();
                $updateUnitsInstock = json_encode($controller3->update($products, "-"));

                if(!$updateUnitsInstock) {
                    throw new Exception("Updating qty in database failed", 500);
                    exit;
                }

                unset($_SESSION["myCart"]);

                echo json_encode(true);
                exit; 

            } else {
                echo json_encode(false);
                exit;
            }
        } 
    }   

} catch(Exception $e) {
    echo json_encode(array("Message" => $e->getMessage(), "Status" => $e->getCode()));
}


?>