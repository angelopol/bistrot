// definimos la variable para registar los pedidos realizados sino se han realizado se muestra una lista vacia
const pedidos_realizados = JSON.parse(localStorage.getItem('pedidos')) || [];  // vista general
const pedidos_realizados_t = JSON.parse(localStorage.getItem('pedidos_t')) || [];  // vista terraza

// obtenemos el id de la mesa
const urlParams = new URLSearchParams(window.location.search);

// obtenemos el origen de la vista que hizo la peticion
const origen = urlParams.get('origen');


document.addEventListener('DOMContentLoaded', (event) => {

    // Escribimos el id de la mesa en el pedido
    document.querySelector(".order-table").textContent = ("Mesa #" + urlParams.get('tableId'));
    // Selecciona todos los botones de abrir modal
    const openModalButtons = document.querySelectorAll('.button-abrir-modal');

    // Asigna el evento click a cada botón de abrir modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Evita que el evento click se propague al contenedor padre
            event.stopPropagation();

            // Encuentra el modal correspondiente al botón clicado
            const modal = button.nextElementSibling;
            if (modal && modal.tagName.toLowerCase() === 'dialog') {
                modal.showModal();
            }
        });
    });

    // Selecciona todos los botones de cerrar modal
    const closeModalButtons = document.querySelectorAll('.button-cerrar-modal');

    // Asigna el evento click a cada botón de cerrar modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Encuentra el modal correspondiente al botón clicado
            const modal = button.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    // Event delegation for quantity buttons
    document.getElementById('order-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('decrease-button')) {
            const quantityValueElement = event.target.nextElementSibling;
            let quantity = parseInt(quantityValueElement.textContent);

            if (quantity > 1) {
                quantity--;
                quantityValueElement.textContent = quantity;

                // Update total amount
                const itemPrice = parseFloat(event.target.closest('.order-item').price);
                updateTotalAmount(-itemPrice);
            }
        }

        if (event.target.classList.contains('increase-button')) {
            const quantityValueElement = event.target.previousElementSibling;
            let quantity = parseInt(quantityValueElement.textContent);

            quantity++;
            quantityValueElement.textContent = quantity;

            // Update total amount
            const itemPrice = parseFloat(event.target.closest('.order-item').price);
            updateTotalAmount(itemPrice);
        }
    });

    // Selecciona el botón de Cancelar
    const cancelButtons = document.querySelectorAll('.cancel-button');

    // Agrega el evento de clic a cada botón de Cancelar
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => cancelOrder("cancelar_pedido"));
    });

    // Selecciona el botón de Realizar pedido
    const placeOrderButton = document.querySelector('.confirm-button');

    // Agrega el evento de clic
    placeOrderButton.addEventListener('click', placeOrder);
});

function cancelOrder(tipo_button) {
    // Selecciona todos los elementos de la orden
    const orderItems = document.querySelectorAll('.order-item');

    // Elimina cada elemento de la orden
    orderItems.forEach(item => {
        const itemId = item.id;
        removeFromOrder(item);
        const menuItem = document.getElementById(itemId);
        menuItem.classList.remove('disabled');
    });

    // Restablece el total del pedido a 0
    updateTotalAmount(-parseFloat(document.getElementById('total-amount').textContent));


    // verificamos de donde es la vista donde se realiza la peticion
    if (origen === 'general'){

        if (tipo_button === "cancelar_pedido"){
            // Muestra un mensaje de "Pedido cancelado"
            alert('¡Pedido cancelado!');
            // Redirige al usuario a la página Mesonero_Zona_General.html
            window.location.href = '../Vista Meseros/Mesero_Zona_General.html';
        } else {
            // Redirige al usuario a la página Mesonero_Zona_General.html
            window.location.href = '../Vista Meseros/Mesero_Zona_General.html';
        }

    } else if (origen === 'terraza'){

        if (tipo_button === "cancelar_pedido"){
            // Muestra un mensaje de "Pedido cancelado"
            alert('¡Pedido cancelado!');
            // Redirige al usuario a la página Mesonero_Zona_General.html
            window.location.href = '../Vista Meseros/Mesero_Terraza.html';
        } else {
            // Redirige al usuario a la página Mesonero_Zona_General.html
            window.location.href = '../Vista Meseros/Mesero_Terraza.html';
        }

    }
    
}

function salir() {
    // Redirige al usuario a la página de inicio o a cualquier otra página
    window.location.href = 'index.html';
}

function placeOrder() {
    // Obtén la información del pedido (elementos, cantidad, total, etc.)
    // Obtener los valores de los parámetros de la URL
    const orderItems = document.querySelectorAll('.order-item');
    const orderData = {
        items: [],
        total: parseFloat(document.getElementById('total-amount').textContent),
        estatus: 1, // 1 = "Pendiente", 2 = "Rechazado", 3 = "Aceptado", 4 = "Listo"
        tableId: urlParams.get('tableId'), // Obtén el ID de la mesa seleccionada
    };

    orderItems.forEach(item => {
        orderData.items.push({
            name: item.querySelector('.order-item-name').textContent,
            quantity: parseInt(item.querySelector('.quantity-value').textContent),
            price: parseFloat(item.price)
        });
    });

    // Envía los datos del pedido al servidor o redirige al usuario a la página de confirmación
    sendOrderToServer(orderData);
}

function sendOrderToServer(orderData) {
    // Aquí puedes implementar la lógica de envío de datos al servidor
    console.log('Enviando pedido al servidor:', orderData);

    // Actualizar el localStorage con los pedidos registrados
    let bandera_reemplazo = false;  // esto es para saber si se tomo un nuevo pedido en una mesa existente para reemplazarlo

    // verificamos de donde es la vista donde se realiza la peticion
    if (origen === 'general'){
        
        // recorremos los pedidos realizados
        pedidos_realizados.forEach((pedidos,cont_posiciones) => {

            // condicional para ver si el id de los pedidos realizados coincide con el pedido actual
            if(pedidos.tableId === orderData.tableId) {
                pedidos_realizados.splice(cont_posiciones, 1, orderData);
                localStorage.setItem('pedidos', JSON.stringify(pedidos_realizados));
                console.log(pedidos_realizados);
                bandera_reemplazo = true;
                return;
            }

        });

        // si en la mesa donde se realiza el pedido todavia no esta registrado se agrega el pedido
        if(!bandera_reemplazo){
            pedidos_realizados.push(orderData);
            localStorage.setItem('pedidos', JSON.stringify(pedidos_realizados));
            console.log(pedidos_realizados);
        }

    } else if (origen === 'terraza'){

        // recorremos los pedidos realizados
        pedidos_realizados_t.forEach((pedidos,cont_posiciones) => {

            // condicional para ver si el id de los pedidos realizados coincide con el pedido actual
            if(pedidos.tableId === orderData.tableId) {
                pedidos_realizados_t.splice(cont_posiciones, 1, orderData);
                localStorage.setItem('pedidos_t', JSON.stringify(pedidos_realizados_t));
                console.log(pedidos_realizados_t);
                bandera_reemplazo = true;
                return;
            }

        });

        // si en la mesa donde se realiza el pedido todavia no esta registrado se agrega el pedido
        if(!bandera_reemplazo){
            pedidos_realizados_t.push(orderData);
            localStorage.setItem('pedidos_t', JSON.stringify(pedidos_realizados_t));
            console.log(pedidos_realizados_t);
        }
    }

    
    // Muestra un mensaje de éxito
    alert('¡Pedido realizado con éxito! El pedido se ha enviado a la mesa ' + orderData.tableId);

    // Restablece el pedido
    cancelOrder("realizar_pedido");
}

function cambiar(IDdestino){
    let destino = document.getElementById(IDdestino);
    let origen = document.querySelectorAll('.visible');
    origen.forEach(div => {
        div.classList.remove('visible');
        destino.classList.add('visible');
    });
}

function addToOrder(name, price, imageUrl, idCard) {
    const orderItemsContainer = document.getElementById('order-items');

    const orderItem = document.createElement('article');
    orderItem.className = 'order-item';
    orderItem.id = idCard;
    orderItem.price = price;

    orderItem.innerHTML = `
        <img loading="lazy" src="${imageUrl}" class="menu-item-image" alt="Ordered item" />
        <div class="order-item-details">
            <h3 class="order-item-name">${name}</h3>
            <div class="order-item-quantity">
                <img loading="lazy" onclick="removeFromOrder(this)" src="Assets/iconos/remover.png" class="quantity-icon" alt="" />
                <div class="quantity-controls">
                    <button class="quantity-button decrease-button" aria-label="Decrease quantity">-</button>
                    <span class="quantity-value">1</span>
                    <button class="quantity-button increase-button" aria-label="Increase quantity">+</button>
                </div>
            </div>
        </div>
    `;
    
    let card = document.getElementById(idCard);
    card.classList.add('disabled');
    orderItemsContainer.appendChild(orderItem);
    orderItemsContainer.scrollTop = orderItemsContainer.scrollHeight;

    updateTotalAmount(price);
}

function removeFromOrder(button) {
    const itemToRemove = button.closest('.order-item');
    let origen = document.querySelectorAll('.disabled');

    origen.forEach(div => {
        if (div.id == itemToRemove.id)
            div.classList.remove('disabled');
    });

    const itemPrice = parseFloat(itemToRemove.price);
    const quantity = parseInt(itemToRemove.querySelector('.quantity-value').textContent);
    const totalPrice = itemPrice * quantity;

    updateTotalAmount(-totalPrice);
    itemToRemove.remove();
}

function updateTotalAmount(priceChange) {
    let totalAmountElement = document.getElementById('total-amount');
    let totalActual = parseFloat(totalAmountElement.textContent);
    let priceInt = parseFloat(priceChange);
    totalActual += priceInt;
    totalAmountElement.textContent = totalActual.toFixed(2).toString().padStart(6, '0');
}


// Esto es para borrar las pruebas

// Eliminar todos los pedidos del localStorage
//localStorage.removeItem('pedidos');
//localStorage.removeItem('pedidos_t');