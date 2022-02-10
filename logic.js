
function onLoad() {
    
    getAllCategories() 
    
    
}

document.getElementById("menu").addEventListener("click", openMenu);

// document.querySelector("#all").addEventListener("click", getAllProducts); 


    
    function openMenu() {
        
        document.getElementById("dropdown").classList.toggle("active");
        
    }
    
    
    
    async function makeRequest(url, method, body) {
        try {
            let response = await fetch(url, {
                method,
                body
            })
            let result = await response.json();
            
            return result
        } catch(err) {
            console.error(err)
        }
    }
    

    
    
    
    
  /*   async function getProductFromId(id) {
        const action = 'getById'; 
        
        let specificProduct = await makeRequest(`./../api/receivers/productReceiver.php?action=${action}&id=${id}`, "GET")
        // console.log(specificProduct)
        console.log(specificProduct)

       
    }
     */




/* Category */

/* Hämtar alla kategorier */
async function getAllCategories() {
    const action = "getAll";
    let allCategories = await makeRequest(`./../api/receivers/categoryReceiver.php?action=${action}`, "GET")
    
    
    for (let i = 0; i < allCategories.length; i++) {
        const element = allCategories[i];
        
        const ul = document.getElementById("dropdown");
        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")
        let title = document.createElement("a")
        title.href = 'collectionPage.html?id=' + element.categoryId
        title.innerHTML = element.categoryName; 
        ul.append(productContainer)
        productContainer.append(title)
        
        
    }  
    
    
}



/* async function renderCategory(list){
    for (let i = 0; i < list.length; i++) {
        
        const element = list[i];
        const main = document.getElementsByTagName("main")[0];
        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")
        let title = document.createElement("h2")
        title.innerHTML = element.categoryName;  
        main.append(productContainer)
        productContainer.append(title)

    
}

} */
    




window.addEventListener('load', onLoad)