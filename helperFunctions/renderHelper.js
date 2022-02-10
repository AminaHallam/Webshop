
import {makeRequest} from './fetchHelper.js'

export function openMenu() {   
    document.getElementById("dropdown").classList.toggle("active");
} 

makeRequest();
/* Category */

/* Hämtar alla kategorier */
export async function getAllCategories() {
    const action = "getAll";
    let allCategories = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}`, "GET")
    
    
    for (let i = 0; i < allCategories.length; i++) {
        const element = allCategories[i];
        
        const ul = document.getElementById("dropdown");
        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")
        let title = document.createElement("a")
        title.href = 'collectionPage.html?id=' + element.categoryId
        title.innerHTML = element.categoryName; 
        ul.append(productContainer)
        productContainer.append(title)
        
        
    }  
    
    
}