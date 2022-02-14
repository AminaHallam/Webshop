<?php 

class SubscriptionNews {
    public $Id;
    public $UserId;
    public $FirstName;
    public $Email;

    function __construct($Id, $UserId, $FirstName, $Email) {
        $this->Id = $Id;
        $this->UserId = $UserId;
        $this->FirstName = $FirstName;
        $this->Email = $Email;
    }
}

?>