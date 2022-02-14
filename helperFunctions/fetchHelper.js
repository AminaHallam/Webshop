// Gör en request till PHP
export async function makeRequest(url, method, body) {
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



/* User */


// Returnerar True/False beroende på om den som är inloggad är admin eller inte. 
export async function verifyAdmin() {
    const action = 'verifyAdmin'; 
    let verifyA = await makeRequest(`./../api/receivers/userReceiver.php?action=${action}`, "GET")
    /* console.log(verifyA) */
    return verifyA    
}

// Visar den rätta layouten beroende på om det är en kund eller admin som är inloggad. Om ingen är inloggad behålls den befintliga layouten.
export async function showCorrectLayout() {

    let checkIfInlogged = await getUser();

    if(!checkIfInlogged) {
        console.log("Ingen är inloggad")
        return
    }

    let checkAdmin = await verifyAdmin();

     if(checkAdmin) {
        console.log("Du är admin");

        document.querySelector(".adminSetting").classList.remove("none");

    } else {
        console.log("Du är en vanlig kund");

        document.querySelector(".adminSetting").classList.add("none");
    } 
}

// Hämta användarinfo från SESSION vid inloggad användare.
export async function getUser() {
    const action = 'getUser'; 
    let getUser = await makeRequest(`./../api/receivers/userReceiver.php?action=${action}`, "GET")
     /* console.log(getUser)  */
     return getUser
}

/* Order */

/* Hämtar alla ordrar */
export async function getAllOrders() {
    const action = "getAll";
    let allOrders = await makeRequest(`./../api/receivers/orderReceiver.php?action=${action}`, "GET")
    console.log(allOrders); 
}


/* Hämtar en order baserat på ett orderid */
export async function getOrderById(idToGet) {
    const action = "getById";
    let specificOrder = await makeRequest(`./../api/receivers/orderReceiver.php?action=${action}&id=${idToGet}`, "GET")
    console.log(specificOrder) 
}

/* Hämtar ordrar baserat på statusid eller userid */
export async function getOrdersByOtherId(idToGet, type) {
    const action = "getByOtherId";
    let specificOther = await makeRequest(`./../api/receivers/orderReceiver.php?action=${action}&id=${idToGet}&type=${type}`, "GET")
    console.log(specificOther) 
}







/* Product */

/* Hämtar alla produkter */
export async function getAllProducts() {
    const action = "getAll";

    let allProducts = await makeRequest(`./api/receivers/productReceiver.php?action=${action}`, "GET")
    console.log(allProducts)
}


/* Hämtar en produkt baserat på ett produktid */
export async function getProductFromId(id) {
const action = 'getById'; 

let specificProduct = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}&id=${id}`, "GET")

console.log(specificProduct)

}
     