import {openMenu, getAllCategories, getAllCategoriesAsList} from '.././helperFunctions/renderHelper.js'
import {makeRequest} from '.././helperFunctions/fetchHelper.js'





function onLoad() {
   
}


document.getElementById("menu").addEventListener("click", openMenu);





makeRequest();
getAllCategories();






    
/*  Hämtar alla produkter som tillhör en specifik kategori
async function getCategoryFromId(idToGet) {
    const action = "getById";
    let specificCategory = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}&id=${idToGet}`, "GET")
    console.log(specificCategory, 'test') 
    console.log(specificCategory.categoryId)
    for(let i = 0; i < specificCategory.categoryId; i++){
        console.log(specificCategory.categoryId)
    }


    
}
 */


window.addEventListener('load', onLoad)

