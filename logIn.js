const logOut = document.querySelector(".logout")
const myPage = document.querySelector(".myPage")
const buttonCA = document.querySelector(".buttonCA")
const loginForm = document.querySelector("#login")
const createAccountForm = document.querySelector("#createAccount")

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


document.querySelector(".button").addEventListener("click", () => {
    let loginUser = document.querySelector("#inputUserName").value
    console.log(loginUser)
    let loginPassword = document.querySelector("#inputPassword").value
    console.log(loginPassword)
    

})