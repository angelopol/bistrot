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
                data:[12,15,20,21,23,30,13]
            }
        ]
    }
});

let suma = 0;


document.addEventListener('DOMContentLoaded', (event) => {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // obtener los valores de la vista de Gerente
    //const monto_apertura = document.querySelector(".apertura-cierre");
    //const monto_cierre = document.querySelector(".apertura-cierre");
    const tasa_del_dia = document.querySelector(".tasa-dia");
    //const presupuesto = document.querySelector(".prespuesto");
    const registro = document.getElementById("registro");

    // seleccionar los botones para gestionar sus eventos de click
    const btn_monto_apertura = document.querySelector(".btn-apertura");
    const btn_monto_cierre = document.querySelector(".btn-cierre");
    const btn_tasa_del_dia = document.querySelector(".btn-tasa-dia");
    //const btn_presupuesto = document.querySelector(".btn-presupuesto");
    const btn_registro = document.querySelector(".btn-registro");
    const estadoCaja = document.querySelector(".estado-caja");

    // seleccionas los inputs de vista gerente
    const input_monto_apertura = document.querySelector(".apertura-cierre");
    const input_fecha_apertura = document.querySelector(".fecha-apertura-cierre");
    //const input_tasa_dia = document.querySelector(".tasa-dia");
    const calcularBtn = document.getElementById('calcularBtn');
    const mesasSalon = document.getElementById('mesaSalon');
    const mesasTerraza = document.getElementById('mesaTerraza');
    const precioMesaSalon = 30;
    const precioMesaTerraza = 50;
    let estado = "Cerrada";

    // vaariables que vamos a almacenar en la tabla de base de datos
    let valorInput_apertura = null; // obtenemos el monto inicial
    let valorentrada = null;  // obtenemos la tasa del dia
    let fecha_apertura = null;  // obtenemos la fecha de apertura
    let fecha_cierre= null; // obtenemos la fecha de cierre
    let egresos = 0;  // egresos del restaurante

    // obtenemos los ingresos del dia de todas las ventas
    let ingresos_de_las_ventas =  0;// obtenemos los ingresos del dia
    obtener_ingresos_totales_ivas()
    btn_monto_apertura.addEventListener("click", () => {
        // obtenemos el valor del campo de texto
        valorInput_apertura = input_monto_apertura.value;
        fecha_apertura = input_fecha_apertura.value;

        if (!valorInput_apertura || isNaN(valorInput_apertura) || valorInput_apertura <= 0) {
            alert("Por favor, ingrese un valor positivo y no vacío.");
            return;
        }
    
        // Limpiar el campo de input
        input_monto_apertura.value = "";
        input_fecha_apertura.value = "";

        estado = "Abierta";
        // Mostrar el valor almacenado en una alerta
        alert("Apertura: " + valorInput_apertura + "€, Fecha: " + fecha_apertura);
        estadoCaja.innerHTML = `<h3>Estado de la caja: ${estado}</h3>`;

        console.log(valorInput_apertura)
        console.log(fecha_apertura)
        input_monto_apertura.style.display = 'none';
    });

    
    

    btn_monto_cierre.addEventListener("click", () => {
        

        if(valorentrada !== null && fecha_apertura !== null && valorInput_apertura !== null && ingresos_de_las_ventas !== null){
    
            // obtenemos el valor del campo de texto
            fecha_cierre = input_fecha_apertura.value;

            input_monto_apertura.value = "";

            estado = "Cerrado";
        
            alert("Fecha: " + fecha_cierre);
            estadoCaja.innerHTML = `<h3>Estado de la caja: ${estado}</h3>`;

            crear_caja(valorentrada,fecha_apertura,fecha_cierre,valorInput_apertura,ingresos_de_las_ventas,egresos)

            if(input_monto_apertura.style.display === "none"){
                input_monto_apertura.style.display = 'block';
            }

        }
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
        valorentrada = parseFloat(tasa_del_dia.value);
        console.log('Tasa del día en euros(€):', valorentrada);

        // Muestra un alert con el dato guardado
        alert('Tasa del día guardada: ' + valorentrada);
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


async function obtener_ingresos_totales_ivas(){

    let ingresos = [];

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

            // vamos a obtener las ventas que tenga el status 5 ya que eso significa que ya el cliente pago
            if (pedido.status_pedido === 5){
                
                ingresos.push(parseFloat(pedido.iva))
            }
            
            
        })
        

    } catch (error){
        console.log("No se pudo obtener la lista de pedidos");
    }

    // retornamos los ingresos totales
    ingresos_de_las_ventas = sumarElementos(ingresos)
    console.log(ingresos_de_las_ventas)
    
}


function sumarElementos(array) {
    let suma = 0;
    for (const numero of array) {
        suma += numero;
    }
    return suma;
}

// crear la tabla de caja

async function crear_caja(tasa,date_apertura,date_cierre,monto_apertura,ingresos,egresos){

    caja = {
        turno_horario : '',
        tasa_del_dia : tasa,
        apertura : date_apertura,
        cierre : date_cierre,
        monto_inicial : parseFloat(monto_apertura),
        monto_final : parseFloat(monto_apertura),
        ingresos : parseFloat(ingresos),
        egresos : parseFloat(egresos)
    }

    console.log(caja)

    try{

        const response = await fetch("../caja", {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify(caja)
        })
        
        if(!response.ok){
            if (response.status === 404) {
                console.log("La URL 'http:localhost:1234/ventas/factura' no se encontró.");
            } else {
                const error = response.json()
                console.error('Error en la solicitud', error);
                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }
            return
        } else {
            console.log("Respuesta Exitosa")
        }
    

    } catch (error) {
        
        console.error("No se pudo crear la tabla de caja:", error); 
    }
    
}