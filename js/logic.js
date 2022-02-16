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
document.getElementById("submitClick").addEventListener("click", addSubscriptionNews)


async function addSubscriptionNews(e) {
    e.preventDefault();
    const action = "addSubscriptionNews";
    
    let registerFirstname = document.getElementById("firstNameNews").value
    let registerEmail = document.getElementById("emailNews").value

    const subscriber = {
        FirstName: registerFirstname,
        Email: registerEmail,
    }
    
    var body = new FormData()
    body.append("action", action)
    body.append("subscriber", JSON.stringify(subscriber))
    

    let status = await makeRequest(`./../api/receivers/subscriptionNewsReceiver.php`, "POST", body)
    console.log(status) 

}



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

