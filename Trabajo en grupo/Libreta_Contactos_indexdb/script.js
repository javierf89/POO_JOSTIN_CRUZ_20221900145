const indexedDB = window.indexedDB;
let db;

const conexion = indexedDB.open("agenda", 1);

conexion.onsuccess = () => {
    db = conexion.result;
    console.log("La base de datos 'agenda' fue abierta", db);
    mostrarCredenciales();
};

conexion.onupgradeneeded = (e) => {
    db = e.target.result;
    console.log("La base de datos 'agenda' fue creada", db);
    const coleccionObjetos = db.createObjectStore("contactos", { keyPath: "id", autoIncrement: true });
    coleccionObjetos.createIndex("nombreIndex", "nombre", { unique: false });
    coleccionObjetos.createIndex("correoIndex", "correo", { unique: true });
    coleccionObjetos.createIndex("telefonoIndex", "telefono", { unique: false });
};

conexion.onerror = (error) => {
    console.error("Error al abrir la base de datos: ", error);
};

function agregarContacto() {
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const telefonoInput = document.getElementById('telefono');

    const nombre = nombreInput.value;
    const correo = correoInput.value;
    const telefono = telefonoInput.value;

    if (nombre && correo && telefono) {
        const transaccion = db.transaction(["contactos"], "readwrite");
        const coleccionObjetos = transaccion.objectStore("contactos");

        const contacto = { nombre, correo, telefono };
        const agregarContacto = coleccionObjetos.add(contacto);

        agregarContacto.onsuccess = function() {
            console.log("Contacto agregado correctamente a 'contactos'");
            nombreInput.value = '';
            correoInput.value = '';
            telefonoInput.value = '';
            mostrarCredenciales();
        };

        agregarContacto.onerror = function(error) {
            console.error("Error al agregar contacto: ", error);
        };

        transaccion.oncomplete = function() {
            // Cierre de la transacción
        };
    }
}

// Función para eliminar un contacto específico
function eliminarContacto(id) {
    const transaccion = db.transaction(["contactos"], "readwrite");
    const coleccionObjetos = transaccion.objectStore("contactos");

    // Eliminar el contacto utilizando el método delete() y el ID proporcionado
    const eliminarContacto = coleccionObjetos.delete(id);

    eliminarContacto.onsuccess = function() {
        console.log("Contacto eliminado correctamente");
        // Volver a mostrar la lista de contactos después de eliminar el contacto
        mostrarCredenciales();
    };

    eliminarContacto.onerror = function(error) {
        console.error("Error al eliminar contacto: ", error);
    };

    transaccion.oncomplete = function() {
        // Cierre de la transacción
    };
}

// Función para mostrar todos los contactos almacenados en la base de datos
function mostrarCredenciales() {
    const listaContactos = document.getElementById('lista_contactos');
    listaContactos.innerHTML = '';

    const transaccion = db.transaction(["contactos"], "readonly");
    const coleccionObjetos = transaccion.objectStore("contactos");

    coleccionObjetos.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;

        if (cursor) {
            // Creación de un elemento div para mostrar la información de cada contacto
            const contactoDiv = document.createElement('div');
            contactoDiv.innerHTML = `<strong>${cursor.value.nombre}</strong><br>Email: ${cursor.value.correo}<br>Teléfono: ${cursor.value.telefono}`;
            
            // Agregar un botón o enlace para eliminar el contacto
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', function() {
                eliminarContacto(cursor.value.id);
            });
            contactoDiv.appendChild(eliminarBtn);

            listaContactos.appendChild(contactoDiv);
            cursor.continue();
        }
    };

    transaccion.oncomplete = function() {
        console.log("Contactos mostrados correctamente");
    };
}
