import { firestore } from './firebase.js';
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Función para obtener el documento y actualizar los elementos HTML correspondientes
async function actualizarDocumento(numDocumento, idImagen, idNombre, idPrecio) {
    const userDocRef = doc(firestore, 'banners', 'banner' + numDocumento);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
        const userData = docSnap.data();
        const imagen = document.getElementById(idImagen);
        const nombrep = document.getElementById(idNombre);
        const preciop = document.getElementById(idPrecio);
        
        imagen.src = userData.url_imagen;
        nombrep.textContent = userData.Nombre;
        preciop.textContent = userData.Precio;
    } else {
        console.log(`El documento "banner${numDocumento}" no existe.`);
    }
}

// Llamar a la función para cada documento
actualizarDocumento(1, "Banner1", "Nombrep1", "Preciop1");
actualizarDocumento(2, "Banner2", "Nombrep2", "Preciop2");
actualizarDocumento(3, "Banner3", "Nombrep3", "Preciop3");
