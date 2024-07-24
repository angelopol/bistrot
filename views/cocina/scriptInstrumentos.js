// obtenemos el input donde se colocan los id de los intrumentos que se quieren reportar
const input = document.getElementById('searchInput');

// hacemos que solo puedan ser numeros mayores a cero
input.addEventListener('input', function () {
    //validacion del input para el input del id

    const value = input.value.trim();
    const numericValue = parseFloat(value);

    if (isNaN(numericValue) || numericValue < 1 || numericValue > 24) {
        input.value = ''; // Borra el contenido
    }
});

async function funcionBotonReporte(id , status){
    // Función que cambia el estado del instrumento seleccionado en la base de datos

    // Solicitud GET para obtener los atributos del instrumento
      let instrumentoData = {}

      const options = {
        method: 'GET', 
        headers: {
        'Content-Type': 'application/json' 
        }
    };

  await fetch(`/inventario/api/general/${id}` , options)
  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      instrumentoData = data
      instrumentoData.funciona_estado = status
      console.log('Se obtuvo el instrumento:', instrumentoData);
    })
    .catch(error => {
      console.error('Fetch error:', error);
     
    });

    // Actualización del instrumento en base de datos
    const requestOptions = {
        method: 'PUT', 
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify(instrumentoData) 
    };

    // Petición a inventario (habria que importar esta ruta de inventario)
    await fetch(`/inventario/api/general/${id}` , requestOptions)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parsear la respuesta JSON si es necesario
      })
      .then(data => {
        console.log('Actualización exitosa:', data); // Manejar la respuesta de éxito
        
      })
      .catch(error => {
        console.error('Fetch error:', error);
       
      });
}

// Función que hace una petición a inventario y retorna una lista con los instrumentos
async function obtenerObjetosCocina(){
    try {
      // con este endpoint solicitamos a inventario todos los instrumentos que tienen guardados en su tabla de general
      const response = await fetch(`/inventario/api/general`); //Importar Modulo externo Inventario/
      if (!response.ok){
          throw new Error('No se pudo obtener los objetos de general');
      }
  
      let objetos = await response.json(); // esta variable guardará todos los objetos
      let instrumentosCocina = []; // con esta variable guardamos todos los objetos cuyo tipo sea igual a equipoCocina, básicamente los instrumentos que pertenecen al módulo de cocina/bar
  
      objetos.forEach(objeto => {
          if (objeto.tipo === "Equipo") {
              instrumentosCocina.push(objeto);
          }
      }); 
      
      return instrumentosCocina;
  } catch (error) {
      console.error('Hubo un error en el fetch:', error);
  }
  
}

// con esta funcion actualizamos en la tabla para que aparezcan los instrumentos de cocina
async function actualizarFilas() {
  // Función que actualiza las filas de la tabla de la view

    let tableBody = document.getElementById("tBody")
    tableBody.innerHTML = "" // Se eliminan las filas
    
    let instrumentos = await obtenerObjetosCocina() // esta variable guarda los instrumentos de inventario que pertenecen a cocina
    console.log(instrumentos)
    instrumentos.forEach(instrumento => {
      // Por cada instrumento se agrega una fila al tbody de la tabla

      // Se crean las celdas con la información del instrumento
      let filaTabla = document.createElement("tr")
      filaTabla.className = "table-row" 

      let celdaId = document.createElement("td") 
      celdaId.className = "row-cell" 
      celdaId.textContent = `${instrumento.id_general}`

      let celdaNombre = document.createElement("td") 
      celdaNombre.className = "row-cell-name" 
      celdaNombre.textContent = `${instrumento.nombre}`

      let celdaFunciona = document.createElement("td") 
      celdaFunciona.className = "row-cell"
      if (instrumento.funciona_estado == 1) {
        celdaFunciona.textContent = `Funciona`
      }
      else if (instrumento.funciona_estado == 0) {
        celdaFunciona.textContent = "No funciona"
      }
      // Se agregan las celdas con los datos a la fila
      filaTabla.appendChild(celdaId)
      filaTabla.appendChild(celdaNombre)
      filaTabla.appendChild(celdaFunciona)

      tableBody.appendChild(filaTabla) // Se agrega la fila al tbody
    })
}

// agregamos el evento al boton reportar falla
let reportarButton = document.querySelector("#botonFalla")
reportarButton.addEventListener("click", async function () {
  if(confirm("Estas seguro que deseas reportar?")){
    // Función que toma el id del input, reporta el fallo del instrumento y muestra los cambios en la view 

    let input = document.getElementById("searchInput")
    id = parseInt(input.value)
    await funcionBotonReporte(id, 0)
    actualizarFilas()
    input.value = ""
    alert("Instrumento Resportado")
  } else {
    return null
  }
})

// agregamos el evento al boton reportar arreglo
let reportarButtonArreglo = document.querySelector("#botonArreglo")
reportarButtonArreglo.addEventListener("click", async function () {
  if(confirm("Estas seguro que deseas reportar?")){
    // Función que toma el id del input, reporta el fallo del instrumento y muestra los cambios en la view 

    let input = document.getElementById("searchInput")
    id = parseInt(input.value)
    await funcionBotonReporte(id, 1)
    actualizarFilas()
    input.value = ""
    alert("Instrumento Resportado")
  } else {
    return null
  }
})

let buttonSolicitar = document.querySelector("#botonSolicitud")
buttonSolicitar.addEventListener("click",()=>{
  window.location.href = '/mantenimientos/escribirReporte';
})

document.addEventListener('DOMContentLoaded', function() {
  // Se cargan las filas en la tabla después de cargarse el HTML
  actualizarFilas()
})

setInterval(actualizarFilas, 30000); // Actualizar cada 30 segundos