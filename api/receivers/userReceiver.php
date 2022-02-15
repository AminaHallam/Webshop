<?php

try {
    
   include_once("./../controllers/userController.php");

    if($_SERVER["REQUEST_METHOD"] == "GET") {

        if($_GET["action"] == "loginUser") {

          if(isset($_GET["user"]) && isset($_GET["password"])) {

                $controller = new UserController();

                echo(json_encode($controller->loginUser($_GET["user"], $_GET["password"])));
                exit;
            }
            
        } else if($_GET["action"] == "getUser") {

            if(isset($_SESSION["inloggedUser"])) {

                $user = unserialize($_SESSION["inloggedUser"]);

                $user = $user[0];

                $basicUserInfo = array(
                    "id" => $user->Id,
                    "FirstName" => $user->FirstName,
                    "LastName" => $user->LastName,
                    "Street" => $user->Street,
                    "CO" => $user->CO,
                    "ZipCode" => $user->ZipCode,
                    "City" => $user->City,
                    "Country" => $user->Country,
                    "Admin" => $user->Admin               
                );
    
                echo json_encode($basicUserInfo); 
                exit;

            } else {
                echo json_encode(false);
                exit;
            }

           


        } else if($_GET["action"] == "verifyAdmin") {
            $controller = new UserController();
            echo(json_encode($controller->verifyAdmin()));
            exit;
            

        } else if($_GET["action"] == "addUser") {
            
            if(isset($_GET["user"])) {
                $controller = new UserController();
                echo(json_encode($controller->checkEmail($_GET["user"])));
                exit;
            }


        } else if($_GET["action"] == "destroySession") {
            session_destroy();
            echo json_encode(True);
            exit;
        }

    }  else if ($_SERVER["REQUEST_METHOD"] == "POST") {

        if ($_POST["endpoint"] == "addUser") {
            if (isset($_POST["addUser"])) { 
                $controller = new UserController();

                $userToAdd = json_decode($_POST["addUser"]);
                error_log(json_encode($userToAdd));
                echo (json_encode($controller->add($userToAdd)));
                error_log("hej");
                exit;
            }
        }
}


}catch(Exception $err) {
    echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
}

?>
  