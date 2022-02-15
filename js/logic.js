import {openMenu, getAllCategories} from '.././helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut, printNrOfElements} from '.././helperFunctions/fetchHelper.js'

document.querySelector(".logOut").addEventListener("click", logOut)

async function onLoad() {
    await getUser();
    await showCorrectLayout();
    await printNrOfElements();
}

makeRequest();
getAllCategories();
verifyAdmin();
getUser();


document.getElementById("menu").addEventListener("click", openMenu);
  
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

