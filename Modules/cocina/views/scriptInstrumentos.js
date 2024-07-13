const input = document.getElementById('searchInput');
input.addEventListener('input', function () {
    //validacion del input para el input del id

    const value = input.value.trim();
    const numericValue = parseFloat(value);

    if (isNaN(numericValue) || numericValue < 1) {
        input.value = ''; // Borra el contenido
    }
});

async function funcionBotonReporte(id){
    // Función que cambia el estado del instrumento seleccionado en la base de datos

    // Opciones de la solicitud fetch
    let cambio = {funciona_estado: 0}
    const requestOptions = {
        method: 'PUT', // Método HTTP para actualizar 
        headers: {
        'Content-Type': 'application/json' // Tipo de contenido que estás enviando
        },
        body: JSON.stringify(cambio) // Convertir el objeto data a JSON
    };


    // Petición a inventario (habria que importar esta ruta de inventario)
    await fetch(`http://localhost:3000/api/general/${id}` , requestOptions)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parsear la respuesta JSON si es necesario
      })
      .then(data => {
        console.log('Actualización exitosa:', data); // Manejar la respuesta de éxito
        // Puedes hacer lo que necesites con la respuesta de la actualización aquí
      })
      .catch(error => {
        console.error('Fetch error:', error);
        // Manejar el error de la solicitud
      });
}

async function obtenerObjetosCocina(){
  // Función que hace una petición a inventario y retorna una lista con los instrumentos

    const response = await fetch(`http://localhost:3000/api/general`); /*Importar Modulo externo Inventario*/
    if (!response.ok){
        throw new Error('No se pudo obtener los objetos de gneeral');
    }

    let objetos = await response.json()
    let instrumentosCocina = []
    objetos.forEach(objeto => {
        if (objeto.tipo == "equipoCocina"){
            instrumentosCocina.push(objeto)
        }
    }); 
    return instrumentosCocina
}

async function actualizarFilas() {
  // Función que actualiza las filas de la tabla de la view

    let tableBody = document.getElementById("tBody")
    tableBody.innerHTML = "" // Se eliminan las filas
    
    let instrumentos = obtenerObjetosCocina()
    instrumentos.forEach(instrumento => {
      // Por cada instrumento se agrega una fila al tbody de la tabla

      // Se crean las celdas con la información del instrumento
      let filaTabla = document.createElement("tr")
      filaTabla.className = "table-row" 

      let celdaId = document.createElement("td") 
      celdaId.className = "row-cell" 
      celdaId.textContent = `${instrumento.id}`

      let celdaNombre = document.createElement("td") 
      celdaNombre.className = "row-cell-name" 
      celdaNombre.textContent = `${instrumento.nombre}`

      let celdaFunciona = document.createElement("td") 
      celdaFunciona.className = "row-cell"
      if (instrumento.funciona_estado === 1) {
        celdaFunciona.textContent = `Funciona`
      }
      else if (instrumento.funciona_estado === 0) {
        celdaFunciona.textContent = `No funciona`
      }
      // Se agregan las celdas con los datos a la fila
      filaTabla.appendChild(celdaId)
      filaTabla.appendChild(celdaNombre)
      filaTabla.appendChild(celdaFunciona)

      tableBody.appendChild(filaTabla) // Se agrega la fila al tbody
    })
}

let reportarButton = document.querySelector(".report-button")
reportarButton.addEventListener("click", function () {
  // Función que toma el id del input, reporta el fallo del instrumento y muestra los cambios en la view 

    let input = document.getElementById("searchInput")
    id = parseInt(input.value)
    funcionBotonReporte(id)
    actualizarFilas()
    input.value = ""
    alert("Instrumento Resportado")
})

document.addEventListener('DOMContentLoaded', function() {
  // Se cargan las filas en la tabla después de cargarse el HTML
  actualizarFilas()
})

setInterval(actualizarFilas, 30000); // Actualizar cada 30 segundos