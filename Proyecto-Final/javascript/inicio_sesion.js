import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';

document.addEventListener('DOMContentLoaded', function() {
    const btnInicio = document.getElementById('boton_inicio');
    btnInicio.addEventListener('click', async function(event) {
        event.preventDefault();

    const email = document.querySelector("#inicio_email").value;
    const password = document.querySelector("#password").value;

    try {
        const credenciales = await signInWithEmailAndPassword(auth, email, password);
        console.log(credenciales);
        showMessage("¡Bienvenido, " + credenciales.user.email + "!");
        const uid = credenciales.user.uid;
        localStorage.setItem('userID', uid);
        console.log(uid)
        showMessage("¡Bienvenido, " + credenciales.user.email + "!");
        window.location.href = "/index.html";
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
});