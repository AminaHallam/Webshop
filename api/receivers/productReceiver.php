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
    }
        

        }catch(Exeption $err) {
            echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
        }
    
?>

