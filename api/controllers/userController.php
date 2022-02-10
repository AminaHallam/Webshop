<?php 

session_start();

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");

class UserController extends MainController {

    private $createUser = "createUser";

    function __construct() {
        parent::__construct("User", "User");
    }




    // Kollar om username och password matchar databasen
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


    // Kollar om den inloggade användaren är admin eller inte
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



    

    /* Hämtar kunden som är kopplad till en specifik order */
    public function getUserFromOrder($orderId) { 
        $query = "SELECT u.id, u.Email, u.Password, u.FirstName, u.LastName, u.Street, u.CO, u.ZipCode, u.City, u.Country, u.CountryCode, u.StandardPhone, u.MobileNumber, u.Admin, u.TermsOfPurchase FROM user u
        JOIN `order` o
            ON o.userid = u.Id
            WHERE o.id = ".$orderId.";";

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