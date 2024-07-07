// Manejo del formulario para eliminar cantidad en Cocina Bar
document.getElementById('eliminarCocinaBarForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const idCocinaBar = document.getElementById('idCocinaBar').value; //Para obtener id
    const cantidadEliminar = document.getElementById('cantidadEliminar').value; //Para obtener cantidad a elimianr

    fetch(`http://localhost:3000/api/modulo-cocina/cocina-bar/${idCocinaBar}`, { // Realiza una solicitud fetch a la URL especificada
        method: 'DELETE', // Define el método HTTP 
        headers: {
            'Content-Type': 'application/json', // Especifica que el contenido de la solicitud es JSON
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Agrega un encabezado de autorización con el token
        },
        body: JSON.stringify({ cantidad: cantidadEliminar }) // Convierte la cantidad a eliminar en un string JSON y lo adjunta al body
    })
        .then(response => { // Procesa la respuesta de la solicitud
            if (response.ok) { // Verifica si la respuesta es correcta
                return response.text(); // Si es retorna el texto de la respuesta
            } else { // Si la respuesta no es
                throw new Error('Error al eliminar la cantidad en Cocina Bar'); // Lanza un error con un mensaje específico
            }
        })
        .then(data => { // Procesa el texto de la respuesta 
            alert(data); // Muestra un mensaje de alerta con los datos recibidos
        })
        .catch(error => { // Si ocurre cualquier error lo captura
            console.error('Error:', error); // Muestra el error en la consola
            alert('Error al eliminar cantidad en Cocina Bar'); // Muestra un mensaje de alerta indicando que ocurrió un error
        });

});

// Lo mismo para los demas pero depende de cada solicitud HTTP, y segun la URL de la necesidad de la solicitud

// Manejo del formulario para retirar cantidad en General
document.getElementById('retirarGeneralForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const idGeneral = document.getElementById('idGeneral').value;
    const cantidadRetirar = document.getElementById('cantidadRetirar').value;

    fetch(`http://localhost:3000/api/modulo-cocina/general/retirar/${idGeneral}`, { //Para retirar en general esta es la URL
        method: 'PUT', //Y el  metodo HTTP es PUT
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ cantidad: cantidadRetirar })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error al retirar la cantidad en General');
            }
        })
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al retirar cantidad en General');
        });
});


// Manejo del formulario para agregar cantidad en General
document.getElementById('agregarGeneralForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const idGeneralAgregar = document.getElementById('idGeneralAgregar').value;
    const cantidadAgregar = document.getElementById('cantidadAgregar').value;

    fetch(`http://localhost:3000/api/modulo-cocina/general/agregar/${idGeneralAgregar}`, { //Para agregar en general esta es la URL
        method: 'PUT', //Y el  metodo HTTP es PUT
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ cantidad: cantidadAgregar })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error al agregar la cantidad en General');
            }
        })
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al agregar cantidad en General');
        });
});

// Manejo del formulario para cambiar estado funcional en General
document.getElementById('cambiarEstadoGeneralForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const idGeneralEstado = document.getElementById('idGeneralEstado').value;
    const estadoGeneral = document.getElementById('estadoGeneral').checked;

    fetch(`http://localhost:3000/api/modulo-cocina/general/cambiar-estado/${idGeneralEstado}`, { //Para cambiar el estado en general esta es la URL
        method: 'PUT', //Y el  metodo HTTP es PUT
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ funciona_estado: estadoGeneral })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error al cambiar el estado funcional en General');
            }
        })
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cambiar estado funcional en General');
        });
});
