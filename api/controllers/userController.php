<?php 

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");

class UserController extends MainController {

    private $createUser = "createUser";

    function __construct() {
        parent::__construct("User", "User");
    }

    public function verifyAccount($user, $password, $admin) { 
        $query = "SELECT * 
        FROM user
        WHERE Email = ".$user." AND Password = "."$password"." AND Admin = ".$admin.";";
        error_log(serialize($query));
        return $this->database->freeQuery($query, $this->createUser);
    }

    public function getAll() { 
        /* return $this->database->fetchAll($this->createFunction);  */ 
    }

    public function getById($id) {
       /*  return $this->database->fetchById($id, $this->createFunction); */
    }
}

?>