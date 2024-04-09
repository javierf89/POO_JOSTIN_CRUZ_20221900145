import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const googleButton = document.querySelector("#googlelogin");

googleButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const provider = new GoogleAuthProvider();
  try {
    const credenciales = await signInWithPopup(auth, provider)
    console.log(credenciales);
    console.log("google sign in");
    
   
    const modalInstance = bootstrap.Modal.getInstance(googleButton.closest('.modal'));
    modalInstance.hide();
    showMessage("¡Bienvenido, " + credenciales.user.displayName);
  } catch (error) {
    console.log(error);
  }
});