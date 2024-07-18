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
                backgroundColor:"#0F624A",
                data:[10,30,25,30,23,10,6]
            }
        ]
    }
});



document.addEventListener('DOMContentLoaded', (event) => {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // obtener los valores de la vista de Gerente
    const monto_apertura = document.querySelector(".apertura-cierre");
    const monto_cierre = document.querySelector(".apertura-cierre");
    const tasa_del_dia = document.querySelector(".tasa-dia");
    const presupuesto = document.querySelector(".prespuesto");
    const registro = document.getElementById("registro");

    // seleccionar los botones para gestionar sus eventos de click
    const btn_monto_apertura = document.querySelector(".btn-apertura");
    const btn_monto_cierre = document.querySelector(".btn-cierre");
    const btn_tasa_del_dia = document.querySelector(".btn-tasa-dia");
    const btn_presupuesto = document.querySelector(".btn-presupuesto");
    const btn_registro = document.getElementById("btn-registro");
    const estadoCaja = document.querySelector(".estado-caja");

    // seleccionas los inputs de vista gerente
    const input_monto_apertura = document.querySelector(".apertura-cierre");
    const input_tasa_dia = document.querySelector(".tasa-dia");
    const calcularBtn = document.getElementById('calcularBtn');
    const mesasSalon = document.getElementById('mesaSalon');
    const mesasTerraza = document.getElementById('mesaTerraza');
    const precioMesaSalon = 30;
    const precioMesaTerraza = 50;
    let estado = "Cerrada";

    btn_monto_apertura.addEventListener("click", () => {
        // obtenemos el valor del campo de texto
        let valorInput = input_monto_apertura.value;

        if (!valorInput || isNaN(valorInput) || valorInput <= 0) {
            alert("Por favor, ingrese un valor positivo y no vacío.");
            return;
        }
    
        // Limpiar el campo de input
        input_monto_apertura.value = "";

        estado = "Abierta";
        // Mostrar el valor almacenado en una alerta
        alert("Apertura: " + valorInput);
        estadoCaja.innerHTML = `<h3>Estado de la caja: ${estado}</h3>`;
    });

    btn_monto_cierre.addEventListener("click", () => {
        // obtenemos el valor del campo de texto
        let valorInput = input_monto_apertura.value;

        if (!valorInput || isNaN(valorInput) || valorInput <= 0) {
            alert("Por favor, ingrese un valor positivo y no vacío.");
            return;
        }
    
        input_monto_apertura.value = "";

        estado = "Cerrado";
    
        alert("Cierre: " + valorInput);
        estadoCaja.innerHTML = `<h3>Estado de la caja: ${estado}</h3>`;
    });

    calcularBtn.addEventListener('click', () => {
        // Obtener las cantidades seleccionadas

        const total = document.getElementById('total');
        const cantidadMesasSalon = parseInt(mesasSalon.value);
        const cantidadMesasTerraza = parseInt(mesasTerraza.value);

        // Calcular el precio total
        const precioTotal = (cantidadMesasSalon * precioMesaSalon) + (cantidadMesasTerraza * precioMesaTerraza);


        total.innerHTML = `<h3>Precio total: ${precioTotal}$ </h3>`;
        
    });
    
    // Lógica para el botón "Tasa del Día"
    btn_tasa_del_dia.addEventListener("click", () => {
        // Obtiene la tasa del día de la entrada del usuario
        let valorentrada = parseFloat(tasa_del_dia.value);
        console.log('Tasa del día en euros(€):', valorentrada);
        
        // Almacena la tasa del día para su uso posterior
        localStorage.setItem('exchangeRate', valorentrada);

        // Muestra un alert con el dato guardado
        alert('Tasa del día guardada: ' + valorentrada);
    });

    // Función para actualizar la pantalla con las ventas
    function actualizarVentas() {
        const ventas = JSON.parse(localStorage.getItem('ventas') || '[]');
        
        const ventasDelDia = ventas.filter(venta => venta.fecha === new Date().toLocaleDateString());
        const ventasDeLaSemana = ventas.filter(venta => {
            const fechaVenta = new Date(venta.fecha);
            const fechaActual = new Date();
            const primerDiaDeLaSemana = new Date(fechaActual.setDate(fechaActual.getDate() - fechaActual.getDay()));
            return fechaVenta >= primerDiaDeLaSemana;
        });
        const ventasDelMes = ventas.filter(venta => {
            const fechaVenta = new Date(venta.fecha);
            const fechaActual = new Date();
            return fechaVenta.getMonth() === fechaActual.getMonth() && fechaVenta.getFullYear() === fechaActual.getFullYear();
        });

        ventasDia.innerHTML = `<h3>Ventas del Día</h3>${ventasDelDia.map(venta => `<p>${venta.valor}</p>`).join('')}`;
        ventasSemana.innerHTML = `<h3>Ventas de la Semana</h3>${ventasDeLaSemana.map(venta => `<p>${venta.valor}</p>`).join('')}`;
        ventasMes.innerHTML = `<h3>Ventas del Mes</h3>${ventasDelMes.map(venta => `<p>${venta.valor}</p>`).join('')}`;
    }
    
    // Lógica para el botón "Registros"
    btn_registro.addEventListener('click', () => {
        const valorRegistro = registro.value.trim();

        if (valorRegistro) {
            const ventas = JSON.parse(localStorage.getItem('ventas') || '[]');
            const nuevaVenta = {
                valor: valorRegistro,
                fecha: new Date().toLocaleDateString()
            };
            ventas.push(nuevaVenta);
            localStorage.setItem('ventas', JSON.stringify(ventas));

            alert('El valor ha sido guardado: ' + valorRegistro);
            registro.value = '';

            actualizarVentas();
        } else {
            alert('Por favor, ingresa un valor.');
        }
    });
            

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

