import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';

const sesion = document.querySelector("#formulario_inicio_sesion");

sesion.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = sesion.querySelector("#email1").value;
  const password = sesion.querySelector("#password1").value;

  try {
    const credenciales = await signInWithEmailAndPassword(auth, email, password);
    console.log(credenciales);
    const modal = bootstrap.Modal.getInstance(sesion.closest('.modal'));
    modal.hide();
    sesion.reset();
    showMessage("¡Bienvenido, " + credenciales.user.email + "!");
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      showMessage("Credenciales no válidas", "error");
    }
    else if (errorCode==='auth/invalid-email'){
      showMessage("Correo no valido", "error")
    }    
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    console.log(errorCode)
  }
 
});
