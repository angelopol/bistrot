

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
