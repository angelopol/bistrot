var reservaID = ""

async function obtenerReservas() {
    let reservas = []

    const options = {
        method: 'GET', 
        headers: {
        'Content-Type': 'application/json' 
        }
    };
    await fetch(`/reservas/obtener-reservas`, options)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
    .then(data => {
        reservas = data
        console.log("Se han obtenido exitosamente las reservas: ", reservas)
    })
    .catch(error => {
        console.error("Error al obtener las reservas: ", error)
    })
    return reservas
}

async function obtenerNombrePlatoPorID(id) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const response = await fetch(`/cocina/comida/${id}`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Se ha obtenido exitosamente el plato: ", data.nombre);
        let plato = data[0].nombre
        return plato;
    } catch (error) {
        console.error("Error al obtener las recetas: ", error);
    }
}

async function cargarPlatos() {
    const reservas = await obtenerReservas()

    const tbody = document.getElementById("tbody")
    tbody.innerHTML = ""
    
    for (const reserva of reservas) {
        if (reserva.preferencias !== "") {
            const row = document.createElement("tr")
            row.className = "table-row" 
            row.id = `${reserva.numero_reserva}`
    
            let celdaId = document.createElement("td") 
            celdaId.className = "row-cell"
            celdaId.textContent = `${reserva.numero_reserva}`
    
            let celdaFecha = document.createElement("td") 
            celdaFecha.className = "row-cell-name" 
            celdaFecha.textContent = `${reserva.fecha.split("T")[0]}`
    
            let celdaTipo = document.createElement("td") 
            celdaTipo.className = "row-cell" 
    
            let numeroMesas = (reserva.ID_mesa).split(", ")
    
            if (numeroMesas.length === 16) {
                celdaTipo.textContent = `Completa`
            }
            else if (numeroMesas.length < 16) {
                celdaTipo.textContent = `Individuales`
            }
            row.appendChild(celdaId)
            row.appendChild(celdaFecha)
            row.appendChild(celdaTipo)
            row.addEventListener("click", async function (e) {
                let filas = document.querySelectorAll('.table-row'); 
                filas.forEach(filaAux => {
                    if (!(filaAux == e.currentTarget)){
                        filaAux.classList.remove("clicked")
                    }
                })
                e.currentTarget.classList.toggle("clicked")
                reservaID = e.currentTarget.id
                let reservas = await obtenerReservas()
                let reserva = null
    
                for (let reservaAux of reservas) {
                    if (reservaAux.numero_reserva == reservaID) {
                        reserva = reservaAux
                        break
                    }
                }
                const platos = JSON.parse(reserva.preferencias)
                const platosDetalles = document.getElementById("input-ingre")
                
                let platosAux = ""
                console.log(reserva.preferencias)
                for (const plato in platos) {
                    console.log(plato)
                    let platoNombre = await obtenerNombrePlatoPorID(plato)
                    platosAux = `${platosAux}${platoNombre} ${platos[plato]}x. `
                }
                platosDetalles.innerText = platosAux
        
                console.log("Se han obtenido exitosamente los platos de la reservación: ", reservaID)
            })
            tbody.appendChild(row)
        }
    }
}

document.addEventListener("DOMContentLoaded", cargarPlatos()) // Solo se cargan una vez