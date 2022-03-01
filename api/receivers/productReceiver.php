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

        if($_POST["action"] == "setQuantity") {

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
                echo (json_encode($controller2->update($newValue, $productDb)));

                exit;

            } else {
                throw new Exception("Missing ID or value", 401);
                exit;
            }


        }  else if($_POST["action"] == "addQuantity") {

            if(isset($_POST["value"]) && isset($_POST["productId"])) {

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

                $value = "+".$value;

                $controller2 = new ProductController();
                echo (json_encode($controller2->addAndDeleteQuantity($value, $productDb)));
                exit;
                
            } else {
                throw new Exception("Missing ID or value", 401);
                exit;
            } 
        
        }   else if($_POST["action"] == "deleteQuantity") {

            if(isset($_POST["value"]) && isset($_POST["productId"])) {

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

                if($productDb->unitsInStock < $value ) {
                    throw new Exception("Total quantity can't be minus", 401);
                    exit;
                }

                $value = "-".$value;

                $controller2 = new ProductController();
                echo (json_encode($controller2->addAndDeleteQuantity($value, $productDb)));
                exit;
                
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

