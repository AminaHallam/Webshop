<?php

try {

include_once("./../controllers/subscriptionNewsController.php"); 

if($_SERVER["REQUEST_METHOD"] == "POST") {
        
    if($_POST["action"] == "addSubscriptionNews") {

        if(isset($_POST["subscriber"]) || isset($_SESSION['inloggedUser'])) {// or in session)) {
            
            $controller = new SubscriptionNewsController();

            echo(json_encode($controller->add(json_decode($_POST["subscriber"]))));
            
            exit;
        }

    }else{

        echo json_encode('The information is not correct');
        
        };
            
         

/* 
        } else if($_GET["action"] == "addUser") {
            
            if(isset($_GET["user"])) {
                $controller = new UserController();
                echo(json_encode($controller->checkEmail($_GET["user"])));
                exit;
            } */
            
  /*       } else {

            throw new Exception("Missing info...", 501);
            exit; 

        }
    }
     */
        
};   

} catch(Exception $err) {
    echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
}



?>