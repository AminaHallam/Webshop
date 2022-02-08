

function onLoad() {
    getAllProducts()
    getProductFromId(1)
    getAllCategories()
    getCategoryFromId(3)
}

document.getElementById("menu").addEventListener("click", openMenu);

 
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


// functions for product
async function getAllProducts() {
    const action = "getAll";

    let allProducts = await makeRequest(`./api/receivers/productReceiver.php?action=${action}`, "GET")
    console.log(allProducts)
}


async function getProductFromId(id) {
    const action = 'getById'; 
    

    let specificProduct = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}&id=${id}`, "GET")
    console.log(specificProduct)
}





/* Category */

/* Hämtar alla kategorier */
async function getAllCategories() {
    const action = "getAll";
    let allCategories = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}`, "GET")
    console.log(allCategories); 
}


/* Hämtar alla produkter som tillhör en specifik kategori */
async function getCategoryFromId(idToGet) {
    const action = "getById";
    let specificCategory = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}&id=${idToGet}`, "GET")
    console.log(specificCategory) 
}




window.addEventListener('load', onLoad);