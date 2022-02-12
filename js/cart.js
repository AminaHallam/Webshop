import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    accountCheck();
    await getUser();
    await showCorrectLayout();
    
}

makeRequest();
verifyAdmin();
getAllCategories();
getUser();

document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut)





// Om du inte är inloggad så skickas du till loginsidan. 
async function accountCheck() {

    console.log("kommer in i accountcheck")

    let allowed = await getUser();

    if(!allowed) {

        alert("Log in or register an account to proceed")

        location.href = "./../login.html";

        return
    }

}


window.addEventListener('load', onLoad)