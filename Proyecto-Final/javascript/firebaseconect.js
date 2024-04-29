import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"; // Agrega esta línea para importar setDoc
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 import {getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js"
 const firebaseConfig = {
   apiKey: "AIzaSyDgkrMr_HZ1q2XuMN8mpO5QGzwkSG5VBeU",
   authDomain: "cirtech-d3bdd.firebaseapp.com",
   projectId: "cirtech-d3bdd",
   storageBucket: "cirtech-d3bdd.appspot.com",
   messagingSenderId: "975173974866",
   appId: "1:975173974866:web:17f6ae1d1689253acf588b"
 };

 // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)

 const firestore = getFirestore(app);

 document.addEventListener('DOMContentLoaded', function() {
     // Tu código aquí
 
     // Referencia al formulario
     var form = document.getElementById('miFormulario');
 
     // Verificación de que el formulario existe
     if (form) {
         // Escucha el evento de envío del formulario
         form.addEventListener('submit', async function(event) {
             event.preventDefault(); // Evita que el formulario se envíe de manera tradicional
 
             // Captura los datos del formulario
             var nombre = document.getElementById('inputNombreCompleto').value;
             var usuario = document.getElementById('inputUsuario').value;
             var email = document.getElementById('inputEmail').value;
             var pais = document.getElementById('inputPaisRegion').value;
             var ciudad = document.getElementById('inputCiudad').value;
             var telefono = document.getElementById('inputTelefono').value;
             const userID = localStorage.getItem('userID');
             // Crea un objeto con los datos del formulario
             var datos = {
                 nombre: nombre,
                 usuario: usuario,
                 email: email,
                 pais: pais,
                 ciudad: ciudad,
                 telefono: telefono,
                 ID:userID
             };
 
             try {
                 // Guarda los datos en Cloud Firestore
                 const nuevoDocRef = doc(firestore, 'users', userID);
                 await setDoc(nuevoDocRef, datos);
                 console.log("Datos guardados correctamente:", nuevoDocRef);
                 window.location.href = 'entregas.html';
             } catch (e) {
                 console.error("Error adding document: ", e);
             }
         });
     } else {
         console.error("El formulario con ID 'miFormulario' no fue encontrado en el DOM.");
     }
 })


