<?php 

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");


class ProductController extends MainController {

    private $createFunction = "createProduct";

    function __construct() {
        parent::__construct("Product", "Product");
    }


    public function getAll() { 
        return $this->database->fetchAll($this->createFunction);  
    }

    public function getById($id) {
        return $this->database->fetchById($id, $this->createFunction);
    }


    public function add($entity) {

    }

    // Uppdaterar unitsInStock på produkt
    public function update($products, $direction) {
        
        for ($i=0; $i < count($products); $i++) { 
                
            $product = $products[$i];

           $query = "UPDATE product
           SET UnitsInStock = UnitsInStock ".$direction.$product->quantity.
           " WHERE Id = ".$product->product->productId.";";

           $updatedProducts = $this->database->freeQuery($query, $this->createFunction); 

           /* error_log(serialize($updatedProducts)); */

        }

    }
        





    /* Special Queries */





    /* Hämtar alla produkter som tillhör en specifik kategori */
    public function getProductsFromCategory($categoryID) { 
        $query = "SELECT p.Id, p.Name, p.Description, p.UnitPrice, p.UnitsInStock, p.Image
        FROM product p 
        JOIN productincategory pc
            ON pc.ProductId = p.Id
        WHERE pc.CategoryId = " . $categoryID. ";";
        return $this->database->freeQuery($query, $this->createFunction); 
    }  








    /* Hämtar alla produkter som är kopplade till en specifik order - Har lite proble med attributet quantity */
    ////////* påbörjad funktion 2022-02-07. Vill få med quantity som ligger i productDetails till instansen */ //////////////////////////////////////////////////
    public function getProductsFromOrder($orderId) { 
        $query = "SELECT p.id, p.Name, p.Description, p.UnitPrice, p.UnitsInStock, p.Image, od.Quantity FROM `order` o
        JOIN orderdetails od
            ON od.OrderID = o.id
        JOIN Product p
            ON p.id = od.ProductID
            WHERE o.id = ".$orderId.";";

        return $this->database->freeQuery($query, $this->productDetails); 
    }  

////////////////////////////////////////////////////////////////////////////////////////////




}


?>