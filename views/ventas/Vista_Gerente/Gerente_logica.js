document.addEventListener('DOMContentLoaded', (event) => {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropbtn.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    // Cerrar el dropdown si el usuario hace clic fuera de él
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *')) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }

    // Actualizar el texto del botón cuando se selecciona una opción
    const options = dropdownContent.querySelectorAll('a');
    options.forEach(option => {
        option.addEventListener('click', (event) => {
            dropbtn.querySelector('span').textContent = event.target.textContent;
            dropdown.classList.remove('show');
        });
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const modals = document.querySelectorAll('.modal');
    const openModalButtons = document.querySelectorAll('button[id^="openModal"]');
    const closeModalButtons = document.querySelectorAll('.closeBtn');

    openModalButtons.forEach(button => {
        button.onclick = function() {
            const modalId = this.id.replace('openModal', 'modal');
            document.getElementById(modalId).style.display = 'block';
        }
    });

    closeModalButtons.forEach(button => {
        button.onclick = function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        }
    });

    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }
});