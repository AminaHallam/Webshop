import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, showCorrectLayout, logOut, printNrOfElements, getAllProducts} from './../helperFunctions/fetchHelper.js'

async function onLoad() {
    await showCorrectLayout();
    await printNrOfElements();
    await whichPageToDisplay();
    await getAllCategories();
    await renderSubscribers();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    myprofilePage(id);
    burger();
}

function burger() {

    const hamburger = document.querySelector(".hamburgerMenu");
    const menu = document.querySelector(".contactDiv");
    
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        menu.classList.toggle("active");
    
    });
}

async function getAllLoggedInSubscribers(){

    const action = "getAllLoggedInSubscribers";

    let allSubscribers = await makeRequest(`./../api/receivers/subscriptionNewsReceiver.php?action=${action}`, "GET")
    return allSubscribers;

} 

document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut);
document.getElementById("sendNews").addEventListener("click", addSubscriptionNews); 




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


    }else{
        
        let checkSubscription = await makeRequest(`./../api/receivers/subscriptionNewsReceiver.php`, "POST", body)
        
        if(!checkSubscription) {

            alert("You are already a subscriber")
    
         } else { 

             alert("Welcome our new subscriber")

         }
    
    }

}


async function whichPageToDisplay() {
    
    const main = document.getElementsByTagName("main")[0];
    
    let checkAdmin = await verifyAdmin();

    if(checkAdmin) {
        
        document.querySelector(".adminLayout").classList.remove("none")
        getUnitsInStock()

   } else {
        document.querySelector(".adminLayout").classList.add("none")

       let titleKund = document.createElement("h1")
       titleKund.innerText ="Welcome to my pages!" 
       main.appendChild(titleKund)

       
   } 

}

    //Hämtar ut alla ordrar
    async function myprofilePage() {
    const action = "getAll";
    let order = await makeRequest(`./../api/receivers/orderReceiver.php?action=${action}`, "GET");
  
    renderOrders(order);
    
  }






async function renderOrders(list) {
    let bigContainer = document.getElementsByClassName("overviewOrders")[0];
  
    let headers = [
      "Id",
      "StatusId",
      "UserId",
      "CourrierId",
      "Reg-Date",
      "Ship-Date",
      "Rec-Date",
      ""
    ];
  
    let headerRow = document.createElement("div");
    headerRow.classList.add('containerForOrders')
    bigContainer.appendChild(headerRow);
  
    headers.forEach((headerText) => {
      let orderHeader = document.createElement("div");
      orderHeader.classList.add('orderHeader')
      orderHeader.innerText = headerText;
      headerRow.appendChild(orderHeader);
    });
  
  
    for (let i = 0; i < list.length; i++) {
      const order = list[i];
      let row = document.createElement('div')
      row.classList.add('row')
      const orderValues = Object.values(order);
      let orderButton = document.createElement('button')
      orderButton.classList.add('orderButton')
      orderButton.innerText = "To Order"
      
      for (let i = 0; i < orderValues.length; i++) {
        const orderDetail = orderValues[i]
        let cell = document.createElement('div')
        cell.classList.add('cell')

        cell.innerText = orderDetail

        row.appendChild(cell)
        row.appendChild(orderButton)
      }
      bigContainer.appendChild(row)
    } 
  
}






// Update product buttons/links
document.querySelector(".updateProductButton").addEventListener("click", setQuantity)
document.querySelector(".deleteQtyProductButton").addEventListener("click", () => {
    let deleteUnits =  document.querySelector(".deleteUnits").value
    deleteQuantity(deleteUnits)})

document.querySelector(".addQtyProductButton").addEventListener("click", () => {
    let addUnits =  document.querySelector(".addUnits").value
    addQuantity(addUnits)})



// Collapse toggle
document.querySelector(".toggle").addEventListener("click", () => {
    let updateProduct = document.querySelector(".updateProduct")
    updateProduct.classList.toggle("menu")
})
document.querySelector(".toggle2").addEventListener("click", () => {
    let addQtyProduct = document.querySelector(".addQtyProduct")
    addQtyProduct.classList.toggle("menu")
})
document.querySelector(".toggle3").addEventListener("click", () => {
    let deleteQtyProduct = document.querySelector(".deleteQtyProduct")
    deleteQtyProduct.classList.toggle("menu")
})





async function getUnitsInStock() {

    let getProduct = document.querySelector(".getProduct")

    let products = await getAllProducts()
    let overviewProduct = document.createElement("div")
    overviewProduct.classList.add("overviewProduct")

    document.querySelector(".getProductButton").addEventListener("click", () => {
        
        overviewProduct.innerHTML = "";

        let productId =  document.querySelector(".productId").value
        
        for (let i = 0; i < products.length; i++) {
        
            const product = products[i];
    
            if(product.Id == productId) {
    
                let infoProductContainer = document.createElement("div")
                infoProductContainer.classList.add("infoProductContainer")
                let pId = document.createElement("p")
                let pName = document.createElement("p")
                let pQty = document.createElement("p")
                let pImage = document.createElement("img")
                pImage.classList.add("pImage")
    
                pId.innerText = "Id: " + product.Id
                pName.innerText = "Name: " + product.name
                pQty.innerText = "Current Qty: " + product.unitsInStock
                pImage.src = "./assets/" + product.image
    
                getProduct.append(overviewProduct)
                overviewProduct.append(pImage, infoProductContainer)
                infoProductContainer.append(pId, pName, pQty)
            }
        }
    })
}




async function setQuantity() {

    let updateUnits =  document.querySelector(".updateUnits").value
    let productId =  document.querySelector(".productId").value

    let action = "setQuantity"

    let myData = new FormData()
    myData.append("action", action)
    myData.append("newValue", updateUnits)
    myData.append("productId", productId)

    let updateUnitsInStock = await makeRequest("./../api/receivers/productReceiver.php", "POST", myData)

    if(updateUnitsInStock == true) { 
        alert("Sucess!"). 

        location.reload();

    } else {
        alert("Product not updated")
    }
}



async function addQuantity(value) {
    console.log(value)
    let productId =  document.querySelector(".productId").value

    let body = new FormData()
    body.append("action", "addQuantity")
    body.append("value", value)
    body.append("productId", productId)

    let result = await makeRequest("./../api/receivers/productReceiver.php", "POST", body)

    if(result == true) { 
        alert("Sucess!")

        location.reload();

    } else {
        alert("Product not updated")
    }
}

async function deleteQuantity(value) {
    console.log(value)
    let productId =  document.querySelector(".productId").value

    let body = new FormData()
    body.append("action", "deleteQuantity")
    body.append("value", value)
    body.append("productId", productId)

    let result = await makeRequest("./../api/receivers/productReceiver.php", "POST", body)

    if(result == true) {
        alert("Sucess!")

        location.reload();

    } else {
        alert("Product not updated")
    }
}




async function renderSubscribers() {

const renderSubList = await getAllLoggedInSubscribers();

for (let i = 0; i < renderSubList.length; i++) {
    
    const subList = renderSubList[i];

    const allSubscribers = document.querySelector(".firstname");
    const emailCont = document.querySelector(".email")
    let firstNameDiv = document.createElement("div")
    firstNameDiv.classList.add("firstNameDiv")
    let firstName = document.createElement("p")
    firstName.classList.add("firstNameSub")
    firstName.innerText = subList.FirstName

    firstNameDiv.append(firstName)
    allSubscribers.append(firstNameDiv)


    let emailDiv = document.createElement("div")
    emailDiv.classList.add("emailDiv")
    let email = document.createElement("p")
    email.classList.add("emailSub")
    email.innerText = subList.Email 
    emailDiv.append(email)
    emailCont.append(emailDiv)

    }

}



document.querySelector('#sendNews').addEventListener('click', createNewsLetter)

async function createNewsLetter(e) {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;
    let success = document.querySelector('.success');
    
    const action = 'add'

    const newsletter = {
        Title: title, 
        Text: content
    }
        
    
    let body = new FormData()
    body.append('action', action)
    body.append("news", JSON.stringify(newsletter))
    

    let result = await makeRequest("./../api/receivers/newsletterReceiver.php", "POST", body)

    if(!result){
        success.innerHTML = "Something went wrong, please try again!"

    }else{
        success.innerHTML = "Your newsletter was succesfully created"
    }

}



window.addEventListener('load', onLoad)

