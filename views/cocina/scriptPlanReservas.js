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
        if (reserva.preferencias != "") {
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
    
            let numeroMesas = (reserva.ID_mesa.toString()).split(", ")
    
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
                if (reserva.preferencias == null){
                    return alert("No se han seleccionado platos para esta reserva")
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

let botonIngredientes = document.querySelector("#btnIngredientes")
botonIngredientes.addEventListener("click", async ()=> {
    if(reservaID == ""){
        return alert("Seleccione una reserva")
    }
    let reservas = await obtenerReservas()
    let reserva = null
    reservas.forEach(objetoReserva => {
        if(objetoReserva.numero_reserva == reservaID){
            reserva = objetoReserva
        }
    })
    let numeroMesas = reserva.ID_mesa.split(",")
    if(numeroMesas.length > 16){
        return alert("Solo se compran ingredientes con reservas individuales")
    }

    // Hacemos que las recetas que haya reservado el comensal se carguen en el menu del dia
    let preferencias = JSON.parse(reserva.preferencias)
    let idPlatos = Object.keys(preferencias) // lista con los id de los platos seleccionados
    let cantidadesPlatos = Object.values(preferencias)

    for (let platoID in idPlatos) {
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
        await fetch(`/cocina/comida/${idPlatos[platoID]}`, options)
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); 
          })
        .then(data => {
            console.log(`El plato de ID ${idPlatos[platoID]} ha sido agregado al menú del día`)
        })
        .catch(error => {
            console.error("Error al agregar la receta al menu del dia: ", error)
        })
    }

    // obtenemos las comidas

    let fetchPromises = idPlatos.map(async idPlato => {
        let res = await fetch(`/cocina/comida/${idPlato}`)
        let nombrePlato = await res.json();
        return nombrePlato[0]; // objeto comida
    })

    let comidas = await Promise.all(fetchPromises); // array con los objetos comidas

    let ingredientesRequeridos = {}
        for(let i = 0; i < comidas.length ; i++){
            let ingredientesParaComida = JSON.parse(comidas[i].ingredientes) // {"2":1}
            
            Object.keys(ingredientesParaComida).forEach(idIngredienteRequerido => {
                if (idIngredienteRequerido in ingredientesRequeridos){
                    ingredientesRequeridos[idIngredienteRequerido] += parseFloat(parseFloat(ingredientesParaComida[idIngredienteRequerido]) * parseInt(cantidadesPlatos[i]))
                }
                else{
                    ingredientesRequeridos[idIngredienteRequerido] = parseFloat(parseFloat(ingredientesParaComida[idIngredienteRequerido]) * parseInt(cantidadesPlatos[i]))
                }
            })
    }
    
    Object.keys(ingredientesRequeridos).forEach(async idIngredienteRequerido => {
        let nombreIngrediente = ""
        let ingrediente = await fetch(`/inventario/api/cocina-bar/${idIngredienteRequerido}`)
        ingrediente = await ingrediente.json()
        nombreIngrediente = ingrediente.nombre
        const solicitud = {
            depar: 'cocina', // departamento que realiza la solicitud
            id_emp: "1", // ID del empleado que realiza la solicitud, ajustar según corresponda
            cant: Math.ceil(ingredientesRequeridos[idIngredienteRequerido]).toString(),
            nombre_producto: nombreIngrediente,
            fecha: new Date(),
            detalle: 'Solicitud por falta de insumo para producior un pedido'
        };
        // Enviar solicitud de compra
        try{
            await fetch('/compras-index/soli', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(solicitud)
            });
            console.log("solicitud enviada")
        }
        catch(e){
            console.log(`Error: `, e)
        }
    })

    alert("Solicitud para comprar los ingredientes para la reserva enviada correctamente")
})