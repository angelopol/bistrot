const PathUrl = "http:localhost:1234/ventas/";
// Seleccionar todos los botones de acción
const actionButtons = document.querySelectorAll('.action-button');

// Seleccionar todas las tarjetas de mesa
const tableCards = document.querySelectorAll('.table-card');

// declarar una variable de origen para saber en la vista de pedido quien hizo la solicitud (terraza, general)
const origen = 'general';

// obtener las mesas que ya han pagado su comida
const mesas_pagadas_general = JSON.parse(localStorage.getItem('mesas_pagadas_general')) || [];

// Obtener los pedidos que se han realizado
const pedidos_realizados = JSON.parse(localStorage.getItem('pedidos')) || [];

// actualizacion constante de los estados
recorrido_mesas(pedidos_realizados)


// actualizacion de las mesas cuando ya pagaron la cuenta

function limpiar_mesas_general(){

    console.log(mesas_pagadas_general)
    if (mesas_pagadas_general.length > 0){
    
        pedidos_realizados.forEach((pedidos,index) => {
            
            mesas_pagadas_general.forEach((mesas,id_mesas) => {

                
                if (parseInt(pedidos.tableId) === mesas.mesa){
                    
                    update_mesas_pagadas(mesas.mesa);
                    pedidos_realizados.splice(index, 1);
                    localStorage.setItem('pedidos', JSON.stringify(pedidos_realizados));
                    console.log(pedidos_realizados)
                    return;
                }
            })
            
        })

        mesas_pagadas_general.forEach((pedidos, index) => {
    
            tableCards.forEach((mesas,id_mesas) => {
    
                // estatus pedidos
                if (pedidos.mesa === id_mesas+1){
                    console.log(index)
                    const tableStatusElement = mesas.querySelector('.table-status');
                    tableStatusElement.textContent = 'DISPONIBLE';
                    alert(`Mesa ${pedidos.mesa} limpiada`)
                    mesas_pagadas_general.splice(index,1)
                    localStorage.setItem('mesas_pagadas_general', JSON.stringify(mesas_pagadas_general))
                    console.log(mesas_pagadas_general)
                    return;
                }
            })
            
        })
    
        
    } else {
        console.log("Todavia no se han pagado mesas, entonces no pueden ser limpiadas")
    }

}



// Variable para almacenar el ID de la mesa seleccionada
let selectedTableId = null;
let selectedMesa = false;
let selectedMesaetiqueta = null;

// Agregar evento de clic a cada botón de acción    
actionButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Obtener el texto del botón
        const buttonText = this.textContent;

        // Realizar acción según el texto del botón
        switch (buttonText) {
            case 'Tomar pedido':
                // Abrir pedidos.html y pasar el ID de la mesa seleccionada
                if (selectedTableId && selectedMesa) {

                    // verificamos si su estatus es disponible, reservado o rechazado para tomar su pedido
                    if (selectedMesaetiqueta.querySelector('.table-status').textContent === "DISPONIBLE" || selectedMesaetiqueta.querySelector('.table-status').textContent === "Rechazado" || selectedMesaetiqueta.querySelector('.table-status').textContent === "Reservado") {
                        location.href = `../Vista_Pedidos/pedidos?tableId=${selectedTableId}&origen=${origen}`;
                        return;
                    } else {
                        alert("No se puede tomar el pedido")
                    }
                    
                } else {
                    alert('Seleccione una mesa primero');
                }
                break;
            case 'Eliminar pedido': 
                // Restablecer el número de mesa y estado
                if (selectedTableId && selectedMesa) {
                    // recorremos todas las mesas para ver cual es el pedido que se quiere eliminar
                    tableCards.forEach((tableCard,mesa) => {

                        // vemos si coinciden en id
                        if(String(mesa+1) === String(selectedTableId)){

                            // si el estatus es disponible o reservado solamente lo deseleccionada
                            if (tableCard.querySelector(".table-status").textContent === "DISPONIBLE" || tableCard.querySelector(".table-status").textContent === "Reservado"){
                                tableCard.classList.remove('selected'); // Quitar la clase 'selected' al eliminar pedido
                                selectedMesa = false;
                                selectedTableId = null;
                                return;

                            // si es pendiente lo deseleccionada y elimina el pedido de la lista de pedidos realizados
                            } else if (tableCard.querySelector(".table-status").textContent === "Pendiente" || tableCard.querySelector(".table-status").textContent === "Rechazado"){

                                tableCard.classList.remove('selected'); // Quitar la clase 'selected' al eliminar pedido

                                pedidos_realizados.forEach((pedido,mesas) => {

                                    if (pedido.tableId === String(selectedTableId)){

                                        eliminar_pedido(parseInt(pedido.tableId)) // eliminar el pedido de la base de datos
                                        pedidos_realizados.splice(mesas, 1);
                                        selectedMesa = false;
                                        selectedTableId = null;
                                        tableCard.querySelector(".table-status").textContent = "DISPONIBLE" // ponemos el estatus como Disponible
                                        // Actualizar el localStorage con el array modificado
                                        localStorage.setItem('pedidos', JSON.stringify(pedidos_realizados));

                                        console.log(pedidos_realizados);
                                        return;

                                    }
                                });
                                
                            }
                            
                        }
                    });
                    
                } else {
                    alert('Seleccione una mesa primero');
                }
                break;
            case 'Solicitar factura':
                // Redirigir a la vista caja
                if (selectedTableId && selectedMesa) {

                    if (selectedMesaetiqueta.querySelector('.table-status').textContent === "Listo"){
                        imprimirFactura();
                    }
                    
                } else {
                    alert('Seleccione una mesa primero');
                }
                break;
            case 'Modificar Pedido':
                    if (selectedTableId && selectedMesa) {
                        const statusText = selectedMesaetiqueta.querySelector('.table-status').textContent.trim();
    
                        if (statusText === "Pendiente" || statusText === "Listo" || statusText === "Rechazado") {
                            location.href = `../Vista_Pedidos/pedidos?tableId=${selectedTableId}&origen=${origen}`;
                        } else {
                            alert("No se puede modificar el pedido");
                        }
                    } else {
                        alert('Seleccione una mesa primero');
                    }
                break;
            
        }
    });
});

// Agregar evento de clic a cada tarjeta de mesa
tableCards.forEach((tableCard, index) => {
    tableCard.addEventListener('click', function() {
        // Seleccionar la mesa actual
        selectedTableId = index + 1;

        // Desseleccionar las demás mesas
        tableCards.forEach(card => {
            card.classList.remove('selected');
        });


        // Seleccionar la mesa actual
        tableCard.classList.add('selected');
        selectedMesa = true;
        selectedMesaetiqueta = tableCard;

    });
});


function encontrar(mesa_id,pedidos_check) {
    let pedido = null;
    
    for (let i = 0; i < pedidos_check.length; i++) {
        let pedidoActual = pedidos_check[i];
        if (pedidoActual.tableId === String(mesa_id) && pedidoActual.estatus === 4) {
            alert('Pedido encontrado');
            pedido = pedidoActual;
            
            break;
        }
    }
    return pedido;
}

function imprimirFactura(){

    if (selectedTableId !== null && selectedMesa) {
    
        if (selectedMesaetiqueta.querySelector(".table-status").textContent === 'Listo'){
            // Seleccionar la mesa correspondiente basado en el índice
            let mesa = document.querySelectorAll('.table-card')[selectedTableId - 1];
            // Obtener el estado de la mesa
            let numeroMesa = mesa.querySelector('.table-name').textContent;

            // Obtener la mesa con estatus cuenta
            let pedido = encontrar(selectedTableId,pedidos_realizados);

            // Calcular el total del pedido
            let total = pedido.total

            const modalContainer = document.getElementById('divModal');
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.id = `modal-${selectedTableId}`;
            modal.innerHTML = `
                <div id="Modal${selectedTableId}" class="modal-content">
                    <span class="closeBtn" data-modal="modal-${selectedTableId}">&times;</span>
                    <h3>Factura</h3>
                    <p>Mesa: ${numeroMesa}</p>
                    <div class="factura-divider"></div>
                    ${pedido.items.map(item => `
                        <div class="factura-item">
                            <span class="item-nombre">${item.name}</span>
                            <span class="item-cantidad">x${item.quantity}</span>
                            <span class="item-precio">${item.price.toFixed(2)} €</span>
                        </div>
                    `).join('')}
                    <div class="factura-divider"></div>
                    <div class="factura-item">
                        <span class="item-nombre"><strong>Total</strong></span>
                        <span class="item-cantidad"></span>
                        <span class="item-precio"><strong>${total.toFixed(2)} €</strong></span>
                    </div>
                    <button class="button-cerrar-modal">Cerrar</button>
                </div>
            `;
            modalContainer.appendChild(modal);

            // Mostrar el modal y desactivar el scroll del cuerpo
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Asignar evento para cerrar el modal
            modal.querySelector('.closeBtn').addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'hidden';
            });

            modal.querySelector('.button-cerrar-modal').addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'hidden';
            });

        } else {
            alert("No se puede pedir cuenta")
        }
        
    }

}


// funcion para recorrer los pedidos realizados
function recorrido_mesas(pedidos_mesas){

    pedidos_mesas.forEach(pedidos => {

        tableCards.forEach((mesas,id_mesas) => {

            // estatus pedidos
            if (pedidos.estatus === 1 && pedidos.tableId === String(id_mesas+1)){
                const tableStatusElement = mesas.querySelector('.table-status');
                tableStatusElement.textContent = 'Pendiente';
            } else if(pedidos.estatus === 2 && pedidos.tableId === String(id_mesas+1)) {
                const tableStatusElement = mesas.querySelector('.table-status');
                tableStatusElement.textContent = 'Rechazado';
            } else if(pedidos.estatus === 3 && pedidos.tableId === String(id_mesas+1)) {
                const tableStatusElement = mesas.querySelector('.table-status');
                tableStatusElement.textContent = 'Aceptado';
            } else if(pedidos.estatus === 4 && pedidos.tableId === String(id_mesas+1)) {
                const tableStatusElement = mesas.querySelector('.table-status');
                tableStatusElement.textContent = 'Listo';
            }
        })
        
    })

    console.log(pedidos_realizados)
}


// funcion para ver si (Cocina-bar) hizo alguna actualizacion en los estatus de los pedidos
async function actualizacion_pedidos(){

    try {
        // obtener los pedidos
        const response = await fetch("../factura");

        if(!response.ok){
            if (response.status === 404) {
                console.log("La URL 'http:localhost:1234/ventas/factura' no se encontró.");
            } else {
                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }
        }

        const pedidos_bd = await response.json(); // se guarda una lista de los pedidos almacenados

        // obtengo el estatus y el id de la mesa que tienen un estatus diferente de 1 y pedidos realizados en la zona general y los almaceno en un array
        let cambio_estatus_mesas = pedidos_bd.filter(pedido => {
            return pedido.status_pedido !== 1 && pedido.status_pedido !== 5 && (pedido.zona === 'general' || pedido.zona === 'bar');  // el status 5 es para cuando el cliente pague y finalizase todo no nse toma en cuenta 
        }).map(pedido => {
            return {
                status: pedido.status_pedido,
                id_mesa: pedido.mesa
            };
        });


        // actualizar lo estatus de cada mesa
        if (cambio_estatus_mesas.length > 0){
            actualizar_mesas(cambio_estatus_mesas);
        } else {
            console.log("No hay cambios en los estatus de los pedidos de la zona general.");
        }
    
    } catch (error){
        //alert("No se pudo obtener la lista de pedidos");
        console.log("No se pudo obtener la lista de pedidos");
    }


}


// funcion para actualizar el estatus de las mesas de la zona general
function actualizar_mesas(cambio_estatus_mesas){

    // recorremos los pedidos que ha sido realizados
    pedidos_realizados.forEach(pedidos => {
        // recorremos el cambio de estatus modificados por (Cocina-bar)
        cambio_estatus_mesas.forEach(cambios => {

            // verificamos si el id de mesas son iguales y sus estatus son difentes
            if(parseInt(pedidos.tableId) === cambios.id_mesa && pedidos.estatus !== cambios.status){
                pedidos.estatus = cambios.status  // se le asigna el nuevo estatus a la mesa
            }
        })
    })

    localStorage.setItem('pedidos', JSON.stringify(pedidos_realizados));

    recorrido_mesas(pedidos_realizados)  // actualizamos lo estatus de la mesas en el front
    
}



// funcion para eliminar el pedido de la base de datos
async function eliminar_pedido(id_mesa){

    let id_eliminar = null;

    try {
        // obtener los pedidos
        const response = await fetch("../factura");

        if(!response.ok){
            if (response.status === 404) {
                console.log("La URL 'http:localhost:1234/ventas/factura' no se encontró.");
            } else {
                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }
        }

        const pedidos_bd = await response.json(); // se guarda una lista de los pedidos almacenados

        pedidos_bd.forEach(pedido => {

            if (pedido.mesa === id_mesa && (pedido.zona === 'general' || pedido.zona === 'bar')){
                id_eliminar = pedido.id_cliente
                return;
            }
        })
        

    } catch (error){
        console.log("No se pudo obtener la lista de pedidos");
    }

    if(id_eliminar !== null){
        try {

            // hacemos el solicitud para eliminar el pedido
            fetch(`../factura/${id_eliminar}`, {
                method : "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log('Recurso eliminado correctamente');
                } else {
                    console.error('Error al eliminar el recurso');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });

        } catch (error){
            console.log("No se pudo eliminar el pedido");
        }
    } else {
        console.log("nose encuentra el id a eliminar")
    }
    
}

// llamamos una funcion una serie de tiempo para ver si (Cocina-bar) hizo una actualizacion en los estatus del pedido
setInterval(actualizacion_pedidos, 10000); 

// llamamos una funcion una serie de tiempo para ver si se pueden limpiar las mesas
setInterval(limpiar_mesas_general, 5000); 


// funcion para actualizar las mesas que ya pagaron su cuenta
async function update_mesas_pagadas(id_mesa){

    let id_update = null;
    const update_mesas = {
        status_pedido : 5
    }

    try {
        // obtener los pedidos
        const response = await fetch("../factura");

        if(!response.ok){
            if (response.status === 404) {
                console.log("La URL 'http:localhost:1234/ventas/factura' no se encontró.");
            } else {
                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }
        }

        const pedidos_bd = await response.json(); // se guarda una lista de los pedidos almacenados

        pedidos_bd.forEach(pedido => {

            if (pedido.mesa === id_mesa && (pedido.zona === 'general' || pedido.zona === 'bar')){
                id_update = pedido.id_cliente
                return;
            }
        })
        

    } catch (error){
        console.log("No se pudo obtener la lista de pedidos");
    }


    if(id_update !== null){
        try {

            // hacemos el solicitud para actualizar el pedido
            fetch(`../factura/${id_update}`, {
                method : "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(update_mesas)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Recurso limpiado correctamente');
                } else {
                    console.error('Error al limpiar el recurso');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });

        } catch (error){
            console.log("No se pudo limpiar el pedido");
        }
    } else {
        console.log("No se encontro el id a actualizar")
    }
}

// codigo ale 

let botonDetalles = document.querySelector("#botonDetalles")
botonDetalles.addEventListener("click",async ()=> {
    if(selectedTableId == null){
        return alert("selecciona una mesa")
    }
    let res = await fetch("/ventas/factura")
    let pedidos = await res.json()
    console.log(pedidos)
    let pedidoMesa = null
    pedidos.forEach(pedido => {
        if(parseInt(pedido.mesa) == selectedTableId){
            pedidoMesa = pedido
        }
    })

    alert(`Mesa ${selectedTableId}\n`+pedidoMesa.detalles)
})