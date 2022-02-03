

function onLoad() {
    getAllProducts()
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

async function getAllProducts() {
    const action = "getAll";

    let allProducts = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}`, "GET")
    console.log(allProducts)
}


window.addEventListener('load', onLoad);