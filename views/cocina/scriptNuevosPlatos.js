var comidaID = 0 // Variable global que permite previsualizar los detalles

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

async function obtenerNombreIngredientePorID(id) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const response = await fetch(`/inventario/api/cocina-bar/${id}`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Se ha obtenido exitosamente el ingrediente: ", data.nombre);
        let ingrediente = data.nombre
        return ingrediente;
    } catch (error) {
        console.error("Error al obtener las recetas: ", error);
    }
}


async function cargarPlatos() {
    const comidas = await obtenerPlatos()

    const tbody = document.getElementById("tbody")
    tbody.innerHTML = ""
    
    for (const comida of comidas) {
        if (comida.id > "33") {
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
            row.addEventListener("click", async function (e) {
                
            
                let filas = document.querySelectorAll('.table-row'); 
                filas.forEach(filaAux => {
                    if (!(filaAux == e.currentTarget)){
                        filaAux.classList.remove("clicked")
                    }
                })
                e.currentTarget.classList.toggle("clicked")
                comidaID = e.currentTarget.id
                let comida = null

                const options = {
                    method: 'GET', 
                    headers: {
                    'Content-Type': 'application/json' 
                    }
                };
                await fetch(`/cocina/comida/${e.currentTarget.id}`, options)
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json(); 
                })
                .then(data => {
                    comida = data[0]
                })
                .catch(error => {
                    console.error("Error al obtener las recetas: ", error)
                })

                const ingredientes = JSON.parse(comida.ingredientes)
                const imagen = document.getElementById("img-plato") 
                const verNombre = document.getElementById("input-name") 
                const verIngredientes = document.getElementById("input-ingre")
                imagen.src = "NewFolder/elkikequerie.jpeg"
                
                verNombre.innerText = comida.nombre
                let ingredientesAux = ""
                for (const ingrediente in ingredientes) {
                    let ingredienteNombre = await obtenerNombreIngredientePorID(parseInt(ingrediente))
                    ingredientesAux = `${ingredientesAux}${ingredienteNombre} ${ingredientes[ingrediente]}x. `
                }
                verIngredientes.innerText = ingredientesAux
        
                console.log("Se ha obtenido exitosamente la receta: ", comida.nombre)
            })
            tbody.appendChild(row)
        }
    }
}

document.addEventListener("DOMContentLoaded", cargarPlatos()) // Solo se cargan una vez
