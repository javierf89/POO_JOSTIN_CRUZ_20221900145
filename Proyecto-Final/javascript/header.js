document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');
        const options = dropdown.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');

        select.addEventListener('mouseenter', () => {
            closeOtherDropdowns(dropdowns, dropdown);
            select.classList.add('select-clicked');
            caret.classList.add('caret-rotate');
            menu.classList.add('menu-open');
        });

        options.forEach(option => { 
            option.addEventListener('click', () => {
                selected.innerText = option.innerText;
                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');

                // Remover la clase 'active' de todas las opciones
                options.forEach(opt => {
                    opt.classList.remove('active');
                });
                option.classList.add('active');
            });
        });
    });

    // Cerrar todos los dropdowns cuando se hace clic fuera de ellos o el mouse sale del área del dropdown
    document.addEventListener('mousedown', (event) => {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.querySelector('.menu').classList.remove('menu-open');
            }
        });
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseleave', () => {
            dropdown.querySelector('.menu').classList.remove('menu-open');
        });
    });

    function closeOtherDropdowns(allDropdowns, currentDropdown) {
        allDropdowns.forEach(dropdown => {
            if (dropdown !== currentDropdown) {
                dropdown.querySelector('.menu').classList.remove('menu-open');
            }
        });
    }
});

/* barra de busqueda */
const barra_busqueda = document.getElementById("barra_busqueda");
const inputSearch = document.getElementById("inputSearch");
const caja_de_busqueda = document.getElementById("caja_de_busqueda");

inputSearch.addEventListener('mouseout', () => {
    console.log('El mouse salió del área del inputSearch');
    inputSearch.value="";
});

// Creando filtrado de búsqueda
document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno() {
    const filtro = inputSearch.value.toUpperCase();
    const li = caja_de_busqueda.getElementsByTagName("li");

    // Recorre los elementos a filtrar
    for (let i = 0; i < li.length; i++) {
        const a = li[i].querySelector("a"); // Utiliza querySelector para obtener el primer elemento <a> dentro de li
        const textValue = a.textContent || a.innerText;
        if (textValue.toUpperCase().indexOf(filtro) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Accede a los elementos de la caja de búsqueda y del input de búsqueda
    const inputSearch = document.getElementById('inputSearch');
    const caja_de_busqueda = document.getElementById('caja_de_busqueda'); // Selecciona el elemento correcto

    let timer; // Variable para almacenar el temporizador

    // Función para activar la búsqueda
    function activarBusqueda() {
        inputSearch.disabled = false;
        caja_de_busqueda.style.display = 'block';
        // Cancelar el temporizador si existe
        clearTimeout(timer);
    }

    // Función para desactivar la búsqueda después de un retraso
    function desactivarBusquedaConRetraso() {
        // Establecer un temporizador para ocultar la caja de búsqueda después de 300 ms (0.3 segundos)
        timer = setTimeout(() => {
            inputSearch.disabled = true;
            caja_de_busqueda.style.display = 'none';
        }, 300);
    }

    // Evento cuando el mouse entra en el inputSearch
    inputSearch.addEventListener('mouseover', activarBusqueda);

    // Evento cuando el mouse sale del inputSearch
    inputSearch.addEventListener('mouseout', function(event) {
        // Verifica si el mouse también salió de la caja de búsqueda y del input de búsqueda
        if (!caja_de_busqueda.contains(event.relatedTarget)) {
            desactivarBusquedaConRetraso();
        }
    });

    // Evento cuando el mouse sale de la caja de búsqueda
    caja_de_busqueda.addEventListener('mouseout', function(event) {
        // Si el mouse sale de la caja de búsqueda y no entra en el inputSearch, desactiva la búsqueda
        if (!inputSearch.contains(event.relatedTarget)) {
            desactivarBusquedaConRetraso();
        }
    });

    // Evento cuando el mouse entra en la caja de búsqueda
    caja_de_busqueda.addEventListener('mouseover', function(event) {
        // Cancelar el temporizador si el ratón entra en la caja de búsqueda
        clearTimeout(timer);
    });

    // Obtener todos los elementos li dentro de la caja de búsqueda
    const listaElementos = caja_de_busqueda.querySelectorAll('li');

    // Iterar sobre cada elemento li y manejar los eventos de mouseover y mouseout
    listaElementos.forEach(function(elemento) {
        // Evento cuando el mouse entra en un elemento li dentro de la caja de búsqueda
        elemento.addEventListener('mouseover', function(event) {
            // Cancelar el temporizador si el ratón entra en un elemento li
            clearTimeout(timer);
        });

        // Evento cuando el mouse sale de un elemento li dentro de la caja de búsqueda
        elemento.addEventListener('mouseout', function(event) {
            // Cancelar el temporizador si el ratón sale de un elemento li
            clearTimeout(timer);
        });
    });
});

