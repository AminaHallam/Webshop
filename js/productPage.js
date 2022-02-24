
import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut, printNrOfElements} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    await showCorrectLayout();
    await printNrOfElements(); 

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const url = urlParams.get('id')
    
    productPage(url); 

    getAllCategories(url);

    await renderProduct(url); 


}


verifyAdmin();

getUser();


document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut)


async function productPage(product) {

    const action = "getById";
    let specificProduct = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}&id=${product}`, "GET")

    return specificProduct;
    
}   



async function renderProduct(idToGet) {

    const action = "getById";
    let product = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}&id=${idToGet}`, "GET")


    let main = document.getElementsByTagName("main")[0]; 

   /*  main.innerHTML = ""; */
       
    let productCont = document.createElement("div")
    productCont.classList.add("productCont")
    let title = document.createElement("h2")
    title.innerHTML = product.name;
    let productInfo = document.createElement('div');
    productInfo.classList.add('productInfo')
    let description = document.createElement("p")
    description.classList.add('textCont');
    description.innerHTML = product.description;
    let unitPrice = document.createElement("p")
    description.classList.add('textCont');
    unitPrice.innerHTML = product.unitPrice + " €";
    let image = document.createElement("img")
    image.classList.add('productImage')
    image.src = "./assets/" + product.image
    image.addEventListener("click", () => {productPage(product)})
    

    let addToCartButton = document.createElement('button'); 
    addToCartButton.classList.add('addToCart')
    addToCartButton.innerText = "Add"
    addToCartButton.addEventListener("click", () => {addToCart(product)})


 

    /* let returnToProductPage = document.createElement('button'); 
    returnToProductPage.classList.add('returnToPpage')
    returnToProductPage.innerText = "Return to product page"
    returnToProductPage.addEventListener("click", () => {
        window.location.href = "productPage.html?id=" + product.productId; 
    }) */


    let divForCart = document.createElement('div');
    divForCart.classList.add('divForCart')
    let spaceDiv = document.createElement('div');
    spaceDiv.classList.add('spaceDiv');
    let cartButton = document.createElement('button')
    cartButton.classList.add('cartButton')
    cartButton.innerText = 'Continue to checkout'

    main.append(productCont, productInfo, divForCart)

    cartButton.addEventListener("click", () => { location.href = "./../cartPage.html"; })

    divForCart.append(spaceDiv, cartButton)
    productInfo.append(title, description, unitPrice, addToCartButton, /*returnToProductPage*/)
    productCont.append(image)

    if(product.unitsInStock == 0) {
        addToCartButton.classList.add("noClick")
        return
    }

    addToCartButton.classList.remove("noClick")

}



// Lägger till produkten i kundvagnen (SESSION)
async function addToCart(product) {

    let productId = product.Id
    let direction = "+"

    const push = "updateCart"

    var body = new FormData()
    body.append("action", push)
    body.append("direction", direction)
    body.append("productId", JSON.stringify(productId))


    let result =  await makeRequest(`./../api/receivers/cartReceiver.php`, "POST", body)

    alert(result)

    printNrOfElements();

}


window.addEventListener('load', onLoad)


