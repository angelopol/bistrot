var comidaID = 0 // Variable global que permite previsualizar los detalles
var menuDia = [] // Variable global que almacena los id de los platos agregados, luego se usa al cerrar el pedido
var imagenes = { // Diccionario feo que guarda las rutas de la imagen del cada plato para no tener que hacerlo en base de datos
    "1": "Newfolder/seasonalsoupentrada.jpeg",
    "2": "NewFolder/sopadecalabacin.jpg",
    "3": "NewFolder/panrilletes.jpg",
    "4": "NewFolder/speltandmushroomSalad.jpeg",
    "5": "NewFolder/respaldodelinguinepasta.jpeg",
    "6": "Newfolder/chickenratatouillemed-scaled.jpg",
    "7": "Newfolder/OIP.jpeg",
    "8": "Newfolder/sauteedchicken.jpeg",
    "9": "Newfolder/Chocolate mouse.jpeg",
    "10": "Newfolder/fruitsalad.webp",
    "11": "NewFolder/apple tart.jpg",
    "12": "Newfolder/chocolatecake.jpg",
    "13": "NewFolder/mojito.jpeg",
    "14": "NewFolder/daiquiri de fresa.webp",
    "15": "NewFolder/old fashioned.png",
    "16": "NewFolder/margarita.jpg",
    "17": "NewFolder/sopadecalabacin.jpg",
    "18": "NewFolder/sopadecalabacin.jpg",
    "19": "NewFolder/sopadecalabacin.jpg",
    "20": "NewFolder/sopadecalabacin.jpg",
    "21": "NewFolder/cocacola.jpeg",
    "22": "NewFolder/coca cola cheerry.jpeg",
    "23": "NewFolder/fanta orange.jpeg",
    "24": "NewFolder/sprite.jpg",
    "25": "NewFolder/vittel.jpeg",
    "26": "NewFolder/guiso.jpg",
    "27": "NewFolder/vegetalesvonagreta.jpeg",
    "28": "NewFolder/mixdeverduras.jpg",
    "29": "NewFolder/tomateconfitado.jpeg",
    "30": "NewFolder/patats.jpeg",
    "31": "Newfolder/linguinipastaconratatouille.jpeg",
    "32": "NewFolder/pure.jpeg",
    "33": "Newfolder/Screenshot_15-7-2024_102959_www.bing.com.jpeg"
}
// TODAS las siguientes funciones son unicamente para el funcionamiento de la tabla

async function obtenerPlatos() {
    let comidas = []

    const options = {
        method: 'GET', 
        headers: {
        'Content-Type': 'application/json' 
        }
    };
    await fetch(`http://localhost:1234/cocina?tipo_comida:isnull=true&tipo_bebida:isnull=true`, options)
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
        const response = await fetch(`http://localhost:1234/inventario/api/cocina-bar/${id}`, options);
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
            await fetch(`http://localhost:1234/cocina/comida/${e.currentTarget.id}`, options)
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
    
            for (const idReceta in imagenes) {
                if (comidaID === idReceta) {
                    imagen.src = imagenes[idReceta]
                }
            }
    
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

document.addEventListener("DOMContentLoaded", cargarPlatos()) // Solo se cargan una vez



// Funciones para los botones

const botonAgregar = document.getElementById("btn-add") 
botonAgregar.addEventListener("click", async function () {
    if (comidaID != 0) {
        console.log(comidaID)
        for (const platoID in menuDia) {
            if (parseInt(comidaID) === platoID) {
                return alert("El plato ya fue agregado al menú del día, elija otro.")
            }
        }

        menuDia.push(parseInt(comidaID))
        const fila = document.getElementById(comidaID)
        fila.classList.remove("clicked")
        comidaID = 0
        console.log(menuDia)
    }
    else {
        return alert("No se ha seleccionado ningún plato")
    }
})

const botonConfirmar = document.getElementById("btn-send") 
botonConfirmar.addEventListener("click", async function () {
    for (let platoID in menuDia) {
        const cambios = {
            "seleccionada": 1
        }
        const options = {
            method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify(cambios)
        };
        await fetch(`http://localhost:1234/cocina/comida/${menuDia[platoID]}`, options)
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); 
          })
        .then(data => {
            comidas = data
            console.log(`El plato de ID ${menuDia[platoID]} ha sido agregado al menú del día`)
        })
        .catch(error => {
            console.error("Error al agregar la receta al menu del dia: ", error)
        })
    }
})