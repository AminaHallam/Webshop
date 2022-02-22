import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, showCorrectLayout, logOut, printNrOfElements, getAllProducts} from './../helperFunctions/fetchHelper.js'


async function onLoad() {
    await showCorrectLayout();
    await printNrOfElements();
    await whichPageToDisplay();
    await getAllCategories();

    await getorderDetails(133)
}



document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut);



async function whichPageToDisplay() {
    
    const main = document.getElementsByTagName("main")[0];
    
    let checkAdmin = await verifyAdmin();

    if(checkAdmin) {
        
        document.querySelector(".adminLayout").classList.remove("none")
        getUnitsInStock()

   } else {
        document.querySelector(".adminLayout").classList.add("none")

       let titleKund = document.createElement("h1")
       titleKund.innerText ="Du har kommit till kundsidan!" 
       main.appendChild(titleKund)

       
   } 

}






/* Update quantity on product */



// Get product
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






// Update product buttons/links
document.querySelector(".updateProductButton").addEventListener("click", setUnitsInStock)
document.querySelector(".deleteQtyProductButton").addEventListener("click", () => {
    let deleteUnits =  document.querySelector(".deleteUnits").value
    updateUnitsInStock("-", deleteUnits)})

document.querySelector(".addQtyProductButton").addEventListener("click", () => {
    let addUnits =  document.querySelector(".addUnits").value
    updateUnitsInStock("+", addUnits)})




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


// Set quantity on product
async function setUnitsInStock() {

    let updateUnits =  document.querySelector(".updateUnits").value
    let productId =  document.querySelector(".productId").value

    let action = "setUnitsInStock"

    let myData = new FormData()
    myData.append("action", action)
    myData.append("newValue", updateUnits)
    myData.append("productId", productId)

    let updateUnitsInStock = await makeRequest("./../api/receivers/productReceiver.php", "POST", myData)

    if(updateUnitsInStock) {
        alert("Sucess!")

        location.reload();

    } else {
        alert("Product not updated")
    }
}



// Update quantity on product (add/Delete)
async function updateUnitsInStock(direction, value) {

    let productId =  document.querySelector(".productId").value

    let body = new FormData()
    body.append("action", "updateUnitsInStock")
    body.append("direction", direction)
    body.append("value", value)
    body.append("productId", productId)

    let result = await makeRequest("./../api/receivers/productReceiver.php", "POST", body)

    console.log(result)

    if(result) {
        alert("Sucess!")

        location.reload();

    } else {
        alert("Product not updated")
    }
}










async function getorderDetails(id) {

    const action = "getorderDetails"

    let result = await makeRequest(`./../api/receivers/orderReceiver.php?action=${action}&id=${id}`, "GET")
    console.log(result)
}

window.addEventListener('load', onLoad)