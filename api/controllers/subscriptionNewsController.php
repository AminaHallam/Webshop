
<?php 

session_start(); 

include_once("../classes/createInstanceFunctions.php"); 
include_once("../controllers/mainController.php"); 

class SubscriptionNewsController extends MainController {

    private $createSubscriptionNews = "createSubscriptionNews"; 

    function __construct() {
        parent::__construct("SubscriptionNews", "SubscriptionNews"); 
    }

    public function add($subscriptionNews) {
        try {

            $subscriptionNewsToAdd = createSubscriptionNews($id->id, $userId->userId, $firstName->firstName, $email->email); 
            return $this->database->insert($subscriptionNewsToAdd)

        } catch(Exception $e) {
            throw new Exception("The information is not in correct format...", 500);
        }
    }

}

?> 