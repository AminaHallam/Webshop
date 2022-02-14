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

    const main = document.getElementsByTagName("mainCont")[0]; 
       
    let productContainer = document.createElement("div")
    productContainer.classList.add("productContainer")
    let title = document.createElement("h2")
    title.innerHTML = product.name;
    let productInfo = document.createElement('div');
    productInfo.classList.add('productInfo')
    let description = document.createElement("p")
    description.innerHTML = product.description;
    let unitPrice = document.createElement("p")
    unitPrice.innerHTML = product.unitPrice + " €";
    let image = document.createElement("img")
    image.classList.add('productImage')
    image.src = "./assets/" + product.image
    image.addEventListener("click", () => {productPage(product)})
    let addToCart = document.createElement('button'); 
    addToCart.classList.add('addToCart')
    addToCart.innerText = 'Add'
    addToCart.addEventListener('click', () => {
        console.log('click')
        //TODO ADD FUNCTION HERE 
    })
    let cartElement = document.createElement('div');
    cartElement.classList.add('cartElement')
    let cartButton = document.createElement('button')
    cartButton.classList.add('cartButton')
    cartButton.innerText = 'Continue to checkout'
    main.append(productContainer, productInfo, cartElement)
    cartElement.append(cartButton)
    productInfo.append(title, description, unitPrice, addToCart)
    productContainer.append(image)


}




window.addEventListener('load', onLoad)


