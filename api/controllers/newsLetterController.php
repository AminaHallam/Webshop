
<?php 

session_start(); 

include_once("../classes/createInstanceFunctions.php"); 
include_once("../controllers/mainController.php"); 

class NewsLetterController extends MainController {

    private $createNewsLetter = "createNewsLetter"; 

    function __construct() {
        parent::__construct("NewsLetter", "NewsLetter"); 
    }

    public function add($newsletter) {
        try {

            $newsLetterToAdd = createNewsLetter($id->id, $title->title, $text->text, $date->date); 
            return $this->database->insert($newsLetterToAdd)

        } catch(Exception $e) {
            throw new Exception("The information is not in correct format...", 500);
        }
    }

}

?> 