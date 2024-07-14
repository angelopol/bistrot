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
            case 'Cambio de mesa':
                // Redirigir a pedidos.html
                location.href = '../Vista_Pedidos/pedidos.html';
                break;
            case 'Tomar pedido':
                // Abrir pedidos.html y pasar el ID de la mesa seleccionada
                if (selectedTableId && selectedMesa) {

                    // verificamos si su estatus es disponible para tomar su pedido
                    if (selectedMesaetiqueta.querySelector('.table-status').textContent === "DISPONIBLE"){
                        location.href = `../Vista_Pedidos/pedidos.html?tableId=${selectedTableId}&origen=${origen}`;
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

                    if (selectedMesaetiqueta.querySelector('.table-status').textContent === "Listo"){
                        selectedMesaetiqueta.querySelector('.table-status').textContent = "Factura"
                        location.href = `../Vista_Caja/caja.html?tableId=${selectedTableId}`;
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

        // Actualizar la tabla de mesas (opcional)
        updateTable(selectedTableId);

    });
});

// Función opcional para actualizar la tabla de mesas
function updateTable(tableId) {
    // Implementar la lógica de actualización de la tabla de mesas aquí
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
