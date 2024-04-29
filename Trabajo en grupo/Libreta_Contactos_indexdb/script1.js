// Definición de la variable 'indexedDB' para acceder a la API de IndexedDB del navegador
const indexedDB = window.indexedDB;
// Declaración de la variable 'db' para almacenar la conexión a la base de datos

// Intento de conexión a la base de datos 'agenda' con la versión 1
let db;
const conexion = indexedDB.open("agenda", 1);

// Evento que se activa cuando la conexión a la base de datos es exitosa
conexion.onsuccess = () => {
    db = conexion.result;
    console.log("La base de datos 'agenda' fue abierta", db);
    // Llamada a la función para mostrar los contactos almacenados en la base de datos
    mostrarCredenciales();
};

// Evento que se activa cuando la base de datos necesita ser actualizada (creada o modificada)
conexion.onupgradeneeded = (e) => {
    db = e.target.result;
    console.log("La base de datos 'agenda' fue creada", db);
    // Creación de la colección de objetos 'contactos' con índices para buscar por nombre, correo y teléfono
    const coleccionObjetos = db.createObjectStore("contactos", { keyPath: "id", autoIncrement: true });
    coleccionObjetos.createIndex("nombreIndex", "nombre", { unique: false });
    coleccionObjetos.createIndex("correoIndex", "correo", { unique: true });
    coleccionObjetos.createIndex("telefonoIndex", "telefono", { unique: false });
};

// Evento que se activa cuando ocurre un error al abrir la base de datos
conexion.onerror = (error) => {
    console.error("Error al abrir la base de datos: ", error);
};

// Función para agregar un nuevo contacto a la base de datos
function agregarContacto() {
    // Obtención de los valores ingresados por el usuario
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const telefonoInput = document.getElementById('telefono');

    const nombre = nombreInput.value;
    const correo = correoInput.value;
    const telefono = telefonoInput.value;

    // Verificación de que todos los campos estén completos
    if (nombre && correo && telefono) {
        // Inicio de una transacción de escritura en la colección de objetos 'contactos'
        const transaccion = db.transaction(["contactos"], "readwrite");
        const coleccionObjetos = transaccion.objectStore("contactos");

        const contacto = { nombre, correo, telefono };
        // Agregado del nuevo contacto a la base de datos
        const agregarContacto = coleccionObjetos.add(contacto);

        // Manejo de eventos para el éxito o fracaso de la operación de agregar contacto
        agregarContacto.onsuccess = function() {
            console.log("Contacto agregado correctamente a 'contactos'");
            // Limpieza de los campos de entrada después de agregar el contacto
            nombreInput.value = '';
            correoInput.value = '';
            telefonoInput.value = '';
            // Actualización de la lista de contactos mostrada en la interfaz
            mostrarCredenciales();
        };

        agregarContacto.onerror = function(error) {
            console.error("Error al agregar contacto: ", error);
        };

        transaccion.oncomplete = function() {
            // Acciones a realizar una vez completada la transacción
        };
    }
}

// Función para mostrar todos los contactos almacenados en la base de datos
function mostrarCredenciales() {
    const listaContactos = document.getElementById('lista_contactos');
    listaContactos.innerHTML = '';

    // Inicio de una transacción de solo lectura en la colección de objetos 'contactos'
    const transaccion = db.transaction(["contactos"], "readonly");
    const coleccionObjetos = transaccion.objectStore("contactos");

    // Apertura de un cursor para recorrer todos los contactos almacenados
    coleccionObjetos.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;

        if (cursor) {
            // Creación de un elemento div para mostrar la información de cada contacto
            const contactoDiv = document.createElement('div');
            contactoDiv.innerHTML = `<strong>${cursor.value.nombre}</strong><br>Email: ${cursor.value.correo}<br>Teléfono: ${cursor.value.telefono}`;
            listaContactos.appendChild(contactoDiv);
            // Continuación del cursor para avanzar al siguiente contacto
            cursor.continue();
        }
    };

    transaccion.oncomplete = function() {
        console.log("Contactos mostrados correctamente");
    };
}
