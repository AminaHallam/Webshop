<?php 

class Product {
    public $id;
    public $name;
    public $description;
    public $unitPrice;
    public $unitsInStock;
    public $image;
    



    function __construct($id, $name, $description, $unitPrice, $unitsInStock, $image) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->unitPrice = $unitPrice;
        $this->unitsInStock = $unitsInStock;
        $this->image = $image;
    }
}

?>