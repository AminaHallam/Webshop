<?php

try {   

   include_once("./../controllers/userController.php");

    if($_SERVER["REQUEST_METHOD"] == "GET") {

        if($_GET["action"] == "loginUser") {

          if($_GET["user"] && $_GET["password"]) {

                /* echo json_encode($_SESSION["inloggedUser"]); */
 
                $controller = new UserController();

                echo(json_encode($controller->loginUser($_GET["user"], $_GET["password"])));
                exit;
            }
        }
    }

}catch(Exception $err) {
    echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
}

?>
  