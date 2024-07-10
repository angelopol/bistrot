//validacion del input para el id
const input = document.getElementById('searchInput');
    input.addEventListener('input', function () {
        const value = input.value.trim();
        const numericValue = parseFloat(value);

        if (isNaN(numericValue) || numericValue < 1) {
            input.value = ''; // Borra el contenido
        }
    });

async function funcionBotonReporte(id){
    // Opciones de la solicitud fetch
    let cambio = {funciona_estado: 0}
    const requestOptions = {
        method: 'PUT', // Método HTTP para actualizar 
        headers: {
        'Content-Type': 'application/json' // Tipo de contenido que estás enviando
        },
        body: JSON.stringify(cambio) // Convertir el objeto data a JSON
    };


    // habria que importar esta funcion de inventario
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

let reportarButton = document.querySelector(".report-button")
reportarButton.addEventListener("click", function () {
    let input = document.getElementById("searchInput")
    id = parseInt(input.value)
    funcionBotonReporte(id)
    actualizarFilas()
    input.value = ""
    alert("Instrumento Resportado")
})

async function actualizarFilas() {
    let tableBody = document.getElementById("tBody")
    tableBody.innerHTML = ""
    
    let instrumentos = obtenerObjetosCocina()
    instrumentos.forEach(instrumento => {
      let filaTabla = document.createElement("tr")
      filaTabla.className = "table-row" 

      let celdaId = document.createElement("td") 
      celdaId.className = "row-cell" 
      celdaId.textContent = `${instrumento.id}`
      filaTabla.appendChild(celdaId)

      let celdaNombre = document.createElement("td") 
      celdaNombre.className = "row-cell-name" 
      celdaNombre.textContent = `${instrumento.nombre}`
      filaTabla.appendChild(celdaNombre)

      let celdaFunciona = document.createElement("td") 
      celdaFunciona.className = "row-cell"
      if (instrumento.funciona_estado === 1) {
        celdaFunciona.textContent = `Funciona`
      }
      else if (instrumento.funciona_estado === 0) {
        celdaFunciona.textContent = `No funciona`
      }
      filaTabla.appendChild(celdaFunciona)

      tableBody.appendChild(filaTabla)
    })
}


document.addEventListener('DOMContentLoaded', function() {
  actualizarFilas()
})

setInterval(actualizarFilas, 30000); // Actualizar cada 30 segundos