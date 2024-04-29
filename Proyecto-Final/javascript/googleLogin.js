import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js"
import { auth, firestore } from "./firebase.js"; // Asumo que firestore también se importa desde firebase.js
import { showMessage } from "./showMessage.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";



document.addEventListener('DOMContentLoaded', function() {
    const googleButton1 = document.querySelector("#googlelogin-1");
    googleButton1.addEventListener('click', async function(event) {
        event.preventDefault();

        const provider = new GoogleAuthProvider();
        try {
            const credenciales = await signInWithPopup(auth, provider);
            console.log(credenciales);
            console.log("Inicio de sesión con Google");
            const uid = credenciales.user.uid;
            localStorage.setItem('userID', uid);
            window.location.href = "leer_perfil.html";
            showMessage("¡Bienvenido, " + credenciales.user.displayName);
        } catch (error) {
            console.error(error);
        }
    });

    const googleButton2 = document.querySelector("#googlelogin-2");
    googleButton2.addEventListener('click', async function(event) {
        event.preventDefault();

        const provider = new GoogleAuthProvider();
        try {
            const credenciales = await signInWithPopup(auth, provider);
            console.log(credenciales);
            
            showMessage("¡Bienvenido, " + credenciales.user.displayName);
            const uid = credenciales.user.uid;
            const nuevoDocRef = doc(firestore, 'usuarios', uid);
            const datos = {
              uid: uid,
            };
            await setDoc(nuevoDocRef, datos); // Espera a que se complete la operación de escritura en Firestore
            localStorage.setItem('userID', uid);   
            window.location.href = "perfilusuario.html";
        } catch (error) {
            console.error(error);
        }
    });
});
