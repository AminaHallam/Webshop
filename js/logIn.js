import { makeRequest } from "../helperFunctions/fetchHelper.js"

const logOut = document.querySelector(".logout")
const myPage = document.querySelector(".myPage")
const buttonCA = document.querySelector(".buttonCA")
const loginForm = document.querySelector("#login")
const createAccountForm = document.querySelector("#createAccount")


async function onLoad() {
    /* await verifyAdmin() */
    await showCorrectLayout();
    await getUser()
}


// Switching between Login-form and create account-form
document.addEventListener("DOMContentLoaded", () => {

    // Clicking on the link - Login-form will appear and create account-form will dissapear
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault(); // e will prevent us going back to startpage when clicking on button
        loginForm.classList.add("hidden");
        createAccountForm.classList.remove("hidden");
    });

    // Clicking on the link - create account-form will appear and Login-form will dissapear
    document.querySelector("#linkLogIn").addEventListener("click", e => {
        e.preventDefault();  // e will prevent us going back to startpage when clicking on button
        loginForm.classList.remove("hidden");
        createAccountForm.classList.add("hidden");
    });
});


makeRequest();


/* Logga in */
document.querySelector(".button").addEventListener("click", loginUser)


async function loginUser(e) {
    e.preventDefault();

    const action = 'loginUser'; 

    let loginUser = document.querySelector("#inputUserName").value
    let loginPassword = document.querySelector("#inputPassword").value

    let verify = await makeRequest(`./../api/receivers/userReceiver.php?action=${action}&user=${loginUser}&password=${loginPassword}`, "GET")

    if(!verify) {
        alert("Wrong credentials")
        return
    }
    alert("You are in!")
    
  /*   let checkAdmin = await verifyAdmin();

    console.log(checkAdmin);

     if(checkAdmin) {
        myAdmin();
    } else {
        myPages();
    }  */

    // If session är true skicka adminsida, if false skicka till kundsida

    /* window.location.href = "./../index.html"; */

}


async function verifyAdmin() {
    const action = 'verifyAdmin'; 
    let verifyA = await makeRequest(`./../api/receivers/userReceiver.php?action=${action}`, "GET")
    console.log(verifyA)
    return verifyA    
}


// Hämta användarinfo från SESSION vid inloggad användare.
async function getUser() {
    const action = 'getUser'; 
    let getUser = await makeRequest(`./../api/receivers/userReceiver.php?action=${action}`, "GET")
    
     console.log(getUser) 
}


async function myAdmin() {
    console.log("Kom in admin");

    document.querySelector(".adminSetting").classList.remove("none");
    /* window.location.href = "./../index.html"; */
}

async function myPages() {
    console.log("Kom in page");
    window.location.href = "./../index.html"; 
} 

// 10/2 Få det att stanna kvar på sidan 

async function showCorrectLayout() {
    let checkAdmin = await verifyAdmin();
    console.log(checkAdmin);

     if(checkAdmin) {
        console.log("shoo");/* myAdmin(); */
    } else {
        console.log("hejdå");/* myPages(); */
    } 
}

/* Register account - View */
document.querySelector(".buttonCA").addEventListener("click", () => {
    
    // Fetch values from register account-forms
    let registerUser = document.querySelector("#user").value
    let registerPassword = document.querySelector("#pw").value
    let confirmPassword = document.querySelector("#confirmPw").value
  
    // Call functions to check if the credentials are good enough before we send them to PHP
    const isValid = validateInputs(registerUser, registerPassword) 
    const validPw = validatePasswords(registerPassword, confirmPassword)
    const inputPwUser = sameInputs(registerUser, registerPassword)
  
    
    /* If all these are true, the credentials  will be sent to PHP */
    
    // if username or password has less than 6 characters
    if(!isValid) {
        alert("You need to use more than 5 characters")
        return
    }
    
    // If username and password are the same
    if(!inputPwUser) {
        alert("Username and password can't be the same. You can do better :) ")
        return
    }

    // If the password inputs doesnt match:
    if(!validPw){
    alert("Passwords doesn't match. Try again")
    return
    }


  
    /* 
    * Gör funktioner som checkar våra krav på initialerna innan vi skickar dem till PHP. CHECK!

    * Skicka in värdena i requests. Tror vi behöver två stycken. En där vi checkar om email redan finns i databasen och en där vi lägger till användaren i databasen. 

    * Vi behöver göra en hashning på lösenorden. Men få det andra att funka först*/


})




/* Functions to register account */


// Check if the inputs have 6 or more characters     
function validateInputs(username, password) {
    if(username.length >= 6 && password.length >= 6){
        return true
    }
        return false
}

// Check if the input of both passwords are matching
function validatePasswords(password, confPassword){

    if(password == confPassword) {
        return true
    }
        return false
}

// Check if username and password are the same
function sameInputs(username, password){
    if(username == password) {
        return false
    }
        return true
}


window.addEventListener("load", onLoad);
