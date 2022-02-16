<?php 

session_start();

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");

class UserController extends MainController {

    private $createUser = "createUser";

    function __construct() {
        parent::__construct("User", "User");
    }


    public function checkEmail($user) {
        $query = "SELECT *
        FROM user
        WHERE Email = "."'".$user."'";

        $checkEmail = $this->database->freeQuery($query, $this->createUser);
        error_log(serialize($checkEmail));

        if(!$checkEmail == "{}") {
            return true;
        }
        return false;
        
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

        if(isset($_SESSION["inloggedUser"])) {
            
            $loggedInUser = unserialize($_SESSION["inloggedUser"]);
            $checkAdmin = $loggedInUser[0]->Admin;

            if($checkAdmin == 1) {
                return true;

            } else {
                return false;
            }
        }
    }

    public function add($user) {
        try {
            $addUser = createUser(null, $user->Email, $user->Password, $user->FirstName, $user->LastName, $user->Street, $user->CO, $user->ZipCode, $user->City, $user->Country, $user->CountryCode, $user->StandardPhone, $user->MobileNumber, $user->Admin, $user->TermsOfPurchase);
            return $this->database->insert($addUser);
        }
        catch(Exception $e) {
            throw new Exception("This dosent work");
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

    /* public function add($entity) {

    } */
}

?>