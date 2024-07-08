
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Acción: ' + this.textContent);
        });
    });

    const orderReadyButton = document.querySelector('.order-ready');
    orderReadyButton.addEventListener('click', function() {
        alert('Pedido marcado como listo');
    });

