
function onLoad() {

    getAllProducts()
    getProductFromId(1)
    getAllCategories()
    getCategoryFromId(3)

    getAllOrders()
    getOrderById(2)
    getOrdersByOtherId(`"REG"`, "Status")
    getOrdersByOtherId(2, "User")

}

document.getElementById("menu").addEventListener("click", openMenu);

 
function openMenu() {
    
    getAllCategories() 
    
    
}

document.getElementById("menu").addEventListener("click", openMenu);

// document.querySelector("#all").addEventListener("click", getAllProducts); 


    
    function openMenu() {
        
        document.getElementById("dropdown").classList.toggle("active");
        
    }
    
    
    
    async function makeRequest(url, method, body) {
        try {
            let response = await fetch(url, {
                method,
                body
            })
            let result = await response.json();
            
            return result
        } catch(err) {
            console.error(err)
        }
    }

   
}


/* Product */

/* Hämtar alla produkter */
async function getAllProducts() {
    const action = "getAll";

    let allProducts = await makeRequest(`./api/receivers/productReceiver.php?action=${action}`, "GET")
    console.log(allProducts)
}

/* Hämtar en produkt baserat på ett produktid */
async function getProductFromId(id) {
    const action = 'getById'; 

    
    
    
    
  /*   async function getProductFromId(id) {
        const action = 'getById'; 
        
        let specificProduct = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}&id=${id}`, "GET")
        // console.log(specificProduct)
        console.log(specificProduct)

       
    }
     */




/* Category */

/* Hämtar alla kategorier */
async function getAllCategories() {
    const action = "getAll";
    let allCategories = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}`, "GET")
    
    
    for (let i = 0; i < allCategories.length; i++) {
        const element = allCategories[i];
        
        const ul = document.getElementById("dropdown");
        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")
        let title = document.createElement("a")
        title.href = 'collectionPage.html?id=' + element.categoryId
        title.innerHTML = element.categoryName; 
        ul.append(productContainer)
        productContainer.append(title)
        
        
    }  
    
    
}


/* async function renderCategory(list){
    for (let i = 0; i < list.length; i++) {
        
        const element = list[i];
        const main = document.getElementsByTagName("main")[0];
        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")
        let title = document.createElement("h2")
        title.innerHTML = element.categoryName;  
        main.append(productContainer)
        productContainer.append(title)

    
/* Hämtar alla produkter som tillhör en specifik kategori */
async function getCategoryFromId(idToGet) {
    const action = "getById";
    let specificCategory = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}&id=${idToGet}`, "GET")
    console.log(specificCategory) 


    
}







/* Order */

/* Hämtar alla ordrar */
async function getAllOrders() {
    const action = "getAll";
    let allOrders = await makeRequest(`./../api/receivers/orderReceiver.php?action=${action}`, "GET")
    console.log(allOrders); 
}

} */
    


/* Hämtar en order baserat på ett orderid */
async function getOrderById(idToGet) {
    const action = "getById";
    let specificOrder = await makeRequest(`./../api/receivers/orderReceiver.php?action=${action}&id=${idToGet}`, "GET")
    console.log(specificOrder) 
}

/* Hämtar ordrar baserat på statusid eller userid */
async function getOrdersByOtherId(idToGet, type) {
    const action = "getByOtherId";
    let specificOther = await makeRequest(`./../api/receivers/orderReceiver.php?action=${action}&id=${idToGet}&type=${type}`, "GET")
    console.log(specificOther) 
}






window.addEventListener('load', onLoad)