// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const button = document.getElementById('btn');
// Codígo nesesario para mostrar información


// Función para cargar y mostrar los nombres de los usuarios
function cargarNombresUsuarios() {
    // Obtener los usuarios desde el archivo JSON
    fetch('/data/usuarios.json')
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(usuarios) {
            // Limpiar el menú desplegable
            userSelect.innerHTML = '';

            // Agregar un primer elemento predeterminado al menú desplegable
            const opcionPredeterminada = document.createElement('option');
            opcionPredeterminada.textContent = 'Selecciona un usuario...';
            userSelect.appendChild(opcionPredeterminada);

            // Iterar sobre cada usuario y agregar su nombre al menú desplegable
            usuarios.forEach(function(usuario) {
                const opcion = document.createElement('option');
                opcion.textContent = usuario.firstname + ' ' + usuario.lastname;
                opcion.value = usuario.id;
                userSelect.appendChild(opcion);
            });
        })
        .catch(function(error) {
            console.error('Error al cargar y mostrar nombres de usuarios:', error);
        });
}

// Llamar a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarNombresUsuarios);

// Evento de clic en el botón
button.addEventListener('click', function() {
    // Obtener el ID del usuario seleccionado
    const userId = parseInt(userSelect.value);
    
    // Verificar si se seleccionó un usuario válido
    if (!userId || isNaN(userId)) {
        alert('No seleccionaste un usuario válido');
        return;
    }

    // Obtener las tareas desde el archivo JSON
    fetch('/data/tareas.json')
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(tareas) {
            // Limpiar el contenedor de tareas
            taskContainer.innerHTML = '';

            // Filtrar las tareas por el ID del usuario seleccionado
            const tareasUsuario = tareas.filter(function(tarea) {
                return tarea.userId === userId;
            });

            // Mostrar las tareas del usuario seleccionado
            tareasUsuario.forEach(function(tarea) {
                const elementoTarea = document.createElement('div');
                elementoTarea.textContent = tarea.title;
                taskContainer.appendChild(elementoTarea);
            });
        })
        .catch(function(error) {
            console.error('Error al cargar y mostrar tareas:', error);
        });
});


// Fin de codígo 

// Funciones
/**
 * Optiene una lista de todos los usuarios que pueden existir
 * @returns {Promise<User[]>}
 */
function getAllUsers() {
  return fetch('/data/usuarios.json')
    .then(resp => resp.json());
}

/**
 * Optiene una lista de todas las tareas que hay de todos los usuarios
 * @returns {Promise<Task[]>}
 */
function getAllTasks() {
  return fetch('/data/usuarios.json')
    .then(resp => resp.json());
}

/**
 * @typedef User Definición de un usuario
 * @property {number} id Identificador unico del usuario
 * @property {string} firtsname Primer nombre del usuario
 * @property {string} lastname Apellido del usuario
 * @property {string} email Correo electronico del usuario
  */

/**
 * @typedef Task Definición de una tarea de usuario
 * @property {number} id Identificador unico de la tarea
 * @property {number} userId IDentificador del uaurio a quien corresponde la tarea
 * @property {string} title Titulo de la tarea
 * @property {boolean} completed Estado de la tarea si esta completada o no
 */