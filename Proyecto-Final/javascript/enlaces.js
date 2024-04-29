// Función para redirigir a la URL especificada
function redirectTo(url) {
    window.location.href = url;
}

// Mapeo de IDs de elementos a las URLs correspondientes
const enlaces = {
    'Perfil': '/html/leer_perfil.html',
    'Perfi': '/html/leer_perfil.html',
    'Accesorios': '/html/Categorias/Categoria_Accesorios.html',
    'Televisores': '/html/Categorias/Categoria_Televisores.html',
    'Consolas': '/html/Categorias/Categoria_Consolas.html',
    'Laptops': '/html/Categorias/Categoria_Laptop.html',
    'Auriculares': '/html/Categorias/Categoria_Audifonos.html',
    'Celulares': '/html/Categorias/Categoria_Celular.html',
    'Accesorio': '/html/Categorias/Categoria_Accesorios.html',
    'Televisore': '/html/Categorias/Categoria_Televisores.html',
    'Consola': '/html/Categorias/Categoria_Consolas.html',
    'Laptop': '/html/Categorias/Categoria_Laptop.html',
    'Auriculare': '/html/Categorias/Categoria_Audifonos.html',
    'Celulare': '/html/Categorias/Categoria_Celular.html',
    'Carrito': '/html/Carrito.html',
    'Faccebok': 'https://www.facebook.com',
    'Twitter': 'https://twitter.com',
    'Reddit': 'https://www.reddit.com/',
    'Pinterest': 'https://www.pinterest.com/',
    'Instagram': 'https://www.instagram.com/',
    'Youtube': 'https://www.youtube.com/',
    'CIRTECH' : '/index.html'
};

// Asignar eventos a los elementos de enlace
Object.keys(enlaces).forEach(function(id) {
    const enlace = document.getElementById(id);
    if (enlace) {
        enlace.addEventListener('click', function(event) {
            redirectTo(enlaces[id]);
        });
    }
});
