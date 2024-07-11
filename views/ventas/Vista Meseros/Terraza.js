// Seleccionar todos los botones de acción
const actionButtons = document.querySelectorAll('.action-button');

// Seleccionar todas las tarjetas de mesa
const tableCards = document.querySelectorAll('.table-card');

// Variable para almacenar el ID de la mesa seleccionada
let selectedTableId = null;

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
                if (selectedTableId) {
                    location.href = `../Vista_Pedidos/pedidos.html?tableId=${selectedTableId}`;
                } else {
                    alert('Seleccione una mesa primero');
                }
                break;
            case 'Eliminar pedido': 
                // Restablecer el número de mesa y estado
                if (selectedTableId) {
                    const tableCard = document.querySelector(`.table-card:nth-child(${selectedTableId})`);
                    const tableNumberElement = tableCard.querySelector('.table-number');
                    const tableNameElement = tableCard.querySelector('.table-name');
                    tableNumberElement.textContent = '0';
                    tableNameElement.textContent = `MESA ${selectedTableId}`;
                    tableCard.classList.remove('selected'); // Quitar la clase 'selected' al eliminar pedido
                } else {
                    alert('Seleccione una mesa primero');
                }
                break;
            case 'Solicitar factura':
                // Redirigir a la vista caja
                if (selectedTableId) {
                    location.href = `../Vista_Caja/caja.html?tableId=${selectedTableId}`;
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

        // Mostrar estado "Ocupado" al hacer clic en la tarjeta de mesa
        const tableStatusElement = tableCard.querySelector('h2');
        
        // Actualizar la tabla de mesas (opcional)
        updateTable(selectedTableId);
    });
});

// Función opcional para actualizar la tabla de mesas
function updateTable(tableId) {
    // Implementar la lógica de actualización de la tabla de mesas aquí
}
