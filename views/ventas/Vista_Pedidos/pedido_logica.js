const PathUrl = "http:localhost:1234/ventas/";
// definimos la variable para registar los pedidos realizados sino se han realizado se muestra una lista vacia
const pedidos_realizados = JSON.parse(localStorage.getItem('pedidos')) || [];  // vista general
const pedidos_realizados_t = JSON.parse(localStorage.getItem('pedidos_t')) || [];  // vista terraza
mostrar_platos_del_dia();

// obtenemos el id de la mesa
const urlParams = new URLSearchParams(window.location.search);

// obtenemos el origen de la vista que hizo la peticion
let origen = urlParams.get('origen');
const tableId = urlParams.get('tableId');
const orderItems = document.querySelectorAll('.order-item');
if (origen === 'general' && tableId > 9) {
    origen = 'bar';
    let nav_buttons = document.querySelectorAll('.menu-nav-item');
    nav_buttons.forEach(button => {
        if (button.id !== 'bebidas' && button.id !== 'vinos' && button.id !== 'tragos') {
            button.classList.add('invisible');
        }
    });
    const vista_Entradas = document.getElementById('Entradas');
    vista_Entradas.classList.remove('visible');
    const vista_Bebidas = document.getElementById('Bebidas');
    vista_Bebidas.classList.add('visible');
}


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
        let menuItem = document.getElementById(itemId);
    });

    // Restablece el total del pedido a 0
    updateTotalAmount(-parseFloat(document.getElementById('total-amount').textContent));


    // verificamos de donde es la vista donde se realiza la peticion
    if (origen === 'general' || origen === 'bar'){

        if (tipo_button === "cancelar_pedido"){
            // Muestra un mensaje de "Pedido cancelado"
            alert('¡Pedido cancelado!');
            // Redirige al usuario a la página Mesonero_Zona_General.html
            window.location.href = '/ventas/Vista_Meseros/meseros_general';
        } else {
            // Redirige al usuario a la página Mesonero_Zona_General.html
            window.location.href = '/ventas/Vista_Meseros/meseros_general';
        }

    } else if (origen === 'terraza'){

        if (tipo_button === "cancelar_pedido"){
            // Muestra un mensaje de "Pedido cancelado"
            alert('¡Pedido cancelado!');
            // Redirige al usuario a la página Mesonero_Zona_General.html
            window.location.href = '/ventas/Vista_Meseros/meseros_terraza';
        } else {
            // Redirige al usuario a la página Mesonero_Zona_General.html
            window.location.href = '/ventas/Vista_Meseros/meseros_terraza';
        }
    } 
    
}

function salir() {
    // Redirige al usuario a la página de inicio o a cualquier otra página
    window.location.href = '/ventas/gerente';
}

function placeOrder() {
    // Obtén la información del pedido (elementos, cantidad, total, etc.)
    // Obtener los valores de los parámetros de la URL
    const tableId = urlParams.get('tableId');
    const orderItems = document.querySelectorAll('.order-item');
    if(origen === 'general' && tableId > 9){
        origen='bar';
    }
    
    const orderData = {
        items: [],
        total: parseFloat(document.getElementById('total-amount').textContent),
        estatus: 1, // 1 = "Pendiente", 2 = "Rechazado", 3 = "Aceptado", 4 = "Listo"
        tableId: tableId, // Obtén el ID de la mesa seleccionada
        zona: origen,  // obtnemos la zona donde se hizo el pedido (zona -> General o zona -> Terraza)
        detalles: "", // Aqui cocina nos va a decir que se puee hacer y que no
    };

    orderItems.forEach(item => {
        orderData.items.push({
            name: item.querySelector('.order-item-name').textContent,
            id: item.id,
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
    if (origen === 'general' || origen === 'bar'){
        
        // recorremos los pedidos realizados
        pedidos_realizados.forEach((pedidos,cont_posiciones) => {
            // condicional para ver si el id de los pedidos realizados coincide con el pedido actual
            if(pedidos.tableId === orderData.tableId) {

                pedidos_realizados.splice(cont_posiciones, 1, orderData); // se reemplaza en la lista de los pedidos realizados


                actualizar_pedido_base_datos(orderData)  // se actualiza el pedido que fue rechazado

                localStorage.setItem('pedidos', JSON.stringify(pedidos_realizados));
                console.log(pedidos_realizados);
                bandera_reemplazo = true;
                return;
            }

        });

        // si en la mesa donde se realiza el pedido todavia no esta registrado se agrega el pedido
        if(!bandera_reemplazo){

            pedidos_realizados.push(orderData); // se agrega a la lista de los pedidos realizados

            crear_pedido_base_datos(orderData) // se crea el pedido
            
            localStorage.setItem('pedidos', JSON.stringify(pedidos_realizados));
            console.log(pedidos_realizados);
        }

    } else if (origen === 'terraza'){

        // recorremos los pedidos realizados
        pedidos_realizados_t.forEach((pedidos,cont_posiciones) => {

            // condicional para ver si el id de los pedidos realizados coincide con el pedido actual
            if(pedidos.tableId === orderData.tableId) {
                pedidos_realizados_t.splice(cont_posiciones, 1, orderData);
                
                actualizar_pedido_base_datos(orderData)  // se actualiza el pedido que fue rechazado

                localStorage.setItem('pedidos_t', JSON.stringify(pedidos_realizados_t));
                console.log(pedidos_realizados_t);
                bandera_reemplazo = true;
                return;
            }

        });

        // si en la mesa donde se realiza el pedido todavia no esta registrado se agrega el pedido
        if(!bandera_reemplazo){
            pedidos_realizados_t.push(orderData);

            crear_pedido_base_datos(orderData) // se crea el pedido

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
        <div class="order-item-details">
            <h3 class="order-item-name">${name}</h3>
            <div class="order-item-quantity">
                <img loading="lazy" onclick="removeFromOrder(this)" src="/ventas/Vista_Pedidos/Assets/iconos/remover.png" class="quantity-icon" alt="" />
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


// funcion para crear la solicitud a la base de datos
async function crear_pedido_base_datos(orderData){

    const partialConsumo = cambiar_name_comidas_a_ids(orderData.items) 
    const consumo = JSON.stringify(partialConsumo) // convertimos el el objeto a  string con un formato json

    const factura = {
        monto: orderData.total,
        iva : orderData.total * 1.16,
        consumo : consumo,
        status_pedido: orderData.estatus,
        mesa: parseInt(orderData.tableId),
        zona : orderData.zona,
        detalles:''
    }

    // creamos el pedido en nuestra tabla de facturas

    const response = await fetch("../factura", {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify(factura)
    })
    
    if(!response.ok){
        if (response.status === 404) {
            console.log("La URL 'http:localhost:1234/ventas/factura' no se encontró.");
        } else {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
        return
    } else {
        console.log("Respuesta Exitosa")
    }
}


async function actualizar_pedido_base_datos(orderData){
    let id_cliente = null
    
    const partialConsumo = cambiar_name_comidas_a_ids(orderData.items) 
    const consumo = JSON.stringify(partialConsumo) // convertimos el el objeto a  string con un formato json
    
    const factura = {
        monto: orderData.total,
        iva : orderData.total * 1.16,
        consumo : consumo,
        status_pedido: 1,
        mesa: parseInt(orderData.tableId),
        zona : orderData.zona,
        detalles:''
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
            if (pedido.mesa === parseInt(orderData.tableId) && pedido.zona === orderData.zona ){
                id_cliente = pedido.id_cliente
                return;
            }
        })
    
    } catch (error){
        //alert("No se pudo obtener la lista de pedidos");
        console.log("No se pudo obtener la lista de pedidos");
    }

    if(id_cliente !== null){
        
        try {

            // hacemos el solicitud para eliminar el pedido
            fetch(`../factura/${id_cliente}`, {
                method : "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(factura)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Recurso actualizado correctamente');
                } else {
                    console.error('Error al actualizar el recurso');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });

        } catch (error){
            console.log("No se pudo actualizar el pedido");
        }
    } else {
        console.log("nose encontrar el id del cliente a actualizar")
    }
}


function cambiar_name_comidas_a_ids(consumos){
    
    const consumo_actualizado = consumos.map(consumo => {
        
        const nombre_comida = consumo.name;
        const cantidad_comida = consumo.quantity;
        const precio_unitario = consumo.price;
        const id_comida = consumo.id;

        return {
            id: id_comida,
            quantity: cantidad_comida,
            price: precio_unitario
        };
    });

    return consumo_actualizado;
}
//Modificar Pedido 
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get('tableId');
    const origen = urlParams.get('origen');
    let orderData;
    if (origen === 'general' || origen === 'bar') {
        orderData = pedidos_realizados.find(pedido => pedido.tableId === tableId);
    } else if (origen === 'terraza') {
        orderData = pedidos_realizados_t.find(pedido => pedido.tableId === tableId);
    }
    
    if (orderData) {
        displayOrder(orderData);
    } else {
        alert('No se encontró el pedido para esta mesa.');
    }

    function displayOrder(orderData) {
        const orderItemsContainer = document.getElementById('order-items');
        const totalAmountElement = document.getElementById('total-amount');
        
        orderItemsContainer.innerHTML = '';
        orderData.items.forEach(item => {
            const orderItem = document.createElement('article');
            orderItem.className = 'order-item';
            orderItem.id = item.id;
            orderItem.price = item.price;
            orderItem.innerHTML = `
                <div class="order-item-details">
                    <h3 class="order-item-name">${item.name}</h3>
                    <div class="order-item-quantity">
                        <img loading="lazy" onclick="removeFromOrder(this)" src="/ventas/Vista_Pedidos/Assets/iconos/remover.png" class="quantity-icon" alt="" />
                        <div class="quantity-controls">
                            <button class="quantity-button decrease-button" aria-label="Decrease quantity">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-button increase-button" aria-label="Increase quantity">+</button>
                        </div>
                    </div>
                </div>
            `;
            orderItemsContainer.appendChild(orderItem);
        });
        
        totalAmountElement.textContent = orderData.total.toFixed(2).toString().padStart(6, '0');
    }

    function guardarCambios() {
        alert('¡Cambios guardados!');
        const orderItems = document.querySelectorAll('.order-item');
        const totalAmount = parseFloat(document.getElementById('total-amount').textContent);
        const updatedOrderData = {
            items: [],
            total: totalAmount,
            estatus: 1,
            tableId: tableId,
            zona: origen,
            detalles: ""
        };
    
        orderItems.forEach(item => {
            const itemName = item.querySelector('.item-name').textContent;
            const itemQuantity = parseInt(item.querySelector('.item-quantity').textContent);
            const itemPrice = parseFloat(item.querySelector('.item-price').textContent);
    
            updatedOrderData.items.push({
                name: itemName,
                quantity: itemQuantity,
                price: itemPrice
            });
        });
    
        // Aquí puedes enviar updatedOrderData a tu servidor o manejarlo como sea necesario
        console.log('Order data saved:', updatedOrderData);
        
    }
    
    document.querySelectorAll('.order-item input, .order-item select').forEach(input => {
        input.addEventListener('change', () => {
            guardarCambios(); // Guardar cambios cada vez que se cambia un elemento
        });
    });

});


comida = {
    'Seasonal Soup with The Laughing Cow and Mixed Herbs': 1,
    'Courgette Soup with The Laughing Cow': 2,
    'Chicken Rillettes with Toast': 3 ,
    'Spelt and Mushroom Salad': 4 ,
    'Linguine Pasta with Tomato Sauce and Ratatouille': 5 ,
    'Sauted Chicken and Potatoes': 6 ,
    'Roast cod with tomato sauce': 7 ,
    'Roasted Chicken with Herbs': 8,
    'Chocolate Mousse': 9,
    'Fruit Salad': 10 ,
    'Apple Tart': 11,
    "Chocolate Cake" : 12,
    'Mojito': 13 ,
    'Daiquiri': 14 ,
    'Old Fashioned': 15 ,
    'Margarita': 16,
    'Cuvée Bistrot Chez Rémy': 17,
    'Agneau Rouge': 18 ,
    'Sancerre AOC': 19 ,
    'Languedoc': 20 ,
    'Coca-Cola Original': 21 ,
    'Coca-Cola Cherry': 22 ,
    'Fanta Orange': 23 ,
    'Sprite': 24 ,
    'Vittel': 25 ,
    'Vegetable Stew with Herby': 26,
    'Vegetable Vinaigrette' : 27 ,
    'Mixed Greens' : 28 ,
    'Tomato Confit' : 29 ,
    'Potatoes with Onion' : 30,
    'Linguine Pasta' : 31,
    'Crushed Potatoes' : 32 ,
    'French Fries and Ratatouille' : 33
}



async function mostrar_platos_del_dia() {
    try {
        const response = await fetch("http://localhost:1234/cocina/");
        
        if (!response.ok) {
            if (response.status === 404) {
                console.log("La URL 'http://localhost:1234/cocina/' no se encontró.");
            } else {
                throw new Error("Error en la solicitud");
            }
            return; // Añadir return aquí para evitar continuar en caso de error
        }
        console.log("Respuesta exitosa");
        const menu_bd = await response.json();
        
        menu_bd.forEach(plato => {
            
            if (plato.tipo_comida === "entrada") {
                const Entradas_Container = document.getElementById('Entradas');
                const Plato = document.createElement('div');
                Plato.id = plato.id;
                Plato.className = 'menu-item';
                Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '10', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
        
                Plato.innerHTML = `
                    <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                    <div class="menu-item-details">
                        <h2 class="menu-item-name">${plato.nombre}</h2>
                        <div class="item-information">
                            <span class="menu-item-price">10€</span>
                            <button class="button-abrir-modal">
                                <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                            </button>
                        </div>
                    </div>
                `;
        
                Entradas_Container.appendChild(Plato);
                if (plato.seleccionada === 1) {
                    const Principal_Container = document.getElementById('MenuDia');
                    const Plato = document.createElement('div');
                    Plato.id = plato.id;
                    Plato.className = 'menu-item';
                    Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
            
                    Plato.innerHTML = `
                        <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                        <div class="menu-item-details">
                            <h2 class="menu-item-name">${plato.nombre}</h2>
                            <div class="item-information">
                                <span class="menu-item-price">15€</span>
                                <button class="button-abrir-modal">
                                    <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                                </button>
                            </div>
                        </div>
                    `;
                
                Principal_Container.appendChild(Plato);
                }
            }
            else if (plato.tipo_comida === "principal") {
                const Principal_Container = document.getElementById('Principal');
                const Plato = document.createElement('div');
                Plato.id = plato.id;
                Plato.className = 'menu-item';
                Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '20', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
        
                Plato.innerHTML = `
                    <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                    <div class="menu-item-details">
                        <h2 class="menu-item-name">${plato.nombre}</h2>
                        <div class="item-information">
                            <span class="menu-item-price">20€</span>
                            <button class="button-abrir-modal">
                                <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                            </button>
                        </div>
                    </div>
                `;
        
                Principal_Container.appendChild(Plato);
                
                    if (plato.seleccionada === 1) {
                        const Principal_Container = document.getElementById('MenuDia');
                        const Plato = document.createElement('div');
                        Plato.id = plato.id;
                        Plato.className = 'menu-item';
                        Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
                
                        Plato.innerHTML = `
                            <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                            <div class="menu-item-details">
                                <h2 class="menu-item-name">${plato.nombre}</h2>
                                <div class="item-information">
                                    <span class="menu-item-price">15€</span>
                                    <button class="button-abrir-modal">
                                        <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                                    </button>
                                </div>
                            </div>
                        `;
                    
                    Principal_Container.appendChild(Plato);
                    }
            }
            else if (plato.tipo_comida === "postre") {
                const Postres_Container = document.getElementById('Postres');
                const Plato = document.createElement('div');
                Plato.id = plato.id;
                Plato.className = 'menu-item';
                Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
        
                Plato.innerHTML = `
                    <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                    <div class="menu-item-details">
                        <h2 class="menu-item-name">${plato.nombre}</h2>
                        <div class="item-information">
                            <span class="menu-item-price">15$</span>
                            <button class="button-abrir-modal">
                                <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                            </button>
                        </div>
                    </div>
                `;
        
                Postres_Container.appendChild(Plato);
                if (plato.seleccionada === 1) {
                    const Principal_Container = document.getElementById('MenuDia');
                    const Plato = document.createElement('div');
                    Plato.id = plato.id;
                    Plato.className = 'menu-item';
                    Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
            
                    Plato.innerHTML = `
                        <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                        <div class="menu-item-details">
                            <h2 class="menu-item-name">${plato.nombre}</h2>
                            <div class="item-information">
                                <span class="menu-item-price">15€</span>
                                <button class="button-abrir-modal">
                                    <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                                </button>
                            </div>
                        </div>
                    `;
                
                Principal_Container.appendChild(Plato);
                }
            }
            else if (plato.tipo_bebida === "trago") {
                const Tragos_Container = document.getElementById('Tragos');
                const Plato = document.createElement('div');
                Plato.id = plato.id;
                Plato.className = 'menu-item';
                Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '7', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
        
                Plato.innerHTML = `
                    <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                    <div class="menu-item-details">
                        <h2 class="menu-item-name">${plato.nombre}</h2>
                        <div class="item-information">
                            <span class="menu-item-price">7€</span>
                            <button class="button-abrir-modal">
                                <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                            </button>
                        </div>
                    </div>
                `;
        
                Tragos_Container.appendChild(Plato);
                if (plato.seleccionada === 1) {
                    const Principal_Container = document.getElementById('MenuDia');
                    const Plato = document.createElement('div');
                    Plato.id = plato.id;
                    Plato.className = 'menu-item';
                    Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
            
                    Plato.innerHTML = `
                        <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                        <div class="menu-item-details">
                            <h2 class="menu-item-name">${plato.nombre}</h2>
                            <div class="item-information">
                                <span class="menu-item-price">15€</span>
                                <button class="button-abrir-modal">
                                    <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                                </button>
                            </div>
                        </div>
                    `;
                
                Principal_Container.appendChild(Plato);
                }
            }

            else if (plato.tipo_comida === "vegetariano") {
                const Principal_Container = document.getElementById('Vegetariano');
                const Plato = document.createElement('div');
                Plato.id = plato.id;
                Plato.className = 'menu-item';
                Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
        
                Plato.innerHTML = `
                    <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                    <div class="menu-item-details">
                        <h2 class="menu-item-name">${plato.nombre}</h2>
                        <div class="item-information">
                            <span class="menu-item-price">15€</span>
                            <button class="button-abrir-modal">
                                <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                            </button>
                        </div>
                    </div>
                `;
        
                Principal_Container.appendChild(Plato);
                if (plato.seleccionada === 1) {
                    const Principal_Container = document.getElementById('MenuDia');
                    const Plato = document.createElement('div');
                    Plato.id = plato.id;
                    Plato.className = 'menu-item';
                    Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
            
                    Plato.innerHTML = `
                        <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                        <div class="menu-item-details">
                            <h2 class="menu-item-name">${plato.nombre}</h2>
                            <div class="item-information">
                                <span class="menu-item-price">15€</span>
                                <button class="button-abrir-modal">
                                    <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                                </button>
                            </div>
                        </div>
                    `;
                
                Principal_Container.appendChild(Plato);
                }
            }

            else if (plato.tipo_comida === "niño") {
                const Principal_Container = document.getElementById('Infantil');
                const Plato = document.createElement('div');
                Plato.id = plato.id;
                Plato.className = 'menu-item';
                Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
        
                Plato.innerHTML = `
                    <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                    <div class="menu-item-details">
                        <h2 class="menu-item-name">${plato.nombre}</h2>
                        <div class="item-information">
                            <span class="menu-item-price">15€</span>
                            <button class="button-abrir-modal">
                                <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                            </button>
                        </div>
                    </div>
                `;
        
                Principal_Container.appendChild(Plato);
                if (plato.seleccionada === 1) {
                    const Principal_Container = document.getElementById('MenuDia');
                    const Plato = document.createElement('div');
                    Plato.id = plato.id;
                    Plato.className = 'menu-item';
                    Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
            
                    Plato.innerHTML = `
                        <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                        <div class="menu-item-details">
                            <h2 class="menu-item-name">${plato.nombre}</h2>
                            <div class="item-information">
                                <span class="menu-item-price">15€</span>
                                <button class="button-abrir-modal">
                                    <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                                </button>
                            </div>
                        </div>
                    `;
                
                Principal_Container.appendChild(Plato);
                }
            }

            else if (plato.tipo_bebida === "bebida") {
                const Principal_Container = document.getElementById('Bebidas');
                const Plato = document.createElement('div');
                Plato.id = plato.id;
                Plato.className = 'menu-item';
                Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '5', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
        
                Plato.innerHTML = `
                    <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                    <div class="menu-item-details">
                        <h2 class="menu-item-name">${plato.nombre}</h2>
                        <div class="item-information">
                            <span class="menu-item-price">5€</span>
                            <button class="button-abrir-modal">
                                <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                            </button>
                        </div>
                    </div>
                `;
        
                Principal_Container.appendChild(Plato);
                if (plato.seleccionada === 1) {
                    const Principal_Container = document.getElementById('MenuDia');
                    const Plato = document.createElement('div');
                    Plato.id = plato.id;
                    Plato.className = 'menu-item';
                    Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
            
                    Plato.innerHTML = `
                        <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                        <div class="menu-item-details">
                            <h2 class="menu-item-name">${plato.nombre}</h2>
                            <div class="item-information">
                                <span class="menu-item-price">15€</span>
                                <button class="button-abrir-modal">
                                    <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                                </button>
                            </div>
                        </div>
                    `;
                
                Principal_Container.appendChild(Plato);
                }
            }

            else if (plato.tipo_bebida === "vino blanco" || plato.tipo_bebida === "vino rojo") {
                const Principal_Container = document.getElementById('Vinos');
                const Plato = document.createElement('div');
                Plato.id = plato.id;
                Plato.className = 'menu-item';
                Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
        
                Plato.innerHTML = `
                    <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                    <div class="menu-item-details">
                        <h2 class="menu-item-name">${plato.nombre}</h2>
                        <div class="item-information">
                            <span class="menu-item-price">15€</span>
                            <button class="button-abrir-modal">
                                <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                            </button>
                        </div>
                    </div>
                `;
        
                Principal_Container.appendChild(Plato);
                    if (plato.seleccionada === 1) {
                        const Principal_Container = document.getElementById('MenuDia');
                        const Plato = document.createElement('div');
                        Plato.id = plato.id;
                        Plato.className = 'menu-item';
                        Plato.setAttribute('onclick', `addToOrder('${plato.nombre}', '15', '${obtenerRutaImagen(plato.id)}', '${plato.id}')`);
                
                        Plato.innerHTML = `
                            <img loading="lazy" src="${obtenerRutaImagen(plato.id)}" class="menu-item-image" alt="Menu item" />
                            <div class="menu-item-details">
                                <h2 class="menu-item-name">${plato.nombre}</h2>
                                <div class="item-information">
                                    <span class="menu-item-price">15€</span>
                                    <button class="button-abrir-modal">
                                        <img style="margin-left: 8px; width: 18px; height: 18px;" loading="lazy" src="barra-de-menus.png" alt="Menu item" />
                                    </button>
                                </div>
                            </div>
                        `;
                    
                    Principal_Container.appendChild(Plato);
                    }
            }
            
            
            

        });

    } catch (error) {
        console.log("No se pudo actualizar el menu del dia:", error);
    }
}

var imagenes = { // Diccionario feo que guarda las rutas de la imagen del cada plato para no tener que hacerlo en base de datos
    "1": "Menu/seasonalsoupentrada.jpeg",
    "2": "Menu/sopadecalabacin.jpg",
    "3": "Menu/panrilletes.jpg",
    "4": "Menu/speltandmushroomSalad.jpeg",
    "5": "Menu/respaldodelinguinepasta.jpeg",
    "6": "Menu/chickenratatouillemed-scaled.jpg",
    "7": "Menu/OIP.jpeg",
    "8": "Menu/sauteedchicken.jpeg",
    "9": "Menu/Chocolate mouse.jpeg",
    "10": "Menu/fruitsalad.webp",
    "11": "Menu/apple tart.jpg",
    "12": "Menu/chocolatecake.jpg",
    "13": "Menu/mojito.jpeg",
    "14": "Menu/daiquiri de fresa.webp",
    "15": "Menu/old fashioned.png",
    "16": "Menu/margarita.jpg",
    "17": "Menu/vinorojoFleurderoc.jpeg",
    "18": "Menu/agneaurouge.png",
    "19": "Menu/vino blanco sancerre.jpeg",
    "20": "Menu/languedoc cite de carcassone.jpg",
    "21": "Menu/cocacola.jpeg",
    "22": "Menu/coca cola cheerry.jpeg",
    "23": "Menu/fanta orange.jpeg",
    "24": "Menu/sprite.jpg",
    "25": "Menu/vittel.jpeg",
    "26": "Menu/guiso.jpg",
    "27": "Menu/vegetalesvonagreta.jpeg",
    "28": "Menu/mixdeverduras.jpg",
    "29": "Menu/tomateconfitado.jpeg",
    "30": "Menu/patats.jpeg",
    "31": "Menu/linguinipastaconratatouille.jpeg",
    "32": "Menu/pure.jpeg",
    "33": "Menu/Screenshot_15-7-2024_102959_www.bing.com.jpeg",
    "Generic": "Menu/generic.jpg",
}

function obtenerRutaImagen(platoId) {
    if(imagenes[platoId] === undefined) {
        return imagenes['Generic'];
    }
    return imagenes[platoId] || "Ruta no encontrada";
}