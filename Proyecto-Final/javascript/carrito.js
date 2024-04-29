import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { auth } from './firebase.js';

import { firestore } from './firebase.js';
import { doc, setDoc, getDocs, collection, getDoc, deleteDoc,addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"; // Agrega esta línea para importar setDoc

const userID = localStorage.getItem('userID');
async function cargarProductos() {
    try {
        // Obtener la colección de peticiones para el usuario específico
        const peticionesRef = collection(firestore, 'Carrito', userID, 'peticiones');
        const querySnapshot = await getDocs(peticionesRef);

        // Limpiar la tabla del carrito
        const tableBody = document.getElementById('cart-table').querySelector('tbody');
        tableBody.innerHTML = '';
        
        // Iterar sobre cada documento de la colección
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const newRow = tableBody.insertRow();
            newRow.insertCell(0).textContent = data.Cuantos;
            newRow.insertCell(1).textContent = data.Nombre;
            newRow.insertCell(2).textContent = data.Precio ;
            let partes = data.Precio.split(".");
            if (partes.length > 1) {
                let precio = partes[1].trim();
                newRow.insertCell(3).textContent = parseInt(precio) * data.Cuantos;
            } else {
                console.log("No se encontró un punto en la cadena.");
            }
            var newCell5 = newRow.insertCell(4);
            var btnEliminar = document.createElement("button");
            btnEliminar.setAttribute("id", "eliminar-producto");
            btnEliminar.setAttribute("class", "btn btn-danger");
            btnEliminar.textContent = "Eliminar Producto";
            btnEliminar.setAttribute("data-product-id", doc.id);

            newCell5.appendChild(btnEliminar);
        });

        console.log('Productos cargados correctamente.');
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

async function deleteProduct(productId) {
    try {
        const productoRef = doc(firestore, 'Carrito', userID, 'peticiones', productId);
        await deleteDoc(productoRef);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    }
}


//calcular total//--------------------------------------------------------
function calcularTotal() {
    let total = 0;
    const table = document.getElementById('cart-table');
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach((row) => {
        const precioTotal = row.cells[3].textContent;
        total += parseFloat(precioTotal);
    });

    const totalElement = document.getElementById('total-amount');
    totalElement.textContent =  total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await cargarProductos();
        document.addEventListener('click', async (event) => {
            if (event.target && event.target.id === 'eliminar-producto') {
                try {
                    const productId = event.target.getAttribute('data-product-id');
                    await deleteProduct(productId);
                    await cargarProductos();
                    calcularTotal();
                    console.log('Producto eliminado correctamente.');
                } catch (error) {
                    console.error('Error al eliminar producto:', error);
                }
            }
        });
        calcularTotal();
    } catch (error) {
        console.error('Error al cargar peticiones al cargar la página:', error);
    }
});


//agregar a factura ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const comprar = document.getElementById('Comprar');
    comprar.addEventListener('click', async function(event) {
        event.preventDefault();

        // Obtener las peticiones del carrito del usuario
        const carritoRef = collection(firestore, 'Carrito', userID, 'peticiones');
        const carritoSnapshot = await getDocs(carritoRef);

        try {
            // Iterar sobre las peticiones del carrito
            carritoSnapshot.forEach(async function(doc) {
                const producto = doc.data();
               
                // Agregar el producto a la factura
                await addDoc(collection(firestore, 'Factura', userID, 'Facturas del usuario'), {
                    usuarioID: userID,
                    producto: producto.Nombre,
                    Cantidad: producto.Cuantos,
                    ID_DOCUMENTO: producto.ID_DOCUMENTO,
                    Descuento: producto.Descuento
                    // Otros campos de la factura
                });
            });

            
           
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            // Mostrar un mensaje de error si es necesario
        }
        try {
            // Obtener la referencia a la colección "peticiones" del carrito del usuario actual
            const carritoRef = collection(firestore, 'Carrito', userID, 'peticiones');
            
            // Obtener todos los documentos de la colección "peticiones"
            const carritoSnapshot = await getDocs(carritoRef);

            // Iterar sobre los documentos y eliminarlos uno por uno
            await Promise.all(carritoSnapshot.docs.map(async function(doc) {
                await deleteDoc(doc.ref);
            }));

            
       
            // Redireccionar a otra página después de eliminar los documentos
            window.location.href = '/index.html'; // Cambia 'index.html' por la URL de la página a la que quieres redirigir
        } catch (error) {
            console.error("Error al eliminar los productos del carrito:", error);
        }
        
    });
});
