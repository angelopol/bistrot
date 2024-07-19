document.addEventListener('DOMContentLoaded', (event) => {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // obtener los valores de la vista de Gerente
    const monto_apertura = document.querySelector(".apertura-cierre");
    const monto_cierre = document.querySelector(".apertura-cierre");
    const tasa_del_dia = document.querySelector(".tasa-dia");
    const presupuesto = document.querySelector(".prespuesto");
    const eventos = document.querySelector(".eventos");
    const registro = document.querySelector("resgitro");

    // seleccionar los botones para gestionar sus eventos de click
    const btn_monto_apertura = document.querySelector(".btn-apertura-cierre");
    const btn_monto_cierre = document.querySelector(".btn-apertura-cierre");
    const btn_tasa_del_dia = document.querySelector(".btn-tasa-dia");
    const btn_presupuesto = document.querySelector(".btn-prespuesto");
    const btn_eventos = document.querySelector(".btn-eventos");
    const btn_registro = document.querySelector(".btn-registro");


    btn_monto_apertura.addEventListener("click", () => {
        // obtenemos el valor del campo de texto
        monto_apertura.value
        
    });

    btn_monto_cierre.addEventListener("click", () => {
        // obtenemos el valor del campo de texto
        monto_cierre.value
    });

    btn_tasa_del_dia.addEventListener("click", () => {
        // obtenemos el valor del campo de texto
        tasa_del_dia.value
    });

    /*
    btn_presupuesto.addEventListener("click", () => {
        // obtenemos el valor del campo de texto
        presupuesto.value
    });
    */

    /*
    btn_eventos.addEventListener("click", () => {
        // obtenemos el valor del campo de texto
        eventos.value
    });
    */

    /*
    btn_registro.addEventListener("click", () => {
        // obtenemos el valor del campo de texto
        registro.value
    });
    */


    if (dropbtn != null){
        dropbtn.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });
    }

    // Cerrar el dropdown si el usuario hace clic fuera de él
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *')) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }

    // Actualizar el texto del botón cuando se selecciona una opción
    if (dropdownContent != null){
        const options = dropdownContent.querySelectorAll('a');
        options.forEach(option => {
            option.addEventListener('click', (event) => {
                dropbtn.querySelector('span').textContent = event.target.textContent;
                dropdown.classList.remove('show');
            });
        });
    }
});

//Abrir y cerrar modals de gerente
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

//Grafica de las ventas
let miCanvas = document.getElementById("myChart").getContext("2d");

var chart = new Chart(miCanvas,{
    type:"bar",
    scales:{
        x:{
            max: 5
        }
    },
    data:{
        labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes","Sabado","Domingo"],
        datasets:[
            {
                label:"Ventas de la semana",
                backgroundColor:"rgb(0,0,0)",
                data:[12,39,25,30,23,10,6]
            }
        ]
    }
});