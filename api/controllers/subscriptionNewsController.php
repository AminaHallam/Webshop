
<?php 

session_start(); 

include_once("../classes/createInstanceFunctions.php"); 
include_once("../controllers/mainController.php"); 

class SubscriptionNewsController extends MainController {

    private $createSubscriptionNews = "createSubscriptionNews"; 
    

    function __construct() {
        parent::__construct("SubscriptionNews", "SubscriptionNews"); 
    }


    
    public function getAllLoggedInSubscribers() {
        $query = 
        "SELECT u.id, sn.userid, u.FirstName, u.Email 
        FROM `subscriptionnews` sn 
        JOIN `user` u ON u.Id = sn.UserID;";

        $query2 =
        "SELECT *
        FROM `subscriptionnews`
        WHERE subscriptionnews.UserID IS NULL;"; 

        
   
        $subscriberLoggedIn = $this->database->freeQuery($query, $this->createSubscriptionNews);
        $subscriberGuest = $this->database->freeQuery($query2, $this->createSubscriptionNews);

        error_log(serialize($subscriberLoggedIn));
        
        
        return $allSubscribers = array_merge($subscriberLoggedIn, $subscriberGuest);

        

       
    }







    public function getAll() { 
       
        
        return $this->database->fetchAll($this->$createSubscriptionNews); 
        // hämta datan från användare med id, gör en join. 

    }

    public function getById($id) {
/*         return $this->database->fetchById($id, $this->createFunction); */
   }

   

     public function add($subscriber) { 
       
       try{
            if(isset($_SESSION['inloggedUser'])){
                $user = unserialize($_SESSION["inloggedUser"]);


                $subscriptionNewsToAdd = createSubscriptionNews(null, $user->Id , null, null); 
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