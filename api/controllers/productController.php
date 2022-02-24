<?php 

try {

include_once("./../classes/createInstanceFunctions.php");
include_once("./../controllers/mainController.php");
include_once("./../controllers/userController.php");


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


    public function update($newValue, $product) {

        $userController = new UserController();
        $checkAdmin = ($userController->verifyAdmin());

        if(!$checkAdmin) {
            throw new Exception("Action not allowed", 401);
            exit;
        }

        if(strpos($newValue, '+') !== false || strpos($newValue, '-') !== false) {
            
            $newValue = (int)$product->unitsInStock + (int)$newValue;
        } 

        $productToUpdate = createProduct((int)$product->Id, $product->name , $product->description, (int)$product->unitPrice, (int)$newValue, $product->image); 
        $result = $this->database->update($productToUpdate); 
        
         return $result;
    }




    // Uppdaterar unitsInStock på produkter när ordern är lagd
    public function updateQtyProductOrder($products) {

        for ($i=0; $i < count($products); $i++) { 
                
            $product = $products[$i];

            $newValue = $product->product->unitsInStock - $product->quantity; 
            $name = $product->product->name;
            $description = $product->product->description;
            $image = $product->product->image;

            $productToUpdate = createProduct((int)$product->product->Id, $name , $description, (int)$product->product->unitPrice, (int)$newValue, $image); 
            $updatedProducts = $this->database->update($productToUpdate); 
        }

        return $updatedProducts;
    }




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



}

} catch(Exception $err) {
    echo json_encode(array('Message' => $err->getMessage(), "Status" => $err->getCode()));
}


?>