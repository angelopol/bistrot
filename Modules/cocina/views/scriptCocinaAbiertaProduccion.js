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

// funcion para actualizar en las vistas los pedidos (objetos factura de ventas) en las vistas
async function actualizarPedidos() {
    try {
        // Metodo que verifica si hay pedidos "pendientes" por procesar, y se muestran en la view.

        // esta ruta hay que importarla de ventas,
        const response = await fetch('http://localhost:3000/ventas/factura'); 
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de pedidos');
        }
        const pedidos = await response.json(); // aqui se guardaria un arreglo de todos los pedidos(facturas) almacenados por ventas

        // Iterar sobre los pedidos y actualizar los order-card
        pedidos.forEach(pedido => {

            // si el status_pedido es igual a 1, entonces es una orden pendiente
            if (pedido.status_pedido == 1) {

                // seleccionamos todas las order-card (los contenedores con los pedidos que se muestrabn en las views)
                let cardsMesas = document.querySelectorAll(".order-card")

                // iteramos cada contenedor
                for (const cardMesa of cardsMesas) {

                    // si el contenedor no esta ocupado por otro pedido
                    if (!cardMesa.classList.contains("ocupado")) {

                        // al id del contenedor le asignamos el id del pedido
                        cardMesa.id = pedido.id_cliente.toString();
                        // al contenedor le agregamos la clase de ocupado
                        cardMesa.classList.add("ocupado");

                        //seecionamos el ultimo hijo que es el que muestra el texto del pedido en las views
                        let carMesaStatus = cardMesa.lastElementChild;
                        
                        //Le colocamos el texto al contenedor del pedido
                        carMesaStatus.innerHTML = `ID pedido: ${pedido.id_cliente} <br>Estatus: pendiente`;
                        break; 
                    }
                }
            }
        }
        )
    } catch (error) {
        console.error('Error al actualizar los pedidos:', error);
    }
}
setInterval(actualizarPedidos, 15000); // Actualizar la vista de los pedidos cada 15 segundos (15000 milisegundos)

//boton procesar
var idPedido = "" // Esta variable guarda los id de los contenedores de pedidos de que se seleccionen en las vistas que a su vez, coinciden con los id de los pedidos que guarda ventas en la base de datos

// obtenemos el boton procesar
let botonProcesar = document.querySelector("#botonProcesar")

// le añadimos un evento a este boton procesar
botonProcesar.addEventListener("click" , async () => {
    // Evento asignado al botón de "Procesar". Se encarga de validar si se tienen ingredientes e instrumentos disponibles

    if (idPedido == ""){
        alert("Seleccione un pedido")
        return null
    }

    let idCardSeleccionada = idPedido // se guarda el id del pedido seleccionado

    // hacemos una peticion a este endpoint (que es de cocina, que a su vez usa internamente un endpoint de ventas) para que verifique si se puede hacer el pedido cuyo id es el que le pasamos por la url, y ademas este endpoint retorna ese pedido
    let response = await fetch(`http://localhost:1234/comidas/procesar-pedido?pedido_id=${idCardSeleccionada}`) // Petición que lleva al controlador de cocina

    let pedido = await response.json() // Se toma el pedido retornado por el controlador, el ya valido si se puede realizar la comida y se sabe accediendo a su atributo de estatus

    // si el estatus pedido es 3, entonces se acepta el pédido, y se puede preparar las comidas/bebidas
    if (pedido.status_pedido == 3){

        // se obtiene el contenedor del pedido seleccionado
        let cardMesa = document.querySelector(`#${idCardSeleccionada}`)
        let cardMesaStatus = cardMesa.lastElementChild;
        cardMesaStatus.innerHTML = `ID pedido: ${idCardSeleccionada} <br>Estatus: preparando`;
        // Al aceptarse el pedido se considera (en la view) que inicia la preparacion 
    }

    // si el estatus del pedido es 2, entonces se rechaza el pedido porque no se cuentan con los recursos para procesarlo
    else if(pedido.status_pedido == 2){
        alert("No se cuenta con los recursos para realizar este pedido")
        let cardMesa = document.querySelector(`#${idCardSeleccionada}`)
        let cardMesaStatus = cardMesa.lastElementChild;
        cardMesaStatus.innerHTML = `ID pedido: ${idCardSeleccionada} \nEstatus: Rechazado`;
        // Al rechazarse Ventas debe manejar el pedido
    }
})


// aqui le damos la funcionalidad a los contenedores de los pedidos cuando se le den click
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


        // al id del contenedor que coincide con el id del pedido, se lo asignamos al variable global que guarda los id
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

            let pedido = data
            let comidasPedido = JSON.parse(pedido.consumo) // Obtenemos el diccionario con los id de los platos y la cantidad

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


// accedemos al boton listo
const listoButton = document.querySelector(".order-ready")

// le agregamos el evento al boton listo
listoButton.addEventListener("click", async function () {
    // Evento que cambia el estado del pedido

    // accedemos al contenedor que contiene el pedido seleccionado
    let cardSeleccionada = document.getElementById(idPedido.toString())

    if (idPedido === ""){
        // Se verifica que haya un pedido seleccionado
        alert("Seleccione un pedido")
        return null
    }
    else if (!cardSeleccionada.innerHTML.includes("preparando")){
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
        cardPedidoStatus.innerHTML = `ID pedido: ${idPedido}<br>Estatus: listo`; // Se muestra el cambio en la view
        idPedido = ""
    })
    .catch(e => {
        console.error(`No se ha encontrado un pedido en la base de datos con el ID dado.`, e)
    })
    })

// le agregamos un evento al boton devolver, que sirve para quitar de las vistas las ordenes rechazadas
let devolverBoton = document.querySelector("#botonDevolver")
devolverBoton.addEventListener("click" , async ()=>{
    console.log("hola")
    // Evento que elimina de la carta seleccionada un pedido

    if (idPedido == ""){
        alert("Seleccione un pedido")
        return null
    }
    let cardSeleccionada = document.getElementById(idPedido.toString())

    // si el pedido no ha sido rechazado entonces no se puede devolver
    if (!cardSeleccionada.innerHTML.includes("rechazado")){
        alert("Solo se pueden devolver pedidos que hayan sido rechazados")
    }

    let cardPedido = document.getElementById(`${idPedido}`)
    cardPedido.classList.remove("ocupado")
    let cardPedidoStatus = cardPedido.lastElementChild;
    cardPedidoStatus.textContent = ``;
    idPedido = ""
})


// evento boton hacer de nuevo en caso de que haya habido un incidente en la cocina
let botonHacerNuevo = document.querySelector("#botonHacerNuevo")
botonHacerNuevo.addEventListener("click" , async ()=> {

    if (idPedido == ""){
        alert("Seleccione un pedido")
        return null
    }

    let idCardSeleccionada = idPedido // se guarda el id del pedido seleccionado

    // hacemos una peticion a este endpoint (que es de cocina, que a su vez usa internamente un endpoint de ventas) para que verifique si se puede hacer el pedido cuyo id es el que le pasamos por la url, y ademas este endpoint retorna ese pedido
    let response = await fetch(`http://localhost:1234/comidas/procesar-pedido?pedido_id=${idCardSeleccionada}`) // Petición que lleva al controlador de cocina

    let pedido = await response.json() // Se toma el pedido retornado por el controlador, el ya valido si se puede realizar la comida y se sabe accediendo a su atributo de estatus

    // si el estatus pedido es 3, entonces se acepta el pédido, y se puede preparar las comidas/bebidas
    if (pedido.status_pedido == 3){

        // se obtiene el contenedor del pedido seleccionado
        let cardMesa = document.querySelector(`#${idCardSeleccionada}`)
        let cardMesaStatus = cardMesa.lastElementChild;
        cardMesaStatus.innerHTML = `ID pedido: ${idCardSeleccionada} <br>Estatus: preparando`;
        alert("Se cuenta con los recursos para volver a preparar el pedido") 
    }

    // si el estatus del pedido es 2, entonces se rechaza el pedido porque no se cuentan con los recursos para procesarlo
    else if(pedido.status_pedido == 2){
        alert("No se cuenta con los recursos para realizar de nuevo este pedido")
        let cardMesa = document.querySelector(`#${idCardSeleccionada}`)
        let cardMesaStatus = cardMesa.lastElementChild;
        cardMesaStatus.innerHTML = `ID pedido: ${idCardSeleccionada} \nEstatus: Rechazado`;
        // Al rechazarse Ventas debe manejar el pedido
    }
})