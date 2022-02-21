import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut, printNrOfElements} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    await showCorrectLayout();
    await printNrOfElements();
    getAllProducts();
    getAllProductsId();
}

verifyAdmin();
getAllCategories();
getUser();

document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut)


async function getAllProducts() {
    const action = "getAll";

    let allProducts = await makeRequest(`./api/receivers/productReceiver.php?action=${action}`, "GET")

    renderProducts(allProducts)
    
}


async function renderProducts(list){

    const main = document.getElementsByTagName("main")[0]; 

    
    if(list[0].categoryName) {

    let categoryContainer = document.createElement("div")
    categoryContainer.classList.add("categoryContainer")
    let category = document.createElement("h2")
    category.innerHTML = list[0].categoryName;
    
    main.appendChild(categoryContainer)
    categoryContainer.appendChild(category)

    }

    for (let i = 0; i < list.length; i++) {
        
        const element = list[i];

        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")
        let title = document.createElement("h2")
        title.innerHTML = element.name;
        let description = document.createElement("p")
        description.innerHTML = element.description;
        let unitPrice = document.createElement("p")
        unitPrice.innerHTML = element.unitPrice + " €";
        let image = document.createElement("img")
        image.src = "./assets/" + element.image

        let avaliableUnits = document.createElement('p')
        let unitsInStock = element.unitsInStock;
        if(unitsInStock > 0){
            avaliableUnits.innerHTML = 'Product avaliable to order'; 
        }else{
            avaliableUnits.innerHTML = 'Product out of stock'
        }
        image.addEventListener("click", () => {productPage(element)}) 

        main.append(productContainer)
        productContainer.append(title, description, unitPrice, image, avaliableUnits)
    }


   


}


export function productPage(product) {

    let productId = product.Id

    window.location.href = "productPage.html?id=" + productId; 

}


export async function getAllProductsId() {
    const action = "getAll";
    let allProductsId = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}`, "GET")
    
    
    for (let i = 0; i < allProductsId.length; i++) {
        const element = allProductsId[i]
        //console.log(element.productId)
      /*   const ul = document.getElementById("dropdown");
        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")
        let title = document.createElement("a")
        title.href = 'collectionPage.html?id=' + element.categoryId
        title.innerHTML = element.categoryName; 
        ul.append(productContainer)
        productContainer.append(title) */

        
        
    }  
    
    
}


async function deleteProduct(id){
    const action = "delete";
    

    var body = new FormData()
    body.append("action", action)
    body.append("id", id)

    let status = await makeRequest(`./receivers/productReceiver.php`, "POST", body)
    console.log(status)
}




window.addEventListener('load', onLoad)