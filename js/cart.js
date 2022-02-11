import {makeRequest, verifyAdmin, getUser, showCorrectLayout} from '.././helperFunctions/fetchHelper.js'
import {openMenu, getAllCategories} from '.././helperFunctions/renderHelper.js'

async function onLoad() {
    await getUser();
    await showCorrectLayout();
}

makeRequest();
getAllCategories();
verifyAdmin();
getUser();


document.getElementById("menu").addEventListener("click", openMenu);

window.addEventListener('load', onLoad)