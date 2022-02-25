<?php 

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");



class NewsletterController extends MainController{

    private $createNewsletter = "createNewsletter"; 

    function __construct() {
        parent::__construct('Newsletter', 'Newsletter'); 

    }


    public function add($news){
        try {

            $createNewsletter = createNewsletter(null, $news->Title, $news->Text, date('Y-m-d H:i:s'));   
            error_log($createNewsletter);
            return $this->database->insert($createNewsletter);
 
        }   
        catch(Exception $e) {
            throw new Exception("Not possible");
        }
    }


    public function getAll(){
        return $this->database->fetchAll($this->createNewsletter);
    }

    public function getById($id){
        $newsletter = $this->database->fetchById($id, $this->createNewsLetter); 
    }

    public function update($newValue, $entity) {

    }
    
    public function delete($id) {

    }



    
    
}   


?> 