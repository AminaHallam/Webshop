<?php

try {

   include_once("./../controllers/userController.php");

    if($_SERVER["REQUEST_METHOD"] == "GET") {

        if($_GET["action"] == "verifyAccount") {

          if($_GET["user"] && $_GET["password"]) {
           
            $controller = new UserController();
            echo(json_encode($controller->verifyAccount($_GET["user"], $_GET["password"], $_GET["admin"])));
            exit;
        }
    }
}

}catch(Exception $err) {
    echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
}

?>
  