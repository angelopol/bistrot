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

    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Acción: ' + this.textContent);
        });
    });

    const orderReadyButton = document.querySelector('.order-ready');
    orderReadyButton.addEventListener('click', function() {
        alert('Pedido marcado como listo');
    });
});

async function actualizarPedidos() {
    try {

        // esta ruta hay que importarla de ventas, no es la ruta definitiva
        const response = await fetch('http://localhost:3000/modulo-ventas/factura'); /*Importar Modulo externo VENTAS*/
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de pedidos');
        }
        const pedidos = await response.json();

        // Iterar sobre los pedidos y actualizar las order-cards
        pedidos.forEach(pedido => {
            if (pedido.status == "pendiente") {
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

// Llamar a la función para actualizar los pedidos inicialmente
actualizarPedidos();
// Llamar a la función cada cierto tiempo para actualizar los pedidos (por ejemplo, cada 30 segundos)
setInterval(actualizarPedidos, 15000); // Actualizar cada 15 segundos (15000 milisegundos)

//boton procesar
var idPedido = null
let botonProcesar = document.querySelector("#botonProcesar") // colocar este id en el boton procesar 
botonProcesar.addEventListener("click" , async () => {
if (idPedido == null){
    alert("Seleccione un pedido")
    return null
}
let idCardSeleccionada = idPedido 
let response = await fetch(`http://localhost:1234/comidas/procesar-pedido?pedido_id=${idCardSeleccionada}`)
let pedido = await response.json()
if (pedido.status == "aceptado"){
    let cardMesa = document.querySelector(`#${idCardSeleccionada}`)
    let cardMesaStatus = cardMesa.lastElementChild;
    cardMesaStatus.textContent = `ID pedido: ${idCardSeleccionada} \nEstatus: Cocinando`;
}
else if(pedido.status == "rechazado"){
    alert("No se cuenta con los recursos para realizar este pedido")
    let cardMesa = document.querySelector(`#${idCardSeleccionada}`)
    let cardMesaStatus = cardMesa.lastElementChild;
    cardMesaStatus.textContent = `ID pedido: ${idCardSeleccionada} \nEstatus: Rechazado`;
}
})

const pedidosContainers = document.getElementsByClassName("order-card") //cartas de pedidos
pedidosContainers.forEach(container => {
container.addEventListener("click", async function () {
    let idStringCardSeleccionada = this.getAtributte("id")
    idPedido = parseInt(idStringCardSeleccionada.replace("#", "")) // Obtenemos el id del pedido

    fetch(`http://localhost:1234/comidas/mostrar-pedido?pedido_id=${idPedido}`, {
        method: "GET",
        headers: {
            "content-type": "aplication/json"
        }
    })
      .then(response => {response.json})
      .then(data => {
        
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

        // {"2":1 , "3":1}
        Object.keys(comidasPedido).forEach(platoId => {
            
            // Iteramos el diccionario de pedidos para encontrar sus nombres
            let res = fetch(`http://localhost:1234/comidas/${platoId}`) // Se busca la receta en el modelo comida
            let nombrePlato = res.json()
            pTag.textContent = `${pTag.textContent} , . ` // Elemento provisional que contiene la información de los platos pedidos
            
            let divItem = document.createElement("div")
            divItem.className = "order-item" // div que almacena el nombre y cantidad de platos

            let itemName = document.createElement("span")
            itemName.className = "item-name"
            itemName.innerHTML = `${nombrePlato.nombre}` // span con el nombre del plato

            let itemDetail = document.createElement("span")
            itemName.className = "item-detail"
            itemName.innerHTML = `x${comidasPedido[platoId]}` // span con la cantidad del plato

            divItem.appendChild(itemName)
            divItem.appendChild(itemDetail)
            contenedorPedido.appendChild(divItem)
        })

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
if (idPedido == null){
    alert("Seleccione un pedido")
    return null
}
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
    cardPedidoStatus.textContent = `ID pedido: ${idPedido} \nEstatus: Listo`;
  })
  .catch(e => {
    console.error(`Ha ocurrido un error al buscar el pedido en la base de datos.`, e)
  })
})

let devolverBoton = document.querySelector("#botonDeolver")
devolverBoton.addEventListener("click" , async ()=>{
if (idPedido == null){
    alert("Seleccione un pedido")
    return null
}
let cardPedido = document.getElementById(`${idPedido}`)
cardPedido.classList.remove("ocupado")
let cardPedidoStatus = cardPedido.lastElementChild;
cardPedidoStatus.textContent = ``;
})