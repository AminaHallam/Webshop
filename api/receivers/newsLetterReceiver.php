<?php

try {

include_once("./../controllers/newsLetterController.php"); 

if($_SERVER["REQUEST_METHOD"] == "POST") {
        
    if($_POST["action"] == "addSubscriber") {

        if($_POST["firstName"] && $_POST["email"])) {

            $controller = new NewsLetterController();

            echo(json_encode($controller->addSubscriber($_POST["name"], $_POST["email"])));
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