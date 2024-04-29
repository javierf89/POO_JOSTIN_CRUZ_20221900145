import { firestore } from './firebase.js';
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
const userDataContainer = document.getElementById('userDataContainer');
// Obtener el UID almacenado en localStorage
const userID = localStorage.getItem('userID');
console.log(userID)
// Crear una referencia al documento en Firestore usando el UID
const userDocRef = doc(firestore, 'users', userID);

// Obtener los datos del documento
const docSnap = await getDoc(userDocRef);
if (docSnap.exists()) {
    // El documento existe, puedes acceder a sus datos
    const userData = docSnap.data();
    userDataContainer.innerHTML = `
        <p><strong>ID:</strong> ${userID}</p>
        <p><strong>Ciudad:</strong> ${userData.ciudad}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Nombre:</strong> ${userData.nombre}</p>
        <p><strong>Teléfono:</strong> ${userData.telefono}</p>
        <p><strong>Usuario:</strong> ${userData.usuario}</p>
    `;
} else {
    console.log('El documento no existe.');
    console.log(userID)
}
