document.addEventListener('DOMContentLoaded', () => {
    const tableCards = document.querySelectorAll('.table-card');
    let selectedTableId = null;
    let selectedMesa = false;

    // Agregar evento de clic a cada tarjeta de mesa
    tableCards.forEach((tableCard, index) => {
                                    
        tableCard.addEventListener('click', function() {
            // Seleccionar la mesa actual
            selectedTableId = index + 1;

            // Desseleccionar las demás mesas
            tableCards.forEach(card => {
                card.classList.remove('selected');
            });

            // Verificar si la mesa está disponible
            if (tableCard.querySelector('.table-status').textContent === 'DISPONIBLE') {
                // Seleccionar la mesa actual
                tableCard.classList.add('selected');
                selectedMesa = true;

                // Actualizar la tabla de mesas (opcional)
                updateTable(selectedTableId);
            } else {
                selectedMesa = false;
            }
        });
    });

    // Función opcional para actualizar la tabla de mesas
    function updateTable(tableId) {
        // Implementar la lógica de actualización de la tabla de mesas aquí
        console.log(`Actualizar la tabla de mesas para la mesa con ID: ${tableId}`);
    }

    function cambiar(IDdestino){
        let destino = document.getElementById(IDdestino);
        let origen = document.querySelectorAll('.visible');
        origen.forEach(div => {
            div.classList.remove('visible');
            destino.classList.add('visible');
        });
    }

    function changeTab(tab) {
        document.querySelectorAll('.nav-tab').forEach(button => {
            button.classList.remove('nav-tab-active');
            button.classList.add('nav-tab-inactive');
        });
        // Añadir la clase activa al botón seleccionado
        const activeButton = document.getElementById(tab);
        activeButton.classList.remove('nav-tab-inactive');
        activeButton.classList.add('nav-tab-active');
        if(tab === 'tab1'){
            cambiar('General');
        } else {
            cambiar('Terraza');
        }
    }

    // Asignar la función changeTab a los botones de navegación
    document.getElementById('tab1').addEventListener('click', () => changeTab('tab1'));
    document.getElementById('tab2').addEventListener('click', () => changeTab('tab2'));
});
