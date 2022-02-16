
<?php 

session_start(); 

include_once("../classes/createInstanceFunctions.php"); 
include_once("../controllers/mainController.php"); 

class SubscriptionNewsController extends MainController {

    private $createSubscriptionNews = "createSubscriptionNews"; 

    function __construct() {
        parent::__construct("SubscriptionNews", "SubscriptionNews"); 
    }

    public function getAll() { 
        /* return $this->database->fetchAll($this->createFunction); */  
        // hämta datan från användare med id, gör en join. 

    }

    public function getById($id) {
/*         return $this->database->fetchById($id, $this->createFunction); */
   }



   //// SKALL IMPLEMENTERAS 

  /*  public function checkSubscription($subscriber){
       
   
       $query = "SELECT userId 
       FROM subscriptionNews 
       WHERE userId = "."'".$subscriber."'";

        $alreadySubscribed = $this->database->freeQuery($query, $this->$createSubscriptionNews); 
        error_log(serialize($alreadySubscribed));
    } */


     public function add($subscriber) { 
       
       try{
            if(isset($_SESSION['inloggedUser'])){
                $user = unserialize($_SESSION["inloggedUser"]);

                $subscriptionNewsToAdd = createSubscriptionNews(null, $user[0]->Id , null, null); 
                return $this->database->insert($subscriptionNewsToAdd);
         
            }else if($subscriber){ 

                $subscriptionNewsToAdd = createSubscriptionNews(null, null, $subscriber->FirstName, $subscriber->Email);

                return $this->database->insert($subscriptionNewsToAdd);
               
            } 
         
        
        } catch(Exception $e) {
            throw new Exception("The information is not in correct format...", 500);
        }
    }


}
 


?> 