import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    await showCorrectLayout();
    getAllProducts();

}

makeRequest();
verifyAdmin();
getAllCategories();
getUser();

document.getElementById("menu").addEventListener("click", openMenu);


async function getAllProducts() {
    const action = "getAll";

    let allProducts = await makeRequest(`./api/receivers/productReceiver.php?action=${action}`, "GET")

    renderProducts(allProducts)
    
}


async function renderProducts(list){

    const main = document.getElementsByTagName("main")[0]; 

    
    if(list[0].categoryName) {

    let categoryContainer = document.createElement("div")
    categoryContainer.classList.add("categoryContainer")
    let category = document.createElement("h2")
    category.innerHTML = list[0].categoryName;
    
    main.appendChild(categoryContainer)
    categoryContainer.appendChild(category)

    }

    for (let i = 0; i < list.length; i++) {
        
        const element = list[i];

        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")
        let title = document.createElement("h2")
        title.innerHTML = element.name;
        let description = document.createElement("p")
        description.innerHTML = element.description;
        let unitPrice = document.createElement("p")
        unitPrice.innerHTML = element.unitPrice + " €";
        let image = document.createElement("img")
        image.src = "./assets/" + element.image
        image.addEventListener("click", () => {productPage(element)}) 

        main.append(productContainer)
        productContainer.append(title, description, unitPrice, image)
    }


}



window.addEventListener('load', onLoad)