import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';
import { firestore } from './firebase.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"; // Agrega esta línea para importar setDoc

document.addEventListener('DOMContentLoaded', function() {
    const btnRegistrarse = document.getElementById('Registrarse');
    btnRegistrarse.addEventListener('click', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('newPassword-1').value;
        
        if (compararContraseñas()) {
            console.log('Contraseñas coinciden, procediendo con el registro...');
            try {
                const credenciales = await createUserWithEmailAndPassword(auth, email, password);
                console.log(credenciales);
                showMessage("¡Bienvenido, " + credenciales.user.email + "!");
              
                const uid = credenciales.user.uid;
                // Agregar el UID como identificador de documento en Firestore
                const nuevoDocRef = doc(firestore, 'usuarios', uid);
                const datos = {
                    uid: uid,
                    email: email,
                    
                };
                await setDoc(nuevoDocRef, datos); 
               
                console.log("Datos guardados correctamente:", nuevoDocRef.id); 
                localStorage.setItem('userID', uid);
                showMessage("¡Bienvenido, " + credenciales.user.email + "!");
                window.location.href = 'perfilusuario.html';
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
        } else {
            console.log('Las contraseñas no coinciden, por favor verifica.');

            // Mostrar mensaje de error
            showMessage("Las contraseñas no coinciden. Por favor, verifica.", "error");
        }
    });
});

function compararContraseñas() {
    const password1 = document.getElementById('newPassword-1').value;
    const password2 = document.getElementById('newPassword').value;

    return password1 === password2;
}
