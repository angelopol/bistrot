let selectedTableId = null;
let selectedMesa = false;
selectedMesaetiqueta = null;

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


function encontrar(mesa_id,pedidos_check) {
  let pedido = null;

  for (let i = 0; i < pedidos_check.length; i++) {
      let pedidoActual = pedidos_check[i];
      
      if (pedidoActual.tableId === String(mesa_id) && pedidoActual.estatus === 1) {
        alert('Pedido encontrado');
        pedido = pedidoActual;
          
          break;
      }
  }

  return pedido;
}

function ImprimirCuenta() {
  if (selectedTableId !== null && selectedMesa) {

    if(document.querySelector("#Terraza").classList.contains("visible")){
        // Seleccionar la mesa correspondiente basado en el índice
        let mesa = document.querySelectorAll('.table-card')[selectedTableId - 1];
        // Obtener el estado de la mesa
        let numeroMesa = mesa.querySelector('.table-name').textContent;

        // Obtener la mesa con estatus cuenta
        let pedido = encontrar(selectedTableId,pedidos_realizados_t);

        // Calcular el total del pedido
        let total = pedido.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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


    }
    
    else if (document.querySelector("#General").classList.contains("visible")){
      alert('General');
          // Seleccionar la mesa correspondiente basado en el índice
          let mesa = document.querySelectorAll('.table-card')[selectedTableId - 1];
          // Obtener el estado de la mesa
          let numeroMesa = mesa.querySelector('.table-name').textContent;
  
          // Obtener la mesa con estatus cuenta
          let pedido = encontrar(selectedTableId,pedidos_realizados);
  
          // Calcular el total del pedido
          let total = pedido.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
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
      }

    
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


function PagoCuenta() {
  if (selectedTableId !== null && selectedMesa) {

      if (document.querySelector("#Terraza").classList.contains("visible")) {
          const modalContainer = document.getElementById('divModal');
          const modal = document.createElement('div');
          modal.className = 'modal';
          modal.id = `modal-${selectedTableId}`;
          modal.innerHTML = `
              <div id="Modal${selectedTableId}" class="modal-content">
                  <span class="closeBtn" data-modal="modal-${selectedTableId}">&times;</span>
                  <h3>Detalles del Pedido</h3>
                  <form id="formPedido">
                      <label for="nombrePlato">Nombre del Plato:</label>
                      <input type="text" id="nombrePlato" name="nombrePlato" required>
                      <label for="cantidad">Cantidad:</label>
                      <input type="number" id="cantidad" name="cantidad" min="1" value="1" required>
                      <button type="submit" class="button-agregar">Agregar</button>
                  </form>
                  <div id="pedidoDetalles"></div>
                  <hr>
                  <form id="formPago">
                      <label for="metodoPago">Seleccione el método de pago:</label>
                      <select id="metodoPago" name="metodoPago">
                          <option value="efectivo">Efectivo</option>
                          <option value="tarjeta">Tarjeta</option>
                      </select>
                      <button type="submit" class="button-pagar">Pagar</button>
                  </form>
                  <button class="button-cerrar-modal">Cerrar</button>
              </div>
          `;
          modalContainer.appendChild(modal);

          // Mostrar el modal y desactivar el scroll del cuerpo
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';

          // Manejar el evento de cierre del modal
          modal.querySelector('.closeBtn').addEventListener('click', () => {
              modal.style.display = 'none';
              document.body.style.overflow = 'auto';
          });

          modal.querySelector('.button-cerrar-modal').addEventListener('click', () => {
              modal.style.display = 'none';
              document.body.style.overflow = 'auto';
          });

          // Manejar el envío del formulario de pedido
          const formPedido = modal.querySelector('#formPedido');
          const pedidoDetalles = modal.querySelector('#pedidoDetalles');

          formPedido.addEventListener('submit', (event) => {
              event.preventDefault();
              const nombrePlato = formPedido.elements['nombrePlato'].value;
              const cantidad = parseInt(formPedido.elements['cantidad'].value);

              // Validar entrada de datos
              if (nombrePlato.trim() === '' || isNaN(cantidad) || cantidad <= 0) {
                  alert('Por favor, ingrese un nombre de plato válido y una cantidad válida.');
                  return;
              }

              // Mostrar detalles del pedido
              const pedidoItemHTML = `
                  <div class="factura-item">
                      <span class="item-nombre">${nombrePlato}</span>
                      <span class="item-cantidad">x${cantidad}</span>
                      <span class="item-precio">Precio por definir</span>
                  </div>
              `;
              pedidoDetalles.innerHTML += pedidoItemHTML;

              // Limpiar campos del formulario
              formPedido.reset();
          });

          // Manejar el envío del formulario de pago
          const formPago = modal.querySelector('#formPago');
          formPago.addEventListener('submit', (event) => {
              event.preventDefault();
              const metodoPago = formPago.elements['metodoPago'].value;
              alert(`Pago realizado con ${metodoPago}`);
              modal.style.display = 'none';
              document.body.style.overflow = 'auto';
              // Aquí podrías añadir lógica adicional para procesar el pago, como actualizar estado en el sistema, etc.
          });
      }
      if (document.querySelector("#General").classList.contains("visible")) {
        const modalContainer = document.getElementById('divModal');
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = `modal-${selectedTableId}`;
        modal.innerHTML = `
                <div id="Modal${selectedTableId}" class="modal-content">
                    <span class="closeBtn" data-modal="modal-${selectedTableId}">&times;</span>
                    <h3>Detalles del Pedido</h3>
                    <form id="formPedido">
                
                        <hr>
                        <h3>Datos del Cliente</h3>
                        <label for="nombreCliente">Nombre del Cliente o Empresa:</label>
                        <input type="text" id="nombreCliente" name="nombreCliente" required>
                        <label for="rifCedula">RIF o Cédula:</label>
                        <input type="text" id="rifCedula" name="rifCedula" required>
                        <label for="direccion">Dirección:</label>
                        <input type="text" id="direccion" name="direccion">
                        <label for="tipoEstado">Tipo de Estado:</label>
                        <input type="text" id="tipoEstado" name="tipoEstado">
                        <label for="telefono">Teléfono:</label>
                        <input type="tel" id="telefono" name="telefono">
                        <label for="correo">Correo Electrónico:</label>
                        <input type="email" id="correo" name="correo">
                        <hr>
                        <label for="metodoPago">Seleccione el método de pago:</label>
                        <select id="metodoPago" name="metodoPago">
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                        </select>
                        <button type="submit" class="button-agregar">Agregar</button>
                    </form>
                    <hr>
                    <form id="formPago">
                        <button type="submit" class="button-pagar">Pagar</button>
                    </form>
                    <button class="button-cerrar-modal">Cerrar</button>
                </div>
            `;
        modalContainer.appendChild(modal);

        // Mostrar el modal y desactivar el scroll del cuerpo
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Manejar el evento de cierre del modal
        modal.querySelector('.closeBtn').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        modal.querySelector('.button-cerrar-modal').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Manejar el envío del formulario de pedido
        const formPedido = modal.querySelector('#formPedido');
        const pedidoDetalles = modal.querySelector('#pedidoDetalles');

        formPedido.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombrePlato = formPedido.elements['nombrePlato'].value;
            const cantidad = parseInt(formPedido.elements['cantidad'].value);

            
            // Mostrar detalles del pedido
            const pedidoItemHTML = `
                <div class="factura-item">
                    <span class="item-nombre">${nombrePlato}</span>
                    <span class="item-cantidad">x${cantidad}</span>
                    <span class="item-precio">Precio por definir</span>
                </div>
            `;
            pedidoDetalles.innerHTML += pedidoItemHTML;

            // Limpiar campos del formulario
            formPedido.reset();
        });

        // Manejar el envío del formulario de pago
        const formPago = modal.querySelector('#formPago');
        formPago.addEventListener('submit', (event) => {
            event.preventDefault();
            const metodoPago = formPago.elements['metodoPago'].value;
            alert(`Pago realizado con ${metodoPago}`);
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Aquí podrías añadir lógica adicional para procesar el pago, como actualizar estado en el sistema, etc.
        });
    }

      // Aquí podrías implementar una lógica similar para el caso de document.querySelector("#General").classList.contains("visible")
      // Ajusta según tus necesidades específicas para mostrar detalles y procesar el pago.
  }
}





// Recorridos de las mesas para la vista de General, Terrazas
function recorrido_mesas(pedidos_mesas_general, pedido_mesas_terraza) {
    // Recorrer las mesas de la vista de terraza
    if (document.querySelector("#Terraza").classList.contains("visible")) {
        pedido_mesas_terraza.forEach(pedidos => {
            tableCards.forEach((mesas, mesas_id) => {
              console.log(pedidos.tableId);
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
