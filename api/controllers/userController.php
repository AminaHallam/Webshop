<?php 

session_start();

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");

class UserController extends MainController {

    private $createUser = "createUser";

    function __construct() {
        parent::__construct("User", "User");
    }





    public function loginUser($user, $password) { 
        $query = "SELECT * 
        FROM user
        WHERE Email = "."'".$user."'"." AND Password = "."'"."$password"."'".";";

        $checkAccount = $this->database->freeQuery($query, $this->createUser);

        if(!$checkAccount == "{}") {

            return false;
        }

        $_SESSION["inloggedUser"] = serialize($checkAccount);

        return true;
    }



    public function verifyAdmin() {

        if($_SESSION["inloggedUser"]) {

            $loggedInUser = unserialize($_SESSION["inloggedUser"]);

            $checkAdmin = $loggedInUser[0]->Admin;

            if($checkAdmin == 1) {

                return true;

            } else {

                return false;
            }

        }

    }







    public function getAll() { 
        /* return $this->database->fetchAll($this->createFunction);  */ 
    }

    public function getById($id) {
       /*  return $this->database->fetchById($id, $this->createFunction); */
    }
}

?>