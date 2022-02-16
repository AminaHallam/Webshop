<?php

try {

    include_once("./../controllers/orderController.php");

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

                echo json_decode("Hejsan!");

                /* if($_POST["endpoint"] == "createOrder") {
                */
                    

                /*    if($_SESSION["inloggedUser"]) {

                        
                        $controller = new OrderController();

                        echo(json_encode($controller->add(json_decode($_POST["userId"]))));
                        exit; 

                    } else {
                        echo json_encode("You have to be logged in before you proceed");
                    } */

                /* } */

    }    

} catch(Exception $e) {
    echo json_encode(array("Message" => $e->getMessage(), "Status" => $e->getCode()));
}


?>