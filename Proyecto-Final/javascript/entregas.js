import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';
import { firestore } from './firebase.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"; // Agrega esta línea para importar setDoc

document.addEventListener('DOMContentLoaded', function() {
    // Tu código aquí

    // Referencia al formulario
    var form = document.getElementById('miFormulario2');

    // Verificación de que el formulario existe
    if (form) {
        // Escucha el evento de envío del formulario
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

            // Captura los datos del formulario
            var pais = document.getElementById('inputPais').value;
            var departamento = document.getElementById('inputDepartamento').value;
            var municipio = document.getElementById('inputMunicipio').value;
            var colonia = document.getElementById('inputColonia').value;
            var direccion = document.getElementById('inputDireccion').value;
            var referencia = document.getElementById('inputReferencia').value;
            var documento = document.getElementById('selectTipoDocumento').value;
            var numerodocumento = document.getElementById('inputNumeroDocumento').value;
            var nombres = document.getElementById('inputNombres').value;
            var apellidos = document.getElementById('inputApellidos').value;
            var telefonocelular = document.getElementById('inputTelefonoCelular').value;
            const userID = localStorage.getItem('userID');
            // Crea un objeto con los datos del formulario
            var datos = {
                pais: pais,
                departamento: departamento,
                municipio: municipio,
                colonia: colonia,
                direccion: direccion,
                referencia: referencia,
                documento:documento,
                numerodocumento:numerodocumento,
                nombres:nombres,
                apellidos:apellidos,
                telefonocelular:telefonocelular,
                ID:userID
            };

            try {
                // Guarda los datos en Cloud Firestore
                const nuevoDocRef = doc(firestore, 'documento_entrega', userID);
                await setDoc(nuevoDocRef, datos);
                console.log("Datos guardados correctamente:", nuevoDocRef);
                window.location.href = 'inicio_sesion_registro.html';
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        });
    } else {
        console.error("El formulario con ID 'miFormulario' no fue encontrado en el DOM.");
    }
})


