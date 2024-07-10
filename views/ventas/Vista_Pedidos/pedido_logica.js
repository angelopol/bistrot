document.addEventListener('DOMContentLoaded', (event) => {
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
});

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
