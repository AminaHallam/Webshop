function onLoad() {

    renderProductsFromCategory(2)


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






async function getCategoryFromId(idToGet) {

    const action = "getById";
    let specificCategory = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}&id=${idToGet}`, "GET")
    console.log(specificCategory) 

    for (let i = 0; i < specificCategory.length; i++) {
        const category = specificCategory[i]; 
        console.log(category)
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
    console.log(specificCategory) 

    
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

    
        main.append(productContainer)
        productContainer.append(title, description, unitPrice, image)

        

    }



}

window.addEventListener("load", onLoad)
