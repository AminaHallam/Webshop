import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    await showCorrectLayout();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const url = urlParams.get('id')
    
    productPage(url); 

    renderProduct(url); 

}

makeRequest();
verifyAdmin();
getAllCategories();
getUser();
 


document.getElementById("menu").addEventListener("click", openMenu);


async function productPage(product) {

    const action = "getById";
    let specificProduct = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}&id=${product}`, "GET")

    console.log(specificProduct)

}   

export async function renderProduct(idToGet) {

    const action = "getById";
    let product = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}&id=${idToGet}`, "GET")

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


        main.append(productContainer)
        productContainer.append(title, description, unitPrice, image)

}




window.addEventListener('load', onLoad)


