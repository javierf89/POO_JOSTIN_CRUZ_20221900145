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
    const nombre1 = document.getElementById('inputNombreCompleto-1');
    const nombre2 = document.getElementById('inputNombreCompleto');
    const usuario = document.getElementById('inputUsuario');
    const email = document.getElementById('inputEmail');
    const pais = document.getElementById('inputPaisRegion');
    const ciudad = document.getElementById('inputCiudad');
    const telefono = document.getElementById('inputTelefono');

    nombre2.value = userData.nombre;
    nombre1.value = userData.nombre;
    usuario.value=userData.usuario;
    email.value= userData.email;
    pais.value = userData.pais;
    ciudad.value= userData.ciudad;
    telefono.value = userData.telefono;
} else {
    console.log('El documento no existe.');
    console.log(userID)
}

// Referencia a otra colección en Firestore
const otraColeccionDocRef = doc(firestore, 'documento_entrega', userID);

// Obtener los datos del documento en la otra colección
const otraColeccionDocSnap = await getDoc(otraColeccionDocRef);

if (otraColeccionDocSnap.exists()) {
    // El documento existe, puedes acceder a sus datos
    const userData = otraColeccionDocSnap.data();
    
    const pais = document.getElementById('inputPais');
    const departamento = document.getElementById('inputDepartamento');
    const municipio = document.getElementById('inputMunicipio');
    const colonia = document.getElementById('inputColonia');
    const direccion = document.getElementById('inputDireccion');
    const referencia = document.getElementById('inputReferencia');
    const documento = document.getElementById('selectTipoDocumento');
    const numerodocumento = document.getElementById('inputNumeroDocumento');
    const nombres = document.getElementById('inputNombres');
    const apellidos = document.getElementById('inputApellidos');
    const telefonocelular = document.getElementById('inputTelefonoCelular');

    
    pais.value=userData.pais;
    departamento.value= userData.departamento;
    municipio.value= userData.municipio;
    colonia.value= userData.colonia;
    direccion.value= userData.direccion;
    referencia.value= userData.referencia;
    documento.value = userData.documnento;
    numerodocumento.value= userData.numerodocumento;
    nombres.value= userData.nombres;
    apellidos.value= userData.apellidos;
    telefonocelular.value=userData.telefonocelular;
} else {
    console.log('El documento no existe.');
    console.log(userID)
}


