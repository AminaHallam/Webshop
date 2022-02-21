<?php

try {

    include_once("./../controllers/productController.php");
    include_once("./../controllers/userController.php");

    if($_SERVER["REQUEST_METHOD"] == "GET") {
       
        
        if($_GET["action"] == "getAll") {
        
            $controller = new ProductController();
            echo(json_encode($controller->getAll()));
            exit;
        
        } else if($_GET["action"] == "getById") {
            
            $controller = new ProductController();

            if(!isset($_GET["id"])) {
                throw new Exception("Missing ID", 501);
                exit;
            }
            
            echo(json_encode($controller->getById((int)$_GET["id"])));
            exit;
        }


    } else if($_SERVER["REQUEST_METHOD"] == "POST") {

        if($_POST["action"] == "setUnitsInStock") {

            $controller = new UserController();
            $checkAdmin = ($controller->verifyAdmin());
    
            if($checkAdmin) {

                if(isset($_POST["newValue"]) && isset($_POST["productId"])) {

                    $controller2 = new ProductController();
                    echo (json_encode($controller2->inventoryProduct(json_decode($_POST["newValue"]), json_decode($_POST["productId"]))));
                    exit;

                } else {
                    throw new Exception("Missing ID or value", 401);
                    exit;
                }

            } else {
                echo json_encode(false);
                exit;
            }         

        } else if($_POST["action"] == "updateUnitsInStock") {

            $controller = new UserController();
            $checkAdmin = ($controller->verifyAdmin());

            if($checkAdmin) {

                if(isset($_POST["value"]) && isset($_POST["productId"])) {

                    if(isset($_POST["direction"])) {

                        $controller = new ProductController();
                        echo (json_encode($controller->updateProduct(json_decode($_POST["productId"]), $_POST["direction"], json_decode($_POST["value"]))));
                        exit;

                    } else {
                        throw new Exception("Missing direction", 401);
                        exit;
                    }
                    
                } else {
                    throw new Exception("Missing ID or value", 401);
                    exit;
                }

            } else {
                echo json_encode(false);
                exit;
            }   
        
        }
        

    }
        

}catch(Exception $err) {
    echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
}
    
?>

