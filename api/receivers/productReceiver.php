<?php

try {

    include_once("./../controllers/productController.php");

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

            if(isset($_POST["newValue"]) && isset($_POST["productId"])) {
                
                $newValue = $_POST["newValue"];
                $productId = $_POST["productId"];
                $controller = new ProductController();
                $productDb = ($controller->getById($productId));

                if(!$productDb) {
                    throw new Exception("Id does not match with DB", 401);
                    exit;
                }

                if($newValue < 0) {
                    throw new Exception("Value can't be minus", 401);
                    exit;
                }

                $controller2 = new ProductController();
                echo (json_encode($controller2->inventoryProduct($newValue, $productId)));
                exit;

            } else {
                throw new Exception("Missing ID or value", 401);
                exit;
            }


        } else if($_POST["action"] == "updateUnitsInStock") {

            if(isset($_POST["value"]) && isset($_POST["productId"])) {

                if(isset($_POST["direction"])) {
                
                    $direction = $_POST["direction"];
                    $value = $_POST["value"];
                    $productId = $_POST["productId"];
                    $controller = new ProductController();
                    $productDb = ($controller->getById($productId));

                    if(!$productDb) {
                        throw new Exception("Id does not match with DB", 401);
                        exit;
                    }

                    if($value < 0) {
                        throw new Exception("Value can't be minus", 401);
                        exit;
                    }

                    if($direction == "-") {

                        if($productDb->unitsInStock < $value ) {
                            throw new Exception("Total quantity can't be minus", 401);
                            exit;
                        }
                    }

                    $controller2 = new ProductController();
                    echo (json_encode($controller2->updateProduct($productId, $direction, $value)));
                    exit;

                } else {
                    throw new Exception("Missing direction", 401);
                    exit;
                }
                
            } else {
                throw new Exception("Missing ID or value", 401);
                exit;
            } 
        
        }  

    }
 

}catch(Exception $err) {
    echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
}
    
?>

