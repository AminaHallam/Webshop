
import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut, printNrOfElements} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    await showCorrectLayout();
    await printNrOfElements(); 

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const url = urlParams.get('id')
    
    productPage(url); 

    renderProduct(url); 
    getAllCategories(url);
}


verifyAdmin();

getUser();


document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut)


async function productPage(product) {

    const action = "getById";
    let specificProduct = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}&id=${product}`, "GET")

    console.log(specificProduct)
    
}   



async function renderProduct(idToGet) {

    const action = "getById";
    let product = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}&id=${idToGet}`, "GET")

    let main = document.getElementsByTagName("main")[0]; 
       
    let productCont = document.createElement("div")
    productCont.classList.add("productCont")
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


    let cartElement = document.createElement('div');
    cartElement.classList.add('cartElement')
    let cartButton = document.createElement('button')
    cartButton.classList.add('cartButton')
    cartButton.innerText = 'Continue to checkout'
    main.append(productCont, productInfo, cartElement)
    cartElement.append(cartButton)
    productInfo.append(title, description, unitPrice, addToCartButton, /*returnToProductPage*/)
    productCont.append(image)


}



// Lägger till produkten i kundvagnen (SESSION)
async function addToCart(product) {

    /* Hämtar den sparade carten i SESSION */
    const action = "getCart"

    let cart = await makeRequest(`./../api/receivers/cartReceiver.php?action=${action}`, "GET")

    if(cart) {
        cart = JSON.parse(cart) 
    } else {
        cart = []
    }

    /* Kollar upp om produkten har lagts till tidigare, samt jämför antalet vi lagt till på produkten i carten och unitsinstock på produkten i databasen. */
    let index = cart.findIndex((cartItem) => { 

        if(cartItem.product.productId == product.productId) {
            
            if(cartItem.quantity >= product.unitsInStock) {
                alert("Sorry, we do not have more of this product available for reservation")
                return index = false
            }

            return true
        }

    })

    /* Om produkten inte finns i carten sedan tidigare, lägg till produkten samt quantity 1. Else, dvs om den redan finns, addera bara med 1 */
    if(index < 0) {
        cart.push({
            product: product, 
            quantity: 1
        })


        alert(product.name + " is added to cart")

    } else {
        cart[index].quantity++

        alert(product.name + " is added to cart")
    }


    /* Skickar en uppdaterad version av carten till SESSION */
    const push = "updateCart"

    var body = new FormData()
    body.append("action", push)
    body.append("cart", JSON.stringify(cart))


    await makeRequest(`./../api/receivers/cartReceiver.php`, "POST", body)


    printNrOfElements();

}




window.addEventListener('load', onLoad)


