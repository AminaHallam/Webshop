import {openMenu, getAllCategories} from '.././helperFunctions/renderHelper.js'
import {makeRequest} from '.././helperFunctions/fetchHelper.js'



function onLoad() {
    
}


document.getElementById("menu").addEventListener("click", openMenu);



/* function openMenu() {   
    document.getElementById("dropdown").classList.toggle("active");
} 
     */

makeRequest();
getAllCategories();






/* async function renderCategory(list){
    for (let i = 0; i < list.length; i++) {
        
        const element = list[i];
        const main = document.getElementsByTagName("main")[0];
        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")
        let title = document.createElement("h2")
        title.innerHTML = element.categoryName;  
        main.append(productContainer)
        productContainer.append(title)

    
/* Hämtar alla produkter som tillhör en specifik kategori */
async function getCategoryFromId(idToGet) {
    const action = "getById";
    let specificCategory = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}&id=${idToGet}`, "GET")
    console.log(specificCategory) 


    
}


window.addEventListener('load', onLoad)