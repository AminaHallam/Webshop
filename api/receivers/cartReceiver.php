<?php

try {

    session_start();

    if($_SERVER["REQUEST_METHOD"] == "GET") {

        if(isset($_GET["action"]) == "getCart") {

            if(isset($_SESSION["myCart"])) {

            echo json_encode($_SESSION["myCart"]);
            exit;

            }

        } 

    }
    
    else if($_SERVER["REQUEST_METHOD"] == "POST") {

        if($_POST["action"] == "updateCart") {

            if(isset($_POST["cart"])) {

                $cart = $_POST["cart"];
                
                $_SESSION["myCart"] = $cart;
                
                exit; 
            } 
        } 
    } 

} catch(Exception $e) {
    echo json_encode(array("Message" => $e->getMessage(), "Status" => $e->getCode()));
}


?>