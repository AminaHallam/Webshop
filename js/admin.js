import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    await showCorrectLayout();
}

verifyAdmin();
getAllCategories();
getUser();

document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut)



window.addEventListener('load', onLoad)