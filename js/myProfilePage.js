import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut, printNrOfElements} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    await showCorrectLayout();
    await printNrOfElements();
    whichPageToDisplay()
}

getAllCategories();
verifyAdmin();
getUser();

document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut)



async function whichPageToDisplay() {
    
    const main = document.getElementsByTagName("main")[0];
    
    let checkAdmin = await verifyAdmin();

    if(checkAdmin) {
        let titleAdmin = document.createElement("h1") 
        titleAdmin.innerText ="Du har kommit till adminsidan!"
        main.appendChild(titleAdmin)

   } else {
       let titleKund = document.createElement("h1")
       titleKund.innerText ="Du har kommit till kundsidan!" 
       main.appendChild(titleKund)
   } 

}






window.addEventListener('load', onLoad)