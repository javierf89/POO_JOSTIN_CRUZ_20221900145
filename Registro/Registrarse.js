import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';
document.addEventListener("DOMContentLoaded", function() {
    const formularioRegistrarse = document.querySelector("#formulario_registrarse");

    formularioRegistrarse.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Obtener los valores de los campos de correo electrónico y contraseña
        const email2 = formularioRegistrarse.querySelector('#email2').value;
        const password2 = formularioRegistrarse.querySelector('#password2').value;

        try {
            // Intentar crear un nuevo usuario con Firebase Authentication
            const credenciales = await createUserWithEmailAndPassword(auth, email2, password2);
            console.log(credenciales);

            const signupModal = document.querySelector('#Registrarse');
            const modal = bootstrap.Modal.getInstance(signupModal);
            modal.hide();
            formularioRegistrarse.reset();
            showMessage("¡Bienvenido, " + credenciales.user.email + "!");
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                showMessage("El correo electrónico ya está en uso", "error")
              } else if (error.code === 'auth/invalid-email') {
                showMessage("Correo electrónico no válido", "error")
              } else if (error.code === 'auth/weak-password') {
                showMessage("Contraseña débil", "error")
              } else if (error.code) {
                showMessage("Algo salió mal", "error")
              }
        }
    });
});
