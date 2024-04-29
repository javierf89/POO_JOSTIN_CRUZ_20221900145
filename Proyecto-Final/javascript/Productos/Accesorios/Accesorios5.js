import { firestore } from '/javascript/firebase.js';
import { getDoc, setDoc,collection,addDoc,getDocs,doc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { showMessage } from '/javascript/showMessage.js';
console.log("hola mundo");

const userID = localStorage.getItem('userID');

// Función para obtener el documento y actualizar los elementos HTML correspondientes
async function actualizarDocumento(numDocumento, idImagen, idNombre, idPrecio, idDescuento) {
    const userDocRef = doc(firestore, 'Productos', 'Accesorios' + numDocumento);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
        const userData = docSnap.data();
        const imagen = document.getElementById(idImagen);
        const nombre = document.getElementById(idNombre);
        const precio = document.getElementById(idPrecio);
        const descuento = document.getElementById(idDescuento);
        const carrusel1 = document.getElementById("carrusel1");
        const carrusel2 = document.getElementById("carrusel2");
        const carrusel3 = document.getElementById("carrusel3");
        const Disponibilidad = document.getElementById("Disponibilidad");
        const Marca = document.getElementById("Marca");
        const informacion = document.getElementById("informacion");

        carrusel1.src = userData.url_carrusel1;
        carrusel2.src = userData.url_carrusel2;
        carrusel3.src = userData.url_carrusel3;
        imagen.src = userData.url_imagen;
        nombre.textContent = userData.Nombre;
        precio.textContent = userData.Precio;
        descuento.textContent = userData.Descuento;
        Disponibilidad.textContent = userData.Disponibilidad;
        Marca.textContent = userData.Marca;
        informacion.textContent = userData.Descripcion;
    } else {
        console.log(`El documento "Celulares${numDocumento}" no existe.`);
    }
}

// Llamar a la función para cada documento
actualizarDocumento(5, "Accesorios1", "Nombre1", "Precio1", "Descuento1");

document.addEventListener('DOMContentLoaded', function() {
    const carrito = document.getElementById('Carrito1');
    carrito.addEventListener('click', async function(event) {
        event.preventDefault();
        const userDocRef = doc(firestore, 'Productos', 'Accesorios5');
        const docSnap = await getDoc(userDocRef);
        const userDocRef1 = doc(firestore, 'users', userID);
        const docSnap1 = await getDoc(userDocRef1);

        const nuevoDocRef = doc(firestore, 'Carrito', userID);
        const docSnap2 = await getDoc(nuevoDocRef);
        //objeto//
        const peticionesRef = collection(firestore, 'Carrito', userID, 'peticiones' );
        const  querySnapshot = await getDocs(peticionesRef)
        if (docSnap.exists() && docSnap1.exists()) {
            const numElement = document.getElementById('cuantos');
            const numValue = parseInt(numElement.innerText);
            const userData = docSnap.data(); // Mover aquí la declaración de userData}
            const UserData1 = docSnap1.data();
            const nombre1 = userData.Nombre;
            const precio1 = userData.Precio;
            const descuento1 = userData.Descuento;
            const email1 = UserData1.email;
            let newcuantos = 0; // Inicializa la variable fuera del bucle

            querySnapshot.forEach((doc) => {
                if (doc.id === 'Accesorios5') {
                    const data = doc.data();
                    console.log("Valor de data.Cuantos:", data.Cuantos);
                    // Verifica si el campo "Cuantos" está definido y no es nulo
                    if (data !== undefined && data.Cuantos !== null) {
                        // Convierte el valor de "Cuantos" a entero
                        newcuantos = parseInt(data.Cuantos);
                        console.log("Valor de newcuantos (después de parseInt):", newcuantos);
                    } else {
                        console.log("El campo 'Cuantos' no está definido en el documento 'Celular1'. Se establecerá a 0.");
                        newcuantos = 0;
                    }
                }
            });

            console.log("Valor final de newcuantos:", newcuantos);

            const suma = parseInt(numValue) + newcuantos;
            const producto =  suma + " "+ nombre1;
            const datos = {
                uid: userID,
                Descuento: descuento1,
                Precio: precio1,
                Nombre:nombre1,
                ID_DOCUMENTO: "Accesorios5",
                Cuantos: suma,
                Producto:producto
            };
          
            const peticionesRef = collection(nuevoDocRef, 'peticiones');
            const Celular1DocumentoRef = doc(peticionesRef, 'Accesorios5'); // Aquí defines el nombre del documento
            await setDoc(Celular1DocumentoRef, datos);

            window.location.href= "/html/Carrito.html"
            
        } else {
            showMessage("¡No ha iniciado sesion !")
        }
    });    
});
