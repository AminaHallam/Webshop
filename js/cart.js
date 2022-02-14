import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut, printNrOfElements} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    accountCheck();
    await showCorrectLayout(); 
    await printNrOfElements(); 
    await renderCart() 
    await getUser();
    await getCourrier()

}

makeRequest();
verifyAdmin();
getAllCategories();
getUser();

document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut)





// Om du inte är inloggad så skickas du till loginsidan. 
async function accountCheck() {

    console.log("kommer in i accountcheck")

    let allowed = await getUser();

    if(!allowed) {

        alert("Log in or register an account to proceed")

        location.href = "./../login.html";

        return
    }

}


// Hämtar carten från SESSION 
async function getCart() {
    
    const action = "getCart"

    let cart = await makeRequest(`./../api/receivers/cartReceiver.php?action=${action}`, "GET")

    if(cart) {
        cart = JSON.parse(cart)
    } else { 
        cart = []
    }

    return cart
}


// Renderar ut produkterna som ligger i carten 
async function renderCart() {

    let cart = await getCart()

    const main = document.getElementsByTagName("main")[0]

    main.innerHTML = "";

    let cartContainer = document.createElement("div")
    cartContainer.classList.add("cartContainer")

    main.append(cartContainer)

    for (let i = 0; i < cart.length; i++) {
        
        const cartItem = cart[i];

        let itemContainer = document.createElement("div")
        itemContainer.classList.add("itemContainer")

        let image = document.createElement("img")
        image.classList.add("cartItemImage")
        image.src = "./../assets/" + cartItem.product.image


        let infoContainer = document.createElement("div")
        infoContainer.classList.add("infoContainer")

        let title = document.createElement("h2")
        title.classList.add("title")
        title.innerHTML = cartItem.product.name;

        let unitPrice = document.createElement("p")
        unitPrice.innerHTML = cartItem.product.unitPrice + " €";
        
        let priceContainer = document.createElement("div")
        priceContainer.classList.add("priceContainer")

        let ajustQty = document.createElement("div")
        ajustQty.classList.add("ajustQty")

        let deleteQty = document.createElement("div")
        deleteQty.classList.add("ajustBoxes")
        deleteQty.innerText = "-"
        deleteQty.addEventListener("click", () => {deleteItem(cartItem)})

        let addQty = document.createElement("div")
        addQty.classList.add("addQty")
        addQty.classList.add("ajustBoxes")
        addQty.innerText = "+"
        addQty.addEventListener("click", () => {addItem(cartItem)})

        let unitQty = document.createElement("p")
        unitQty.innerHTML = cartItem.quantity + " pcs"

        let totalPrice = document.createElement("p")
        totalPrice.classList.add("totalpriceItem")
        totalPrice.innerHTML = cartItem.quantity * cartItem.product.unitPrice + " €"


        // Jämför antalet i unitsinstock med det vi lagt till i carten. Om det inte finns mer tillgängligt i unitsinstock så tas plustecknet bort.
        cart.findIndex((shoppingCart) => { 

            if(shoppingCart.product.productId == cartItem.product.productId) {
                 
                if(shoppingCart.quantity >= cartItem.product.unitsInStock) {

                    addQty.classList.add("noClick")
                    
                    return
                }

                addQty.classList.remove("noClick")
               
            }

        })

        cartContainer.append(itemContainer)
        itemContainer.append(image, infoContainer, priceContainer)
        infoContainer.append(title, unitPrice)
        priceContainer.append(ajustQty, totalPrice)
        ajustQty.append(deleteQty, unitQty, addQty)

    }


    let totalSum = cart.reduce((sum,item) => sum + item.product.unitPrice * item.quantity, 0);

    let summaryContainer = document.createElement("div")
    summaryContainer.classList.add("summaryContainer")

    
    let courriers = await getCourrier();
    let courrierForm = document.createElement("form")
    
    for (let i = 0; i < courriers.length; i++) {
        const courrierCompany = courriers[i];

        let radioButton = document.createElement("input")
        radioButton.classList.add("radioButton")
        radioButton.setAttribute("type", "radio")
        radioButton.setAttribute("value", courrierCompany.Id)
        radioButton.setAttribute("name", "selectCourrier")


        let courrierName = document.createElement("label")
        courrierName.innerText = courrierCompany.courrierName

        courrierForm.append(radioButton, courrierName)
        
    }


    let orderSummary = document.createElement("p")
    orderSummary.classList.add("orderSummary")
    orderSummary.innerHTML = "Order summary: " +  totalSum + " €"

    main.append(summaryContainer)
    summaryContainer.append(courrierForm, orderSummary)

}



async function getCourrier() {

    const action = "getAll"

    let courrier = await makeRequest(`./../api/receivers/courrierReceiver.php?action=${action}`, "GET")

    return courrier
}



// Tar bort 1 st från produkten om du klickar på "-", samt ta bort hela produkten om den har 1 st. Avslutar med att skicka den nya versionen av carten till SESSION.
async function deleteItem(cartItem) {

    let cart = await getCart()

    for (let i = 0; i < cart.length; i++) {

        let myCart = cart[i]

        if (cartItem.product.productId == myCart.product.productId) {
            
            if(myCart.quantity == 1) {
                cart.splice(i, 1);
            } else {
                myCart.quantity--
            } 

            const deleteQty = "updateCart"

            var body = new FormData()
            body.append("action", deleteQty)
            body.append("cart", JSON.stringify(cart))
         
            await makeRequest(`./../api/receivers/cartReceiver.php`, "POST", body)

            renderCart();
            printNrOfElements();
        }  
    }   
}










// Lägger till 1 st på produkten om du klickar på "+". Avslutar med att skicka den nya versionen av carten till SESSION.

async function addItem(cartItem) {
    
    let cart = await getCart()
    
    for (let i = 0; i < cart.length; i++) {

        let myCart = cart[i]

        if(cartItem.product.productId == myCart.product.productId) {
            
            myCart.quantity++
        }
            
        const addQty = "updateCart"

        var body = new FormData()
        body.append("action", addQty)
        body.append("cart", JSON.stringify(cart))
    
        await makeRequest(`./../api/receivers/cartReceiver.php`, "POST", body)

    }

    printNrOfElements();
    renderCart();
}





window.addEventListener('load', onLoad)
