
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
    }

    public function getById($id) {
/*         return $this->database->fetchById($id, $this->createFunction); */
   }

    public function add($subscriber) {
        try {

            $subscriptionNewsToAdd = createSubscriptionNews(null, null, $subscriber->FirstName, $subscriber->Email); 
            return $this->database->insert($subscriptionNewsToAdd);

        } catch(Exception $e) {
            throw new Exception("The information is not in correct format...", 500);
        }
    }

}

?> 