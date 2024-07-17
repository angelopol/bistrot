const PathUrl = "http:localhost:1234/ventas/";
// Seleccionar todos los botones de acción
const actionButtons = document.querySelectorAll('.action-button');

// Seleccionar todas las tarjetas de mesa
const tableCards = document.querySelectorAll('.table-card');

// declarar una variable de origen para saber en la vista de pedido quien hizo la solicitud (terraza, general)
const origen = 'general';

// Obtener los pedidos que se han realizado
const pedidos_realizados = JSON.parse(localStorage.getItem('pedidos')) || [];
console.log(pedidos_realizados);

// actualizacion constante de los estados
recorrido_mesas(pedidos_realizados)

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

                    // verificamos si su estatus es disponible para tomar su pedido
                    if (selectedMesaetiqueta.querySelector('.table-status').textContent === "DISPONIBLE"){
                        location.href = `/ventas/pedidos?tableId=${selectedTableId}&origen=${origen}`;
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

                            // si el estatus es disponible solamente lo deseleccionada
                            if (tableCard.querySelector(".table-status").textContent === "DISPONIBLE"){
                                tableCard.classList.remove('selected'); // Quitar la clase 'selected' al eliminar pedido
                                selectedMesa = false;
                                return;

                            // si es pendiente lo deseleccionada y elimina el pedido de la lista de pedidos realizados
                            } else if (tableCard.querySelector(".table-status").textContent === "Pendiente"){

                                tableCard.classList.remove('selected'); // Quitar la clase 'selected' al eliminar pedido

                                pedidos_realizados.forEach((pedido,mesas) => {

                                    if (pedido.tableId === String(selectedTableId)){

                                        pedidos_realizados.splice(mesas, 1);
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

                    if (selectedMesaetiqueta.querySelector('.table-status').textContent === "Pendiente"){
                        imprimirFactura();
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

function imprimirFactura(){

    if (selectedTableId !== null && selectedMesa) {
    
        if (selectedMesaetiqueta.querySelector(".table-status").textContent === 'Pendiente'){
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
                document.body.style.overflow = 'auto';
            });

            modal.querySelector('.button-cerrar-modal').addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
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
                const tableStatusElement = mesas.querySelector('table-status');
                tableStatusElement.textContent = 'Rechazado';
            } else if(pedidos.estatus === 3 && pedidos.tableId === String(id_mesas+1)) {
                const tableStatusElement = mesas.querySelector('table-status');
                tableStatusElement.textContent = 'Aceptado';
            } else if(pedidos.estatus === 4 && pedidos.tableId === String(id_mesas+1)) {
                const tableStatusElement = mesas.querySelector('table-status');
                tableStatusElement.textContent = 'Listo';
            }
        })
        
    })
}


// funcion para ver si (Cocina-bar) hizo alguna actualizacion en los estatus de los pedidos
function actualizacion_pedidos(){

    // obtener los pedidos
    let response = fetch(PathUrl+"factura")

    if(!response.ok){
        return alert("No se pudo obtener la lista de pedidos")
    }

    const pedidos_bd = response.json() // se guarda una lista de los pedidos almacenados

    pedidos_bd.forEach(pedido => {

        
    });

}