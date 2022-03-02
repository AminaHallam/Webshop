import {openMenu, getAllCategories, burger} from '.././helperFunctions/renderHelper.js'
import {makeRequest, getUser, showCorrectLayout, logOut, printNrOfElements} from '.././helperFunctions/fetchHelper.js'  // checka verifyadmin

document.querySelector(".logOut").addEventListener("click", logOut)

async function onLoad() {
    await getUser();
    await showCorrectLayout();
    await printNrOfElements();
    await getAllCategories();
    burger()
}


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


    let getLoggedInUser = await getUser(); 
   
    if(getLoggedInUser){
        var body = new FormData()
        body.append("action", action)
        
        let status = await makeRequest(`./../api/receivers/subscriptionNewsReceiver.php`, "POST", body)

        if(!status) {
            alert("You are already a subscriber")
        } else {

            alert("Welcome our new subscriber")

        }


    } else {
        
        let checkSubscription = await makeRequest(`./../api/receivers/subscriptionNewsReceiver.php`, "POST", body)
        
        if(!checkSubscription) {

            alert("You are already a subscriber")
    
         } else { 

             alert("Welcome our new subscriber")

         }
    
    }

 

}




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

