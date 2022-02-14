<?php

try {

include_once("./../controllers/subscriptionNewsController.php"); 

if($_SERVER["REQUEST_METHOD"] == "POST") {
        
    if($_POST["action"] == "addSubscriptionNews") {

        if($_POST["firstName"] && $_POST["email"])) {

            $controller = new SubscriptionNewsController();

            echo(json_encode($controller->addSubscriptionNews($_POST["name"], $_POST["email"])));
            exit;
            
        } else {

            throw new Exception("Missing info...", 501);
            exit; 

        }
    
        
    }

} catch(Exception $err) {
    echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
}



?>