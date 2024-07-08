document.addEventListener('DOMContentLoaded', (event) => {
    // Selecciona todos los botones de abrir modal
    const openModalButtons = document.querySelectorAll('.button-abrir-modal');

    // Asigna el evento click a cada botón de abrir modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
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

    // Cierra la ventana modal al hacer clic fuera de ella
    document.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'dialog') {
            event.target.close();
        }
    });
});