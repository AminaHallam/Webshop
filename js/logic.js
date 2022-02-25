import {openMenu, getAllCategories} from '.././helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut, printNrOfElements} from '.././helperFunctions/fetchHelper.js'

document.querySelector(".logOut").addEventListener("click", logOut)

async function onLoad() {
    await getUser();
    await showCorrectLayout();
    await printNrOfElements();
    /* await getAllLoggedInSubscribers(); */
    await getAllCategories();
}

// bör ligga i funk, inte i globalt skop, await 
// sparas användare någonstans? 

/* verifyAdmin();
getUser(); */


// Hamburgermeny - lägg till på alla sidor!

const hamburger = document.querySelector(".hamburgerMenu");
const menu = document.querySelector(".contactDiv");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");

});




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
    
    // Mix av GET och POST
    var body = new FormData()
    body.append("action", action)
    body.append("subscriber", JSON.stringify(subscriber))


    let getLoggedInUser = await getUser(); 
   
    if(getLoggedInUser){
        var body = new FormData()
        body.append("action", action)
        
        let status = await makeRequest(`./../api/receivers/subscriptionNewsReceiver.php?action=${action}`, "POST", body)
        console.log(status) 

        if(!status) {
            alert("You are already a subscriber")
        } else {

            alert("Welcome our new subscriber")

        }


    } else {
        // Mix av GET och POST  
        let checkSubscription = await makeRequest(`./../api/receivers/subscriptionNewsReceiver.php?action=${action}`, "POST", body)
        console.log(checkSubscription)
        
        if(!checkSubscription) {

            alert("You are already a subscriber")
    
         } else { 

             alert("Welcome our new subscriber")

         }
    
    }

 

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

/* Kolla om man fortsätta på funktionen med att slida vidare  */

const slider = document.querySelector('.gallery');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});




window.addEventListener('load', onLoad)

