<?php

include_once("./../classes/product.php");
include_once("./../classes/category.php");

/* FETCH_FUNC tar alla kolumner från den här funktionen och ger till varje specifik instans vi får från databasen. Här är det viktigt att de speglar kolumnerna som vi faktiskt får ut från databasen  */
function createProduct($id, $name, $description, $unitPrice, $unitsInStock, $image) { /* ändrade id till productId */
    return new Product((int)$id, $name, $description, $unitPrice, $unitsInStock, $image); /* ändrade id till productId */
} 

function createCategory($id, $categoryName, $categoryDescription) {
    return new Category((int)$id, $categoryName, $categoryDescription);
} 


?>