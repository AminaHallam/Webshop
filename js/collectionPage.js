import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut, printNrOfElements} from './../helperFunctions/fetchHelper.js'



async function onLoad() {
    await showCorrectLayout();
    await printNrOfElements();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const url = urlParams.get('id')
    
    getCategoryFromId(url)
    
    renderProductsFromCategory(url)
}


verifyAdmin();

getUser();

document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut)


async function getCategoryFromId(idToGet) {

    const action = "getById";
    let specificCategory = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}&id=${idToGet}`, "GET") 

    for (let i = 0; i < specificCategory.length; i++) {
        const category = specificCategory[i]; 
        
    }
    const main = document.getElementsByTagName("main")[0]; 

    if(specificCategory.categoryName) {

        let categoryContainer = document.createElement("div")
        categoryContainer.classList.add("categoryContainer")
        let category = document.createElement("h2")
        category.innerHTML = specificCategory.categoryName;
        
        main.appendChild(categoryContainer)
        categoryContainer.appendChild(category)
    
    }

}


async function renderProductsFromCategory(idToGet) {

    const action = "getById";
    let specificCategory = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}&id=${idToGet}`, "GET")
    
    for (let i = 0; i < specificCategory.products.length; i++) {
        const product = specificCategory.products[i];
        
        const main = document.getElementsByTagName("main")[0]; 
       
       let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")
        let title = document.createElement("h2")
        title.innerHTML = product.name;
        let description = document.createElement("p")
        description.innerHTML = product.description;
        let unitPrice = document.createElement("p")
        unitPrice.innerHTML = product.unitPrice + " €";
        let image = document.createElement("img")
        image.src = "./assets/" + product.image
        let avaliableUnits = document.createElement('p')
        let unitsInStock = product.unitsInStock;
        if(unitsInStock > 0){
            avaliableUnits.innerHTML = 'Product avaliable to order'; 
        }else{
            avaliableUnits.innerHTML = 'Product out of stock'
        }
        image.addEventListener("click", () => {productPage(product)})
    
        main.append(productContainer)
        productContainer.append(title, description, unitPrice, image, avaliableUnits)

    }


}

function productPage(product) {

    let productId = product.Id

    window.location.href = "productPage.html?id=" + productId; 

} 


window.addEventListener("load", onLoad)
