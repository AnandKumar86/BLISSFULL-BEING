document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById("sign-up-btn");
    const signInButton = document.getElementById("sign-in-btn");
    const container = document.querySelector(".container");
    
    signUpButton.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
    
    signInButton.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  
   
    const signInForm = document.querySelector(".sign-in-form");
    const signUpForm = document.querySelector(".sign-up-form");
  
    signInForm.addEventListener("submit", (event) => {
      event.preventDefault();
   
      window.location.href = "profile.html"; 
    });
  
    signUpForm.addEventListener("submit", (event) => {
      event.preventDefault();
     
      window.location.href = "profile.html"; 
    });
  });
  