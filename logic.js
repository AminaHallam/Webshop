

function onLoad() {
    //getAllProducts()
    //getProductFromId(1)
    getAllCategory();
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
        console.log(result)
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



//functions for category 

async function getAllCategory() {
    const action = "getAll";
    
    let allCategories = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}`, "GET")

    console.log(allCategories);
}




window.addEventListener('load', onLoad);