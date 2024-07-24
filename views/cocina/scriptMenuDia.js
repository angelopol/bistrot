async function obtenerPlatos() {
    let comidas = []

    const options = {
        method: 'GET', 
        headers: {
        'Content-Type': 'application/json' 
        }
    };
    await fetch(`/cocina?tipo_comida:isnull=true&tipo_bebida:isnull=true`, options)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
    .then(data => {
        comidas = data
        console.log("Se han obtenido exitosamente el recetario: ", comidas)
    })
    .catch(error => {
        console.error("Error al obtener las recetas: ", error)
    })

    return comidas
}

async function cargarPlatos() {
    const comidas = await obtenerPlatos()
    const tbody = document.getElementById("tbody")
    tbody.innerHTML = ""
    
    for (const comida of comidas) {
        if (comida.seleccionada == 1) {
            const row = document.createElement("tr")
            row.className = "table-row" 
            row.id = `${comida.id}`

            let celdaId = document.createElement("td") 
            celdaId.className = "row-cell"
            celdaId.textContent = `${comida.id}`

            let celdaNombre = document.createElement("td") 
            celdaNombre.className = "row-cell-name" 
            celdaNombre.textContent = `${comida.nombre}`

            let celdaTipo = document.createElement("td") 
            celdaTipo.className = "row-cell" 

            if (comida.tipo_comida) {
                celdaTipo.textContent = `${comida.tipo_comida}`
            }
            else if (comida.tipo_bebida) {
                celdaTipo.textContent = `${comida.tipo_bebida}`
            }
            row.appendChild(celdaId)
            row.appendChild(celdaNombre)
            row.appendChild(celdaTipo)
            tbody.appendChild(row)
        }
    }
}

cargarPlatos()