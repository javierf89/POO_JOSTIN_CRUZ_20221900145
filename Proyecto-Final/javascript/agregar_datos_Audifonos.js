import { firestore } from './firebase.js';
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Función para obtener el documento y actualizar los elementos HTML correspondientes
async function actualizarDocumento(numDocumento, idImagen, idNombre, idPrecio, idDescuento) {
    const userDocRef = doc(firestore, 'Productos', 'Audifonos' + numDocumento);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
        const userData = docSnap.data();
        const imagen = document.getElementById(idImagen);
        const nombre = document.getElementById(idNombre);
        const precio = document.getElementById(idPrecio);
        const descuento = document.getElementById(idDescuento);
        
        imagen.src = userData.url_imagen;
        nombre.textContent = userData.Nombre;
        precio.textContent = userData.Precio;
        descuento.textContent = userData.Descuento;
    } else {
        console.log(`El documento "Audifonos${numDocumento}" no existe.`);
    }
}

// Llamar a la función para cada documento
actualizarDocumento(1, "Audifonos1", "Nombre1", "Precio1", "Descuento1");
actualizarDocumento(2, "Audifonos2", "Nombre2", "Precio2", "Descuento2");
actualizarDocumento(3, "Audifonos3", "Nombre3", "Precio3", "Descuento3");
actualizarDocumento(4, "Audifonos4", "Nombre4", "Precio4", "Descuento4");
actualizarDocumento(5, "Audifonos5", "Nombre5", "Precio5", "Descuento5");
actualizarDocumento(6, "Audifonos6", "Nombre6", "Precio6", "Descuento6");
actualizarDocumento(7, "Audifonos7", "Nombre7", "Precio7", "Descuento7");
actualizarDocumento(8, "Audifonos8", "Nombre8", "Precio8", "Descuento8");
actualizarDocumento(9, "Audifonos9", "Nombre9", "Precio9", "Descuento9");
