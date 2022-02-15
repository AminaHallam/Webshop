<?php

include_once("./../classes/product.php");
include_once("./../classes/category.php");

include_once("./../classes/user.php");
include_once("./../classes/order.php");
include_once("./../classes/courrier.php");




/* FETCH_FUNC tar alla kolumner från den här funktionen och ger till varje specifik instans vi får från databasen. Här är det viktigt att de speglar kolumnerna som vi faktiskt får ut från databasen  */
function createProduct($productId, $name, $description, $unitPrice, $unitsInStock, $image) { /* ändrade id till productId */
    return new Product((int)$productId, $name, $description, $unitPrice, $unitsInStock, $image); /* ändrade id till productId */
} 

function createCategory($categoryId, $categoryName, $categoryDescription) {
    return new Category((int)$categoryId, $categoryName, $categoryDescription);
} 

function createUser($Id, $Email, $Password, $FirstName, $LastName, $Street, $CO, $ZipCode, $City, $Country, $CountryCode, $StandardPhone, $MobileNumber, $Admin, $TermsOfPurchase) {
    return new User((int)$Id, $Email, $Password, $FirstName, $LastName, $Street, $CO, (int)$ZipCode, $City, $Country, (int)$CountryCode, (int)$StandardPhone, (int)$MobileNumber, (int)$Admin, (int)$TermsOfPurchase);
}

function createOrder($Id, $StatusId, $UserId, $CourrierId, $RegisterDate, $ShippingDate, $CustRecDate) {
    return new Order((int)$Id, $StatusId, (int)$UserId, (int)$CourrierId, $RegisterDate, $ShippingDate, $CustRecDate);
} 

/* function createSubscriptionNews($Id, $UserId, $FirstName, $Email) {
    return new NewsLetter((int)$Id, $UserId, $FirstName, $Email);
}  */

/* Påbörjad. Vill få med quantity. Blev inge bra */
function productDetails($Id, $name, $description, $unitPrice, $unitsInStock, $image/* , $quantity */) { 
return new Product((int)$Id, $name, $description, $unitPrice, $unitsInStock, $image/* , $quantity */); 
} 


function createCourrier($Id, $courrierName, $Address, $Email, $CountryCode, $StandardPhone, $MobileNumber, $Contact) {
    return new Courrier((int)$Id, $courrierName, $Address, $Email, $CountryCode, $StandardPhone, $MobileNumber, $Contact);
} 

?>


