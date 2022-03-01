<?php


try {
    include_once("./../controllers/orderStatusController.php"); 

    if($_SERVER["REQUEST_METHOD"] == "GET") {

        if($_GET["action"] == "getAll") {

            echo json_encode("getAll"); 


        }


    } else if($_SERVER["REQUEST_METHOD"] == "POST") {

        
    

    }



} catch(Exception $err) {
    echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
}
    
?>