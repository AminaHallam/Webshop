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
        }

    }  else if($_SERVER["REQUEST_METHOD"] == "POST") {

        if($_POST["endpoint"] == "createOrder") {
                
            if($_SESSION["inloggedUser"]) {

                
                if(!$_POST["products"] == $_SESSION["myCart"]) {
                    throw new Exception("List in SESSION doesn´t match with client", 401);
                    exit;
                }
                

                $products = json_decode($_POST["products"]);

                for ($i=0; $i < count($products); $i++) { 
                
                    $product = $products[$i];
                    
                    if($product->product->unitsInStock <= 0 ) {
        
                        echo json_encode(false);
                        exit;
                    } 
                } 

                // Skapar order
                $controller = new OrderController();
                $lastInsertedId = json_encode($controller->add(json_decode($_POST["createOrder"])));
                /*     error_log(serialize("Tillbaka på skapa order".$lastInsertedId)); */

                // Lägger till produkter på order
                $controller2 = new OrderDetailsController();
                $addProducts = json_encode($controller2->addProducts(json_decode($_POST["products"]), json_decode($lastInsertedId)));
                /* error_log(serialize("Tillbaka på lägg till produkter".$addProducts)); */

                // Uppdaterar unitsInStock på produkt
                $controller3 = new ProductController();
                $updateUnitsInstock = json_encode($controller3->update(json_decode($_POST["products"]), "-"));
               /*  error_log(serialize("Tillbaka på uppdatera saldo på produkt".$updateUnitsInstock)); */

            
                unset($_SESSION["myCart"]);

                echo json_encode(true);
                exit; 

            } 

            throw new Exception("You have to be logged in to place an order", 401);
            exit;
        } 
    }   

} catch(Exception $e) {
    echo json_encode(array("Message" => $e->getMessage(), "Status" => $e->getCode()));
}


?>