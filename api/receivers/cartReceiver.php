<?php

try {

    
    session_start();

    include_once("./../controllers/productController.php");

    if($_SERVER["REQUEST_METHOD"] == "GET") { 

        if(isset($_GET["action"]) == "getCart") {

            if(isset($_SESSION["myCart"])) {

                $myCart = $_SESSION["myCart"]; 

                echo json_encode($myCart);
                exit;

            } else {
                echo json_encode(false);
                exit;
            }
        } 
    }
    
    else if($_SERVER["REQUEST_METHOD"] == "POST") {

        if($_POST["action"] == "updateCart") {

            if(isset($_POST["productId"]) && isset($_POST["direction"])) {
                
                $productId = json_decode($_POST["productId"]);
                $direction = $_POST["direction"];

                error_log(serialize($productId));
                error_log($direction);

  
                $controller = new ProductController();
                $productDb = ($controller->getById(json_decode($productId)));

                $cart = json_decode($_SESSION["myCart"]);


                if(!$productDb->Id == $productId) {
                    echo json_encode("ID not found in DB");
                    exit;
                } 

            
                if($direction == "+") {
                    
                    if($productDb->unitsInStock == 0) {
                        echo json_encode("We do not have more of this product");
                        exit;
                    } 
                }
                



                $product = new stdClass;
                $product->product = $productDb;

                $quantity = new stdClass;
                $quantity->quantity = 1;

                $productToPush = (object)array_merge((array)$product, (array)$quantity);





                if(!$cart) {
                     $cart = []; 
                }


                foreach ($cart as $i => $cartItem) { 
                    error_log("kommer in i foreach");

                    if($productDb->Id == $cartItem->product->Id) {

                        error_log("ID't matchar i foreach");
                       
                        if($cartItem->quantity >= $productDb->unitsInStock) {
                            echo json_encode("Sorry, we do not have more of this product available for reservation");
                            exit;
                        }

                        error_log($direction);

                        if($direction == "+") {

                            error_log("Kom in i plus");

                            $cart[$i]->quantity += 1; 

                            $_SESSION["myCart"] = json_encode($cart);
                            echo json_encode("Product is added to cart");
                            exit;

                        } else if($direction == "-"){

                            error_log("Kom in i minus");

                              if($cart[$i]->quantity == 1) {
                                error_log("Kommer in här nummer 1");
                                
                                unset($cart[$i]);

                                $_SESSION["myCart"] = json_encode($cart);
                                echo json_encode("Product is REDUCED");
                                exit;

                                } else {
                                    error_log("Kommer in här nummer 2");
                                    
                                    error_log(serialize($cart[$i]->quantity));

                                    $cart[$i]->quantity -= 1; 

                                    $_SESSION["myCart"] = json_encode($cart);
                                    echo json_encode("Product is REDUCED");
                                    exit;
                                }  


                                error_log("Kom in i ingenmansland");
                            /* $cart[$i]->quantity -= 1;  */

                            $_SESSION["myCart"] = json_encode($cart);
                            echo json_encode("Product is reduced");
                            exit;
                        }

                        error_log("Kom in i ingenmansland nummer 2");
                        
                    } 

                    error_log("Kom in i ingenmansland nummer 3");

                    if($key < 0) {

                        array_push($cart, $productToPush);
    
                        $_SESSION["myCart"] = json_encode($cart);
    
                        echo json_encode("Product is added to cart");
                        exit;
    
                    }

                    error_log("Kom in i ingenmansland nummer 4");
                }

                array_push($cart, $productToPush);
    
                $_SESSION["myCart"] = json_encode($cart);

                echo json_encode("Product is added to cart");
                
                exit;  
            } 
        } 
    } 

} catch(Exception $e) {
    echo json_encode(array("Message" => $e->getMessage(), "Status" => $e->getCode()));
}


?>