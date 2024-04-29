import { firestore } from './firebase.js';
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Función para obtener el documento y actualizar los elementos HTML correspondientes
async function actualizarDocumento(numDocumento, idImagen, idNombre) {
    const userDocRef = doc(firestore, 'categorias', 'categoria' + numDocumento);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
        const userData = docSnap.data();
        const imagen = document.getElementById(idImagen);
        const nombres = document.getElementById(idNombre);
        
        imagen.src = userData.url_imagen;
        nombres.textContent = userData.Nombre;
    } else {
        console.log(`El documento "categoria${numDocumento}" no existe.`);
    }
}

// Llamar a la función para cada documento
actualizarDocumento(1, "Categoria1", "Nombres1");
actualizarDocumento(2, "Categoria2", "Nombres2");
actualizarDocumento(3, "Categoria3", "Nombres3");
actualizarDocumento(4, "Categoria4", "Nombres4");
actualizarDocumento(5, "Categoria5", "Nombres5");
actualizarDocumento(6, "Categoria6", "Nombres6");





// Función para obtener el documento y actualizar los elementos HTML correspondientes
async function actualizarDocumento1(Categoria, idImagen, idNombre, idPrecio, idDescuento) {
    const userDocRef = doc(firestore, 'Productos',Categoria);
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
        console.log(`El documento "${Categoria}" no existe.`);
    }
}

// Llamar a la función para cada documento
actualizarDocumento1("Celulares2", "Celular2", "Nombre2", "Precio2", "Descuento2");
actualizarDocumento1("Laptop3", "Laptop3", "Nombre3", "Precio3", "Descuento3");
actualizarDocumento1("Accesorios1", "Accesorios1", "Nombre3", "Precio1", "Descuento1");
actualizarDocumento1("Audifonos8", "Audifonos8", "Nombre8", "Precio8", "Descuento8");
actualizarDocumento1("Consolas4", "Consolas4", "Nombre4", "Precio4", "Descuento4");
actualizarDocumento1("Laptop5", "Laptop5", "Nombre5", "Precio5", "Descuento5");
actualizarDocumento1("Celulares6", "Celular6", "Nombre6", "Precio6", "Descuento6");
actualizarDocumento1("Televisores7", "Televisores7", "Nombre7", "Precio7", "Descuento7");
actualizarDocumento1("Audifonos9", "Audifonos9", "Nombre9", "Precio9","Descuento9");


async function actualizarDocumento2(Categoria, idImagen, idNombre, idPrecio) {
    const userDocRef = doc(firestore, 'Productos',Categoria);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
        const userData = docSnap.data();
        const imagen = document.getElementById(idImagen);
        const nombre = document.getElementById(idNombre);
        const precio = document.getElementById(idPrecio);
        
        
        imagen.src = userData.url_imagen;
        nombre.textContent = userData.Nombre;
        precio.textContent = userData.Precio;
       
    } else {
        console.log(`El documento "${Categoria}" no existe.`);
    }
}
actualizarDocumento2("Laptop10", "Laptop10", "Nombre10", "Precio10");