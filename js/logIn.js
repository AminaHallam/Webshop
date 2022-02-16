import {openMenu, getAllCategories} from './../helperFunctions/renderHelper.js'
import {makeRequest, verifyAdmin, getUser, showCorrectLayout, logOut, printNrOfElements} from './../helperFunctions/fetchHelper.js'

const myPage = document.querySelector(".myPage")
const buttonCA = document.querySelector(".buttonCA")
const loginForm = document.querySelector("#login")
const createAccountForm = document.querySelector("#createAccount")


async function onLoad() {
    await showCorrectLayout();
    await printNrOfElements();
}


verifyAdmin();
getAllCategories();
getUser();

document.getElementById("menu").addEventListener("click", openMenu);
document.querySelector(".logOut").addEventListener("click", logOut)


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

    location.href = "./../index.html";

}




/* Register account - View */
document.querySelector(".buttonCA").addEventListener("click", registerAccount)


async function registerAccount(e) {
e.preventDefault();

    
    // Fetch values from register account-forms
    let registerFirstname = document.querySelector("#firstname").value
    let registerLastname = document.querySelector("#lastname").value
    let registerStreet = document.querySelector("#street").value
    let registerCO = document.querySelector("#co").value
    let registerZipcode = document.querySelector("#zipcode").value
    let registerCity = document.querySelector("#city").value
    let registerCountry = document.querySelector("#country").value
    let registerCountrycode = document.querySelector("#countrycode").value
    let registerMobilenumber = document.querySelector("#mobilenumber").value
    let registerStandardphone = document.querySelector("#standardphone").value
    let registerEmail = document.querySelector("#user").value
    let registerPassword = document.querySelector("#pw").value
    let confirmPassword = document.querySelector("#confirmpw").value
    
    
    // Call functions to check if the credentials are good enough before we send them to PHP
    const isValid = validateInputs(registerPassword) 
    const validPw = validatePasswords(registerPassword, confirmPassword)
    const inputPwUser = sameInputs(registerEmail, registerPassword)
    
    
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
    
    const action = 'addUser'; 

    let emailCheck = await makeRequest(`./../api/receivers/userReceiver.php?action=${action}&user=${registerEmail}`, "GET")
    if (!emailCheck) {
        alert("Kontot finns redan")
        return 
    }





    //POST till userReciever
    const userToAdd = {
        FirstName: registerFirstname,
        LastName: registerLastname,
        Street: registerStreet,
        CO: registerCO,
        ZipCode: registerZipcode,
        City: registerCity,
        Country: registerCountry,
        Email: registerEmail,
        CountryCode: registerCountrycode,
        MobileNumber: registerMobilenumber,
        StandardPhone: registerStandardphone,
        Password: registerPassword,
        Admin: false,
        TermsOfPurchase: true
    }
    
    var myData = new FormData();
    myData.append("endpoint", "addUser");
    myData.append("addUser", JSON.stringify(userToAdd))
    console.log(userToAdd)

    let addUser = await makeRequest("./../api/receivers/userReceiver.php", "POST", myData)
    console.log(addUser)

    if(addUser) {
        alert("Ditt konto är skapat!")
        loginForm.classList.remove("hidden");
        createAccountForm.classList.add("hidden");
        return
    }

    alert("Något gick fel")



}


    /* 
    * Gör funktioner som checkar våra krav på initialerna innan vi skickar dem till PHP. CHECK!

    * Skicka in värdena i requests. Tror vi behöver två stycken. En där vi checkar om email redan finns i databasen och en där vi lägger till användaren i databasen. 

    * Vi behöver göra en hashning på lösenorden. Men få det andra att funka först*/


/* Functions to register account */


// Check if the inputs have 6 or more characters     
function validateInputs(password) {
    if(password.length >= 6){
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


