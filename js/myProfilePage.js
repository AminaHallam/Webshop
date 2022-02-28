import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest,  getUser, verifyAdmin, showCorrectLayout, logOut, printNrOfElements, getAllProducts, getProductFromId} from './../helperFunctions/fetchHelper.js'



async function onLoad() {
    await accountCheck();
    await showCorrectLayout();
    await printNrOfElements();
    await whichPageToDisplay();
    await getAllCategories();
    await renderSubscribers();

    //getOrderDetails(); 

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    myprofilePage(id);
    burger();
}

async function accountCheck() {

    let allowed = await getUser();

    if(!allowed) {

        location.href = "./../login.html";

        return
    }
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
        getProductWithCategory() 

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
        "Reg-Date",
        "Ship-Date",
        "Rec-Date",
        ""
    ];
    
    let headerRow = document.createElement("div");
    headerRow.classList.add('containerForOrders')
    bigContainer.appendChild(headerRow);
    
    headers.forEach((headerText, index, headers) => {
        let orderHeader = document.createElement("div");
        orderHeader.classList.add('orderHeader')
        orderHeader.classList.add('o'+index)
        orderHeader.innerText = headerText;
        headerRow.appendChild(orderHeader);
    });
    
    
    for (let i = 0; i < list.length; i++) {
        const order = list[i];
        let row = document.createElement('div')
        row.classList.add('row')
        const orderValues = Object.values(order);
        let orderButton = document.createElement('button')
        orderButton.addEventListener("click", () => {
            getOrderDetails(order.Id)
            
        })
        orderButton.classList.add('orderButton')
        orderButton.innerText = "To Order"
        orderValues.splice(6, 4) 
        orderValues.splice(2, 2) 

        
        
        for (let i = 0; i < orderValues.length; i++) {
            const orderDetail = orderValues[i]
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.classList.add('c'+i)
            
            cell.innerText = orderDetail
            
            row.append(cell, orderButton)
           
        }
        bigContainer.appendChild(row)
    } 
    
}


// render orderList By id 

async function getOrderDetails(id) {
    
    const action = "getById"; 
    
    let orderDetailsList = await makeRequest(`./../api/receivers/orderReceiver.php?action=${action}&id=${id}`, "GET"); 

    
    let showOrderDetail = document.querySelector(".orderDetail")
    showOrderDetail.innerText = "";
    showOrderDetail.classList.toggle("none")
    
    //let orderDetails = Object.entries(orderDetailsList)
    
    console.log(orderDetailsList)
    let leftBox = document.createElement("div")
    leftBox.classList.add("leftBox")

    let rightBox = document.createElement("div")
    rightBox.classList.add("rightBox")

    orderDetailsList.orderStatus.forEach(orderStatus => {
        leftBox.innerText = "Order with id: " + orderDetailsList.Id + " - " + orderStatus.Status 

        showOrderDetail.append(leftBox)
    });

    orderDetailsList.courrier.forEach(courrierList => {
        let courrierBox = document.createElement("div")
        courrierBox.classList.add("courrierBox")
        courrierBox.innerText = "Courrier: " + courrierList.courrierName
   
        leftBox.append(courrierBox)

    })

    orderDetailsList.products.forEach(productList => {
        let productBox = document.createElement("div")
        productBox.classList.add("productBox")
        productBox.innerHTML = "Product with id: " + productList.Id + "<br>" + " Name: " + productList.name + "<br>" +  " UnitPrice: " + productList.unitPrice + " € " + "<br>" + " Quantity: " + productList.quantity
    
        leftBox.append(productBox)
    })

    orderDetailsList.user.forEach(userList => {
    
        rightBox.innerHTML = "User id: " + userList.Id + "<br>" + " FirstName: " + userList.FirstName + "<br>" + " LastName: " + userList.LastName + "<br>" + " Email " + userList.Email + "<br>" + " Mobile: " + userList.MobileNumber + "<br>" + " Adress: " + userList.Street + "<br>" + " ZipCode: " + userList.ZipCode + "<br>" + " City: " + userList.City + "<br>" + " Country: " + userList.Country
    
        leftBox.append(rightBox)
    })

    showOrderDetail.append(rightBox)







  /*   for (let i = 0; i < orderDetails.courrier.length; i++) {
        const element = orderDetails[i];
        


    } */


  
    
}




// Update product buttons/links
document.querySelector(".updateProductButton").addEventListener("click", setQuantity)
document.querySelector(".deleteQtyProductButton").addEventListener("click", () => {
    let deleteUnits =  document.querySelector(".deleteUnits").value
    deleteQuantity(deleteUnits)})

document.querySelector(".addQtyProductButton").addEventListener("click", () => {
    let addUnits =  document.querySelector(".addUnits").value
    addQuantity(addUnits)})



// Collapse 
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

        if(!productId){
            alert("Product ID is missing, please try again");
            return
        }

        const product = products.find((product) => product.Id == productId)

        if(!product) {
            alert("Product does not exist")
            return
        }
        
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

    if(!productId){
        alert("Product ID is missing, please try again");
        return
    }
    if(!updateUnits){
        alert("Value is missing, please try again");
        return
    }

    let action = "setQuantity"

    let myData = new FormData()
    myData.append("action", action)
    myData.append("newValue", updateUnits)
    myData.append("productId", productId)

    let updateUnitsInStock = await makeRequest("./../api/receivers/productReceiver.php", "POST", myData)

    if(updateUnitsInStock == true) { 
        alert("Success!")

        location.reload();

    } else {
        alert("Product not updated")
    }
}



async function addQuantity(value) {

    let productId =  document.querySelector(".productId").value

    if(!productId){
        alert("Product ID is missing, please try again");
        return
    }

    let body = new FormData()
    body.append("action", "addQuantity")
    body.append("value", value)
    body.append("productId", productId)

    let result = await makeRequest("./../api/receivers/productReceiver.php", "POST", body)

    if(result == true) { 
        alert("Success!")

        location.reload();

    } else {
        alert("Product not updated")
    }
}

async function deleteQuantity(value) {

    let productId =  document.querySelector(".productId").value

    if(!productId){
        alert("Product ID is missing, please try again");
        return
    }

    let body = new FormData()
    body.append("action", "deleteQuantity")
    body.append("value", value)
    body.append("productId", productId)

    let result = await makeRequest("./../api/receivers/productReceiver.php", "POST", body)

    if(result == true) {
        alert("Success!")

        location.reload();

    } else {
        alert("Product not updated")
    }
}








    /* MODIFY CATEGORY */






// Collapse
document.querySelector(".toggle4").addEventListener("click", () => {
    let replaceCategory = document.querySelector(".replaceCategory")
    replaceCategory.classList.toggle("menu")
})
document.querySelector(".toggle5").addEventListener("click", () => {
    let addCategory = document.querySelector(".addCategory")
    addCategory.classList.toggle("menu")
})
document.querySelector(".toggle6").addEventListener("click", () => {
    let deleteCategory = document.querySelector(".deleteCategory")
    deleteCategory.classList.toggle("menu")
})




/* SELECT PRODUCT */
// ändra namn på denna sedan till typ getCategoryOptions
async function getProductWithCategory() {
    let getProductCategory = document.querySelector(".getProductCategory")
    let overview = document.createElement("div")
    overview.classList.add("overview")
    getProductCategory.append(overview)





    document.querySelector(".getProductWithCategoryButton").addEventListener("click", renderProductWithCategory) 
}


async function renderProductWithCategory() {

    let id =  document.querySelector(".getId").value

    if(!id){
        alert("Product ID is missing, please try again");
        return
    }

    let categories = await getCategoryWithProductId(id)
    let allProducts = await getAllProducts()

    const product = allProducts.find((product) => product.Id == id)

    if(!product) {
        alert("Product does not exist")
        return
    }

    if(!categories) {
        alert("No category was found")
    }

    let overview = document.querySelector(".overview")

    if(overview) {
        overview.innerHTML = "";
    }
   
    let infoProductContainer = document.createElement("div")
    infoProductContainer.classList.add("infoProductContainer")
    let pId = document.createElement("p")
    let pName = document.createElement("p")
    let pImage = document.createElement("img")
    pImage.classList.add("pImage")
    let category = document.createElement("p")
    category.innerText = "Category: "
    

    pId.innerText = "Id: " + product.Id
    pName.innerText = "Name: " + product.name
    pImage.src = "./assets/" + product.image

    overview.append(pImage, infoProductContainer)
    infoProductContainer.append(pId, pName, category)

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        let categoryName = document.createElement("p")
        categoryName.innerText = category.categoryName
        infoProductContainer.append(categoryName)
    }

    let selectList = document.querySelector("#addCategory")
    let selectListToBeReplaced = document.querySelector("#categoryToBeReplaced")
    let selectListNewCategory = document.querySelector("#newCategory")
    let selectListDelete = document.querySelector("#deleteCategory")

    selectList.innerHTML= "";
    selectListToBeReplaced.innerHTML= "";
    selectListNewCategory.innerHTML= "";
    selectListDelete.innerHTML= "";


    
    // Select Add Category
    let categoryList = await getCategories()
    
    for (let i = 0; i < categoryList.length; i++) {
        const listItem = categoryList[i];
        
        let option = document.createElement("option")
        option.innerText = listItem.categoryName
        option.setAttribute("value", listItem.Id) 
        selectList.append(option)

    }

    // Select Category to be replaced
    let categoryListProduct = await getCategoryWithProductId(id)

    for (let i = 0; i < categoryListProduct.length; i++) {
        
        const categoryItem = categoryListProduct[i];
        
        let option = document.createElement("option")
        option.innerText = categoryItem.categoryName
        option.setAttribute("value", categoryItem.Id) 
        selectListToBeReplaced.append(option)
    }

    // Select new category
    for (let i = 0; i < categoryList.length; i++) {
        const listItem = categoryList[i];
        
        let option = document.createElement("option")
        option.innerText = listItem.categoryName
        option.setAttribute("value", listItem.Id) 
        selectListNewCategory.append(option)

    }


    // Select Delete Category
    if(categoryListProduct.length == 1) {
        return
    }

    for (let i = 0; i < categoryListProduct.length; i++) {
        const categoryItem = categoryListProduct[i];
        
        let option = document.createElement("option")
        option.innerText = categoryItem.categoryName
        option.setAttribute("value", categoryItem.Id) 
        selectListDelete.append(option)
    }





}

async function getCategoryWithProductId(id) {

    let action = "getCategoryWithProductId"

    return await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}&id=${id}`, "GET")

}





/* ADD CATEGORY */

document.querySelector(".addCategoryButton").addEventListener("click", addCategoryToProduct) 

async function addCategoryToProduct() {

    let productId =  document.querySelector(".getId").value

    if(!productId){
        alert("Product ID is missing, please try again");
        return
    }
  
    let categoryId = document.querySelector("#addCategory").value
    
    if(!categoryId){
        alert("Please select a category to proceed");
        return
    }

    let currentCategories = await getCategoryWithProductId(productId)

    for (let i = 0; i < currentCategories.length; i++) {
        const currentCategory = currentCategories[i];
        
        if(currentCategory.Id == categoryId) {
            alert("Category already exists on product")
            return
        }
    }

    let action = "addCategoryToProduct"

    let body = new FormData()
    body.append("action", action)
    body.append("categoryId", categoryId)
    body.append("productId", productId)

    let result = await makeRequest("./../api/receivers/productInCategoryReceiver.php", "POST", body) 

    if(result) { 
        alert("Success!")

        location.reload();

    } else {
        alert("Product not updated")
        location.reload();
    }
}

async function getCategories() {
    const action = "getAll";

    let allCategories = await makeRequest(`./api/receivers/categoryReceiver.php?action=${action}`, "GET")

    return allCategories
    
}



/* DELETE CATEGORY */


document.querySelector(".deleteCategoryButton").addEventListener("click", deleteCategoryFromProduct) 

async function deleteCategoryFromProduct() {

    let productId =  document.querySelector(".getId").value
    let categoryId = document.querySelector("#deleteCategory").value

    if(!productId){
        alert("Product ID is missing, please try again");
        return
    }
    
    if(!categoryId){
        alert("Please select a category to proceed");
        return
    }

    let action = "deleteCategoryFromProduct"

    let body = new FormData()
    body.append("action", action)
    body.append("categoryId", categoryId)
    body.append("productId", productId)

    let result = await makeRequest("./../api/receivers/productInCategoryReceiver.php", "POST", body) 

    console.log(result)

    if(result) { 
        alert("Success!")

        location.reload();

    } else {
        alert("Product not updated")
        location.reload();
    } 

}



/* REPLACE CATEGORY */


document.querySelector(".replaceCategoryButton").addEventListener("click", categoryReplace) 

async function categoryReplace() {

    let categoryIdToBeReplaced = document.querySelector("#categoryToBeReplaced").value
    let newCategoryId = document.querySelector("#newCategory").value
    let productId =  document.querySelector(".getId").value

    if(!categoryIdToBeReplaced) {
        alert("please select a category you want to replace")
        return
    }

    if(!newCategoryId) {
        alert("please select new category")
        return
    }

    if(!productId) {
        alert("please select a product")
        return
    }

    let currentCategories = await getCategoryWithProductId(productId)

    for (let i = 0; i < currentCategories.length; i++) {
        const currentCategory = currentCategories[i];
        
        if(currentCategory.Id == newCategoryId) {
            alert("Category already exists on product")
            return
        }
    }

    let action = "replaceCategory"

    let body = new FormData()
    body.append("action", action)
    body.append("oldCategoryId", categoryIdToBeReplaced)
    body.append("newCategoryId", newCategoryId)
    body.append("productId", productId)

    let result = await makeRequest("./../api/receivers/productInCategoryReceiver.php", "POST", body) 

    console.log(result)

    if(result) { 
        alert("Success!")

        location.reload();

    } else {
        alert("Product not updated")
        location.reload();
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

