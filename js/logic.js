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


document.getElementById("readMoreMyBtn").addEventListener("click", readMore);

function readMore() {
    const dots = document.getElementById("dots");
    const moreText = document.getElementById("more");
    const btnText = document.getElementById("readMoreMyBtn")
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
}



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



window.addEventListener('load', onLoad)

