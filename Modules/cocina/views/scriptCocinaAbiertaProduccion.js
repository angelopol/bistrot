document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('filter-active'));
            filterButtons.forEach(btn => btn.classList.add('filter-inactive'));
            this.classList.remove('filter-inactive');
            this.classList.add('filter-active');
        });
    });
});

async function actualizarPedidos() {
    try {
        // Metodo que verifica si hay pedidos "pendientes" por procesar, y se muestran en la view.

        // esta ruta hay que importarla de ventas, no es la ruta definitiva
        const response = await fetch('http://localhost:3000/ventas/factura'); // Peticion a ventas que retorna el pedido
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de pedidos');
        }
        const pedidos = await response.json();

        // Iterar sobre los pedidos y actualizar las order-cards
        pedidos.forEach(pedido => {
            if (pedido.status_pedido == 1) {
                let cardsMesas = document.querySelectorAll(".order-card")
                for (const cardMesa of cardsMesas) {
                    if (!cardMesa.classList.contains("ocupado")) {
                        cardMesa.id = pedido.id.toString();
                        cardMesa.classList.add("ocupado");
                        let carMesaStatus = cardMesa.lastElementChild;
                        carMesaStatus.textContent = `ID pedido: ${pedido.id} \nEstatus: ${pedido.status}`;
                        encontrado = true;
                        break; // Detener el bucle una vez que se haya encontrado y actualizado una cardMesa
                    }
                }
            }
        }
        )
    } catch (error) {
        console.error('Error al actualizar los pedidos:', error);
    }
}


actualizarPedidos(); // Llamar a la función para actualizar los pedidos inicialmente
setInterval(actualizarPedidos, 15000); // Actualizar cada 15 segundos (15000 milisegundos)

//boton procesar
var idPedido = null // Se declara de forma global para usarse en las siguientes funciones (Por lo que su valor cambia)
let botonProcesar = document.querySelector("#botonProcesar")
botonProcesar.addEventListener("click" , async () => {
    // Evento asignado al botón de "Procesar". Se encarga de validar si se tienen ingredientes e instrumentos disponibles

    if (idPedido == null){
        alert("Seleccione un pedido")
        return null
    }
    let idCardSeleccionada = idPedido 
    let response = await fetch(`http://localhost:1234/comidas/procesar-pedido?pedido_id=${idCardSeleccionada}`) // Petición que lleva al controlador de cocina
    let pedido = await response.json() // Se toma el pedido retornado por el controlador, el cual hace la validación y cambia el estado del pedido
    if (pedido.status_pedido == 3){
        let cardMesa = document.querySelector(`#${idCardSeleccionada}`)
        let cardMesaStatus = cardMesa.lastElementChild;
        cardMesaStatus.textContent = `ID pedido: ${idCardSeleccionada} \nEstatus: Cocinando`;
        // Al aceptarse el pedido se considera (en la view) que inicia la cocción 
    }
    else if(pedido.status == 2){
        alert("No se cuenta con los recursos para realizar este pedido")
        let cardMesa = document.querySelector(`#${idCardSeleccionada}`)
        let cardMesaStatus = cardMesa.lastElementChild;
        cardMesaStatus.textContent = `ID pedido: ${idCardSeleccionada} \nEstatus: Rechazado`;
        // Al rechazarse Ventas debe manejar el pedido
    }
})

const pedidosContainers = document.querySelectorAll(".order-card") //cartas de pedidos
pedidosContainers.forEach(container => {
    container.addEventListener("click", async function (e) {
        // Evento que muestra detalles del pedido, en la carta resumen, al clickear una de las cartas de pedidos

        // Efecto de seleccionado (Para permitir la selección de una sola carta a la vez)
        let otraVezMiDiv = document.querySelectorAll('.order-card');
        otraVezMiDiv.forEach(otraVezOrden => {
            if (!(otraVezOrden == e.target)){
                otraVezOrden.classList.remove("clicked")
            }
        })
        e.target.classList.toggle("clicked") 


        let idStringCardSeleccionada = e.target.id
        idPedido = idStringCardSeleccionada // Obtenemos el id del pedido

        // Petición al controlador de mostrar pedido, que retorna los datos del mismo
        fetch(`http://localhost:1234/comidas/mostrar-pedido?pedido_id=${idPedido}`, {
            method: "GET",
            headers: {
                "content-type": "aplication/json"
            }
        })
        .then(response => {response.json})
        .then(data => {
            // Se muestran los datos del pedido en la carta resumen

            let pedidos = data
            let comidasPedido = JSON.parse(pedidos.consumo) // Obtenemos el diccionario con los id de los platos y la cantidad

            let contenedorPedido = document.querySelector(".order-summary")
            contenedorPedido.innerHTML = "" // Se borra el contenido de la carta resumen de pedidos

            let elementoH3 = document.createElement("h3")
            elementoH3.className = "order-number"
            elementoH3.id = "order-id"
            elementoH3.textContent = `Pedido ID: ${idPedido}`
            contenedorPedido.appendChild(elementoH3) // Se agrega el id del pedido 

            let divPedido = document.createElement("div")
            divPedido.className = "order-type"
            divPedido.innerHTML = "PEDIDO"
            contenedorPedido.appendChild(divPedido) // Se agrega el indicador "PEDIDO"

            Object.keys(comidasPedido).forEach(platoId => {
                // Iteramos el diccionario de pedidos para encontrar sus nombres

                let res = fetch(`http://localhost:1234/comidas/${platoId}`) // Petición al modelo comidas que retorna al receta
                let nombrePlato = res.json()
                
                let divItem = document.createElement("div")
                divItem.className = "order-item" // div que almacena el nombre y cantidad de platos

                let itemName = document.createElement("span")
                itemName.className = "item-name"
                itemName.innerHTML = `${nombrePlato.nombre}` // span con el nombre del plato

                let itemDetail = document.createElement("span")
                itemDetail.className = "item-detail"
                itemDetail.innerHTML = `x${comidasPedido[platoId]}` // span con la cantidad del plato

                divItem.appendChild(itemName)
                divItem.appendChild(itemDetail)
                contenedorPedido.appendChild(divItem)
            })

            // Se agrega el botón listo que (ya que se elimina tmb al inicio del evento)
            let listoButton = document.createElement("button")
            listoButton.className = "order-ready"
            listoButton.value = "Listo"
            contenedorPedido.appendChild(listoButton)
        })
        .catch(e => {
            console.error(`Error al acceder a la base de datos de pedidos`, e)
        })
    })
})

const listoButton = document.querySelector(".order-ready")
listoButton.addEventListener("click", async function () {
    // Evento que cambia el estado del pedido

    let cardSeleccionada = document.getElementById(idPedido)
    let pedidoEstado = cardSeleccionada.textContent.split(/\s+/).pop() // Obtenemos el estado

    if (idPedido === null){
        // Se verifica que haya un pedido seleccionado
        alert("Seleccione un pedido")
        return null
    }
    else if (!pedidoEstado === "Cocinando"){
        // Se verifica que el pedido se haya aceptado antes de cambiar su estado a listo
        alert("Primero debe procesar el pedido")
        return null
    }
    // Petición al controlador de pedidos que cambia el estado del pedido a listo
    fetch(`http://localhost:1234/comidas/pedido-listo?pedido_id=${idPedido}`, {
            method: "GET",
            headers: {
                "content-type": "aplication/json"
            }
        })
    .then(response => {response.json})
    .then(() => {
        let cardPedido = document.getElementById(`${idPedido}`)
        cardPedido.classList.remove("ocupado")
        let cardPedidoStatus = cardPedido.lastElementChild;
        cardPedidoStatus.textContent = `ID pedido: ${idPedido} \nEstatus: Listo`; // Se muestra el cambio en la view
    })
    .catch(e => {
        console.error(`No se ha encontrado un pedido en la base de datos con el ID dado.`, e)
    })
    })

let devolverBoton = document.querySelector("#botonDevolver")
devolverBoton.addEventListener("click" , async ()=>{
    // Evento que elimina de la carta seleccionada un pedido

    if (idPedido == null){
        alert("Seleccione un pedido")
        return null
    }
    let cardPedido = document.getElementById(`${idPedido}`)
    cardPedido.classList.remove("ocupado")
    let cardPedidoStatus = cardPedido.lastElementChild;
    cardPedidoStatus.textContent = ``;
})


// evento boton hacer de nuevo
let botonHacerNuevo = document.querySelector("#botonHacerNuevo")
botonHacerNuevo.addEventListener("click" , async ()=> {
    // El mismo código del evento del botón procesar xd

    if (idPedido == null){
        alert("Seleccione un pedido")
        return null
    }
    let idCardSeleccionada = idPedido 
    let response = await fetch(`http://localhost:1234/comidas/procesar-pedido?pedido_id=${idCardSeleccionada}`)
    let pedido = await response.json()
    if (pedido.status == 3){
        let cardMesa = document.querySelector(`#${idCardSeleccionada}`)
        let cardMesaStatus = cardMesa.lastElementChild;
        cardMesaStatus.textContent = `ID pedido: ${idCardSeleccionada} \nEstatus: Cocinando`;
    }
    else if(pedido.status == 2){
        alert("No se cuenta con los recursos para realizar este pedido")
        let cardMesa = document.querySelector(`#${idCardSeleccionada}`)
        let cardMesaStatus = cardMesa.lastElementChild;
        cardMesaStatus.textContent = `ID pedido: ${idCardSeleccionada} \nEstatus: Rechazado`;
    }
})