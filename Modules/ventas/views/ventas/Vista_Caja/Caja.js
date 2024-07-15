let selectedTableId = null;
let selectedMesa = false;

// Seleccionar las mesas
const tableCards = document.querySelectorAll('.table-card');

// Obtener los pedidos de generar y terraza
const pedidos_realizados = JSON.parse(localStorage.getItem('pedidos')) || [];
const pedidos_realizados_t = JSON.parse(localStorage.getItem('pedidos_t')) || [];
console.log(pedidos_realizados);
console.log(pedidos_realizados_t);

document.addEventListener('DOMContentLoaded', () => {
    // Actualizar los estatus de las mesas
    recorrido_mesas(pedidos_realizados, pedidos_realizados_t);

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

    function cambiar(IDdestino) {
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
        if (tab === 'tab1') {
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
  try {
      // Obtener los datos de la cuenta a pagar
      const cuenta = obtenerCuentaPorId(id);
      // Validar que la cuenta exista y que el monto sea correcto
      if (!cuenta) {
          throw new Error('Cuenta no encontrada.');
      }
      if (cuenta.monto !== monto) {
          throw new Error('El monto no coincide con el monto de la cuenta.');
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
        .then(() => {
          // Actualizar el estado de la cuenta como pagada en el servidor
          actualizarEstadoCuenta(id, 'pagada')
            .then(() => {
              // Mostrar un mensaje de éxito al usuario
              alert('¡Cuenta pagada con éxito!');
            })
            .catch(error => {
              console.error('Error al actualizar el estado de la cuenta:', error);
              alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
            });
        })
        .catch(error => {
          console.error('Error al procesar el pago:', error);
          alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
        });
  } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
  }
}




// Función para imprimir una cuenta
function ImprimirCuenta() {
  if (selectedTableId !== null && selectedMesa) {
      // Seleccionar la mesa correspondiente basado en el índice
      let mesa = document.querySelectorAll('.table-card')[selectedTableId - 1];
      // Obtener el estado de la mesa
      let estadoMesa = mesa.querySelector('.table-name').textContent;

      const modalContainer = document.getElementById('divModal');
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.id = `modal-${selectedTableId}`;
      modal.innerHTML = `
          <div id="Modal${selectedTableId}" class="modal-content">
              <span class="closeBtn" data-modal="modal-${selectedTableId}">&times;</span>
              <h3>Factura</h3>
              <p>Mesa: ${selectedTableId}</p>
              <p>Estado: ${estadoMesa}</p>
              <button class="button-cerrar-modal">Cerrar</button>
          </div>
      `;
      modalContainer.appendChild(modal);

      // Mostrar el modal
      modal.style.display = 'block';

      // Asignar evento para cerrar el modal
      modal.querySelector('.closeBtn').addEventListener('click', () => {
          modal.style.display = 'none';
      });

      modal.querySelector('.button-cerrar-modal').addEventListener('click', () => {
          modal.style.display = 'none';
      });
  }
}

// Abrir y cerrar modal de factura
document.addEventListener('DOMContentLoaded', () => {
  const openModalButtons = document.querySelectorAll('.button-abrir-modal');

  // Asigna el evento click a cada botón de abrir modal
  openModalButtons.forEach(button => {
      button.addEventListener('click', event => {
          // Evita que el evento click se propague al contenedor padre
          event.stopPropagation();

          // Encuentra el modal correspondiente al botón clicado
          const modal = button.nextElementSibling;
          if (modal && modal.className === 'modal') {
              modal.style.display = 'block';
          }
      });
  });

  // Selecciona todos los botones de cerrar modal
  const closeModalButtons = document.querySelectorAll('.button-cerrar-modal');

  // Asigna el evento click a cada botón de cerrar modal
  closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Encuentra el modal correspondiente al botón clicado
          const modal = button.closest('.modal');
          if (modal) {
              modal.style.display = 'none';
          }
      });
  });
});


// Recorridos de las mesas para la vista de General, Terrazas
function recorrido_mesas(pedidos_mesas_general, pedido_mesas_terraza) {
    // Recorrer las mesas de la vista de terraza
    if (document.querySelector("#Terraza").classList.contains("visible")) {
        pedido_mesas_terraza.forEach(pedidos => {
            tableCards.forEach((mesas, mesas_id) => {
                // Verificamos el estatus del pedido, si está listo se coloca el estatus para solicitar cuenta
                if (pedidos.estatus === 1 && pedidos.tableId === String(mesas_id + 1)) {
                    const tableStatusElement = mesas.querySelector('.table-status');
                    tableStatusElement.textContent = 'Cuenta';
                }
            });
        });

        // Recorrer la vista de los generales
    } else if (document.querySelector("#General").classList.contains("visible")) {
        pedidos_mesas_general.forEach(pedidos => {
            tableCards.forEach((mesas, mesas_id) => {
                // Verificamos el estatus del pedido, si está listo se coloca el estatus para solicitar cuenta
                if (pedidos.estatus === 1 && pedidos.tableId === String(mesas_id + 1)) {
                    const tableStatusElement = mesas.querySelector('.table-status');
                    tableStatusElement.textContent = 'Cuenta';
                }
            });
        });
    }
}
