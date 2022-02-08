<?php 

class Category {
    public $categoryId;
    public $categoryName;
    public $categoryDescription;

    public $products;

    function __construct($categoryId, $categoryName, $categoryDescription) {
        $this->categoryId = $categoryId;
        $this->categoryName = $categoryName;
        $this->categoryDescription = $categoryDescription;

    }
}

?>