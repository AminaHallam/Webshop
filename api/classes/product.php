<?php 

class Product {
    public $productId;
    public $name;
    public $description;
    public $unitPrice;
    public $unitsInStock;
    public $image;

    public $quantity;

    function __construct($productId, $name, $description, $unitPrice, $unitsInStock, $image) {
        $this->productId = $productId;
        $this->name = $name;
        $this->description = $description;
        $this->unitPrice = $unitPrice;
        $this->unitsInStock = $unitsInStock;
        $this->image = $image;
    }
}

?>