<?php 
/* Skall spegla det som är i databasen. */
class Category {
    public $Id;
    public $categoryName;
    public $categoryDescription;



    public $products;

    function __construct($Id, $categoryName, $categoryDescription) {
        $this->Id = $Id;
        $this->categoryName = $categoryName;
        $this->categoryDescription = $categoryDescription;
        



    }
}

?>