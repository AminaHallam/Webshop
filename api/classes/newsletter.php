<?php 

class NewsLetter {
    public $Id;
    public $Title;
    public $Text;
    public $Date;

    function __construct($Id, $Title, $Text, $Date) {
        $this->Id = $Id;
        $this->Title = $Title;
        $this->Text = $Text;
        $this->Date = $Date;
    }
}

?>