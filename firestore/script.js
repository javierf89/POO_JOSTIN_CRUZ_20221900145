import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgkrMr_HZ1q2XuMN8mpO5QGzwkSG5VBeU",
  authDomain: "cirtech-d3bdd.firebaseapp.com",
  databaseURL: "https://cirtech-d3bdd-default-rtdb.firebaseio.com",
  projectId: "cirtech-d3bdd",
  storageBucket: "cirtech-d3bdd.appspot.com",
  messagingSenderId: "975173974866",
  appId: "1:975173974866:web:17f6ae1d1689253acf588b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.querySelectorAll('.boton-comprar').forEach(button => {
  button.addEventListener('click', async () => {
      const product = button.getAttribute('data-product');
      const price = parseFloat(button.parentElement.querySelector('.precio').textContent.replace('$', '').replace(/,/g, ''));

      console.log('Producto:', product);
      console.log('Precio:', price);

      try {
          // Agregar el producto a Firestore
          const docRef = await addDoc(collection(db, 'compras'), {
              product: product,
              price: price,
              timestamp: serverTimestamp()
          });

          // Obtener el ID del documento recién agregado
          const productId = docRef.id;
          console.log('Producto agregado correctamente a Firestore con ID:', productId);

          // Crea una nueva fila en la tabla del carrito
          const table = document.getElementById('cart-table').querySelector('tbody');
          const newRow = table.insertRow();
          newRow.insertCell(0).textContent = productId; // ID del documento en Firestore
          newRow.insertCell(1).textContent = product; // Nombre del producto
          newRow.insertCell(2).textContent = '$' + numberWithCommas(price.toFixed(2)); // Precio del producto formateado

          // Calcula y muestra el total de la compra
          actualizarTotal();
      } catch (error) {
          console.error('Error al agregar producto a Firestore: ', error);
      }
  });
});

document.getElementById('eliminar-producto').addEventListener('click', async () => {
  try {
      const productId = prompt("Ingrese el ID del producto a eliminar:");
      if (!productId) return; // Si no se proporciona ningún ID, salimos de la función

      // Eliminar el documento usando el ID proporcionado
      await deleteDoc(doc(db, 'compras', productId));
      console.log('Producto eliminado correctamente:', productId);

      // Recalcular el total después de eliminar un producto
      actualizarTotal();
      
      // Vuelve a cargar los productos restantes en la tabla
      await cargarProductos();
  } catch (error) {
      console.error('Error al eliminar producto:', error);
  }
});

async function cargarProductos() {
  try {
      // Obtener todos los documentos de la colección "compras"
      const querySnapshot = await getDocs(collection(db, 'compras'));

      // Limpiar la tabla del carrito
      const tableBody = document.getElementById('cart-table').querySelector('tbody');
      tableBody.innerHTML = '';

      // Iterar sobre cada documento y mostrar sus datos en la tabla
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          const newRow = tableBody.insertRow();
          newRow.insertCell(0).textContent = doc.id; // ID del documento en Firestore
          newRow.insertCell(1).textContent = data.product; // Nombre del producto
          newRow.insertCell(2).textContent = '$' + numberWithCommas(data.price.toFixed(2)); // Precio del producto formateado
      });
      actualizarTotal();
      console.log('Productos cargados correctamente.');
  } catch (error) {
      console.error('Error al cargar productos:', error);
  }
}

// Función para calcular y mostrar el total de la compra
function actualizarTotal() {
  const precios = Array.from(document.querySelectorAll('#cart-table tbody tr td:nth-child(3)')).map(td => parseFloat(td.textContent.replace('$', '').replace(/,/g, '')));
  const total = precios.reduce((acc, curr) => acc + curr, 0);
  document.getElementById('total').textContent = '$' + numberWithCommas(total.toFixed(2));
}

// Función para agregar comas a un número (para formatear el precio)
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
      // Cargar productos al cargar la página
      await cargarProductos();
  } catch (error) {
      console.error('Error al cargar productos al cargar la página:', error);
  }
});
