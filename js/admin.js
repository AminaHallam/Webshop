import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    await showCorrectLayout();
}

makeRequest();
verifyAdmin();
getAllCategories();
getUser();

document.getElementById("menu").addEventListener("click", openMenu);




window.addEventListener('load', onLoad)