<?php

try {
    
    session_start();

   include_once("./../controllers/userController.php");

    if($_SERVER["REQUEST_METHOD"] == "GET") {

        if($_GET["action"] == "loginUser") {

          if($_GET["user"] && $_GET["password"]) {

                $controller = new UserController();

                echo(json_encode($controller->loginUser($_GET["user"], $_GET["password"])));
                exit;
            }
            
        } else if($_GET["action"] == "getUser") {

            /* session_destroy(); */
            
            echo json_encode($_SESSION["inloggedUser"]); 

        } else if($_GET["action"] == "verifyAdmin") {
            $controller = new UserController();

            echo(json_encode($controller->verifyAdmin()));
                
            exit;
            
        } else if($_GET["action"] == "addUser") {
            
            if($_GET["user"]) {
                $controller = new UserController();
                echo(json_encode($controller->checkEmail($_GET["user"])));
                exit;
              }
        }
    } else if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if($_POST["endpoint"] == "addUser") {
            echo (json_encode("addUser"));
    }
}

}catch(Exception $err) {
    echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
}

?>
  