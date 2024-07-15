let selectedTableId = null;
let selectedMesa = false;

// obtenelos los pedidos de generar y terraza
const pedidos_realizados = JSON.parse(localStorage.getItem('pedidos')) || [];
const pedidos_realizados_t = JSON.parse(localStorage.getItem('pedidos_t')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const tableCards = document.querySelectorAll('.table-card');

  // actualizar los estatus de las mesas
  recorrido_mesas(pedidos_mesas)

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

// Función para eliminar una cuenta
function eliminarCuenta(id) {
  fetch(`/cuentas/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Cuenta con ID: ${id} eliminada exitosamente`);
        // Actualizar la interfaz de usuario
        eliminarElementoDOM(`cuenta-${id}`);
      } else {
        console.error(`Error al eliminar la cuenta con ID: ${id}`);
        // Mostrar un mensaje de error al usuario
        mostrarMensajeError('No se pudo eliminar la cuenta');
      }
    })
    .catch((error) => {
      console.error('Error al eliminar la cuenta:', error);
      // Mostrar un mensaje de error al usuario
      mostrarMensajeError('Ocurrió un error al eliminar la cuenta');
    });
}

// Función para pagar una cuenta
function pagarCuenta(id, monto, metodoPago) {
  // Obtener los datos de la cuenta a pagar
  const cuenta = obtenerCuentaPorId(id);

  // Validar que la cuenta exista y que el monto sea correcto
  if (!cuenta || cuenta.monto !== monto) {
    alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
    return;
  }

  // Crear el objeto de pago con los datos necesarios
  const datosTransaccion = {
    monto: cuenta.monto,
    metodoPago,
    nombreCliente: `${cuenta.cliente.nombre} ${cuenta.cliente.apellido}`,
    direccionCliente: cuenta.cliente.direccion
  };

  // Enviar los datos de pago a la API de Stripe o PayPal
  procesarPago(datosTransaccion)
    .then(respuesta => {
      // Actualizar el estado de la cuenta como pagada en el servidor
      actualizarEstadoCuenta(id, 'pagada');

      // Mostrar un mensaje de éxito al usuario
      alert('¡Cuenta pagada con éxito!');
    })
    .catch(error => {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
    });
}

function ImprimirCuenta(){
  if (selectedTableId !== null && selectedMesa) {
   // Seleccionar la mesa correspondiente basado en el índice
   let mesa = document.querySelectorAll('.table-card')[selectedTableId -1];
   // Obtener el estado de la mesa
   let estadoMesa = mesa.querySelector('.table-name').textContent;
   alert(`Estado de la mesa: ${estadoMesa}`);
   console.log(`Imprimiendo cuenta:
     Cédula: ${selectedTableId}`);
  }
}


function recorrido_mesas(pedidos_mesas_general, pedido_mesas_terraza){
  
  // recorrer las mesas de la vista de terraza
  if (document.querySelector("#Terraza").classList.contains("visible")){

    pedido_mesas_terraza.forEach(pedidos => {

      tableCards.forEach((mesas, mesas_id) => {
  
          // verificamos el estatus del pedido, si esta listo se coloca el estatus para solicitar cuenta
          if (pedidos.estatus === "1" && pedidos.tableId === String(mesas_id+1)){
              const tableStatusElement = mesas.querySelector('.table-status');
              tableStatusElement.textContent = 'Cuenta';
          }
      })
      
    })

    // recorre la vista de los generales
  } else if (document.querySelector("#Terraza").classList.contains("visible")){

    pedidos_mesas_general.forEach(pedidos => {

      tableCards.forEach((mesas, mesas_id) => {
  
          // verificamos el estatus del pedido, si esta listo se coloca el estatus para solicitar cuenta
          if (pedidos.estatus === "1" && pedidos.tableId === String(mesas_id+1)){
              const tableStatusElement = mesas.querySelector('.table-status');
              tableStatusElement.textContent = 'Cuenta';
          }
      })
      
    })
  }
  
} 