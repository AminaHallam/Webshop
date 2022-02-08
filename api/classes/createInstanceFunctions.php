<?php

include_once("./../classes/product.php");
include_once("./../classes/category.php");
include_once("./../classes/order.php");
include_once("./../classes/user.php");

/* FETCH_FUNC tar alla kolumner från den här funktionen och ger till varje specifik instans vi får från databasen. Här är det viktigt att de speglar kolumnerna som vi faktiskt får ut från databasen  */
function createProduct($productId, $name, $description, $unitPrice, $unitsInStock, $image) { /* ändrade id till productId */
    return new Product((int)$productId, $name, $description, $unitPrice, $unitsInStock, $image); /* ändrade id till productId */
} 

function createCategory($categoryId, $categoryName, $categoryDescription) {
    return new Category((int)$categoryId, $categoryName, $categoryDescription);
} 



?>


