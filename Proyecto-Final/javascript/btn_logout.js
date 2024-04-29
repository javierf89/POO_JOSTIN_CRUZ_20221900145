document.addEventListener('DOMContentLoaded', function() {
    const btnInicioSesion = document.getElementById('btnInicioSesion');

   
    function verificarSesion() {
        const idUsuario = localStorage.getItem('userID');
        if (idUsuario) {
            // Si hay un ID almacenado, cambiar el texto del botón a "Cerrar Sesión"
            btnInicioSesion.textContent = 'Cerrar Sesión';
            
            btnInicioSesion.addEventListener('click', cerrarSesion);
        } else {
            
            btnInicioSesion.textContent = 'Iniciar Sesión';
            
            btnInicioSesion.addEventListener('click', function() {
                window.location.href = '/html/inicio_sesion_registro.html'; 
            });
        }
    }

    // Función para manejar el cierre de sesión
    function cerrarSesion() {
        // Eliminar el ID de usuario del almacenamiento
        localStorage.removeItem('userID');
        
        verificarSesion();
    }

    // Verificar el estado de la sesión al cargar la página
    verificarSesion();
});