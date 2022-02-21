<?php

try {

    session_start();

    include_once("./../controllers/productController.php");

    if($_SERVER["REQUEST_METHOD"] == "GET") {

        if(isset($_GET["action"]) == "getCart") {

            if(isset($_SESSION["myCart"])) {

                echo json_encode($_SESSION["myCart"]);
                exit;

            } else {
                echo json_encode(false);
                exit;
            }
        } 
    }
    
    else if($_SERVER["REQUEST_METHOD"] == "POST") {

        if($_POST["action"] == "updateCart") {

            if(isset($_POST["cart"])) {

                $cart = json_decode($_POST["cart"]);

                for ($i=0; $i < count($cart) ; $i++) { 

                    $item = $cart[$i];

                    $controller = new ProductController();
                    $productDb = ($controller->getById($item->product->Id));

                    if($item->quantity > $productDb->unitsInStock) {
                        throw new Exception("Can't take more qty than we have available in stock", 400);
                        exit;
                    }


                    if(!$item->product->unitPrice == $productDb->unitPrice) {
                        throw new Exception("Price doesnt match with database", 400);
                        exit;
                    }
                }

                $_SESSION["myCart"] = json_encode($cart); 
                
                exit; 
            } 
        } 
    } 

} catch(Exception $e) {
    echo json_encode(array("Message" => $e->getMessage(), "Status" => $e->getCode()));
}


?>