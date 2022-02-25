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
        } else if($_GET["action"] == "getorderDetails") {

            if($_GET["id"]) {

                echo json_encode("TJENARE");

            }
        }

    }  else if($_SERVER["REQUEST_METHOD"] == "POST") {

        if($_POST["endpoint"] == "createOrder") {

            if(isset($_POST["createOrder"])) {

                if($_SESSION["inloggedUser"]) {

                    $controller = new OrderController();
                    $result = json_encode($controller->add(json_decode($_POST["createOrder"])));
    
                    if($result == true) {
                        echo json_encode(true);
                        exit; 
    
                    }else {
                        echo json_encode(false);
                        exit;
                    }
                } 

            }        
            
        } 
    }   

} catch(Exception $e) {
    echo json_encode(array("Message" => $e->getMessage(), "Status" => $e->getCode()));
}


?>