const indexedDB = window.indexedDB;
let db;

const conexion = indexedDB.open("credenciales", 1);

conexion.onsuccess = () => {
    db = conexion.result;
    console.log("La base de datos 'credenciales' fue abierta", db);
};

conexion.onupgradeneeded = (e) => {
    db = e.target.result;
    console.log("La base de datos 'credenciales' fue creada", db);
    const coleccionObjetos = db.createObjectStore("usuarios", { keyPath: "id", autoIncrement: true });
    coleccionObjetos.createIndex("correoIndex", "correo", { unique: true });
};

conexion.onerror = (error) => {
    console.error("Error al abrir la base de datos: ", error);
};

function agregarCredencial() {
    const correoInput = document.getElementById('correo');
    const contraseñaInput = document.getElementById('contraseña');

    const correo = correoInput.value;
    const contraseña = contraseñaInput.value;

    if (correo && contraseña) {
        const transaccion = db.transaction(["usuarios"], "readwrite");
        const coleccionObjetos = transaccion.objectStore("usuarios");

        const credencial = { correo, contraseña };
        const agregarUsuario = coleccionObjetos.add(credencial);

        agregarUsuario.onsuccess = function() {
            console.log("Credencial agregada correctamente a 'usuarios'");
            correoInput.value = '';
            contrasenaInput.value = '';
        };

        agregarUsuario.onerror = function(error) {
            console.error("Error al agregar credencial: ", error);
        };

        transaccion.oncomplete = function() {
            // Cierre de la transacción
        };
    }
}

function consultarCredenciales() {
    const transaccion = db.transaction(["usuarios"], "readwrite");
    const coleccionObjetos = transaccion.objectStore("usuarios");
    const conexion = coleccionObjetos.openCursor();

    console.log("Credenciales");
    conexion.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            console.log(cursor.value);
            cursor.continue();
        } else {
            console.log('No hay credenciales en la lista');
        }
    };
}

const obtener= () => {


}
const leer= () => {


}
const eliminar= () => {


}
