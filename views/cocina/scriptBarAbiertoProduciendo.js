/* Recordatorio: los pedidos se refieren a los objetos factura de ventas */

document.addEventListener('DOMContentLoaded', function() {
    actualizarPedidos()
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('filter-active'));
            filterButtons.forEach(btn => btn.classList.add('filter-inactive'));
            this.classList.remove('filter-inactive');
            this.classList.add('filter-active');

            let pedidosMesa = document.querySelector("#pedidosMesa")
            
            let pedidosBar = document.querySelector("#pedidosBar")
            let pedidosTerraza = document.querySelector("#pedidosTerraza")
            let pedidosSalon = document.querySelector("#pedidosSalon")
            if (button.textContent == "Bar"){
                pedidosMesa.style.display = "none"
                pedidosBar.style.display = "flex"
                pedidosTerraza.style.display = "none"
                pedidosSalon.style.display = "none"
            }

            else if (button.textContent == "Mesas"){
                pedidosMesa.style.display = "flex"
                pedidosBar.style.display = "none"
                pedidosTerraza.style.display = "none"
                pedidosSalon.style.display = "none"
            }

            else if (button.textContent == "Terraza"){
                pedidosMesa.style.display = "none"
                pedidosBar.style.display = "none"
                pedidosTerraza.style.display = "flex"
                pedidosSalon.style.display = "none"
            }
            else if (button.textContent == "Salon"){
                pedidosMesa.style.display = "none"
                pedidosBar.style.display = "none"
                pedidosTerraza.style.display = "none"
                pedidosSalon.style.display = "flex"
            }
            
        });
    });
});

// funcion para actualizar en las vistas los pedidos (objetos factura de ventas) en las vistas
async function actualizarPedidos() {
    try {
        // Metodo que verifica si hay pedidos "pendientes" por procesar, y se muestran en la view.

        // esta ruta hay que importarla de ventas
        const response = await fetch('http://localhost:1234/ventas/factura'); 
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de pedidos');
        }
        const pedidos = await response.json(); // aqui se guardaria un arreglo de todos los pedidos(facturas) almacenados por ventas


        // este bloque fue el que agregue alfredo 
        let todosContenedores = document.querySelectorAll(".order-card")
        todosContenedores.forEach(contenedor => {
            
            if (contenedor.innerHTML.includes("pendiente") || contenedor.innerHTML.includes("preparando") || contenedor.innerHTML.includes("listo")){
                contenedor.classList.remove("ocupado")
                contenedor.id = ""
                contenedor.style = "background-color: "
                let ultimoTexto = contenedor.lastElementChild
                ultimoTexto.textContent = "ORDEN"
            }
        })


        // Iterar sobre los pedidos y actualizar los order-card
        pedidos.forEach(pedido => {
            
            if(pedido.zona.includes("bar")){

                // si el status_pedido es igual a 1, entonces es una orden pendiente
                if (pedido.status_pedido == 1 || pedido.status_pedido == 3 ) {

                    // seleccionamos todas las order-card (los contenedores con los pedidos que se muestrabn en las views)
                    let cardsMesas = document.querySelectorAll(".order-card")

                    // iteramos cada contenedor
                    for (const cardMesa of cardsMesas) {

                        // si el contenedor no esta ocupado por otro pedido
                        if (!cardMesa.classList.contains("ocupado")) {

                            // al id del contenedor le asignamos el id del pedido
                            cardMesa.id = pedido.id_cliente.toString();
                            // al contenedor le agregamos la clase de ocupado
                            cardMesa.classList.add("ocupado");

                            //seecionamos el ultimo hijo que es el que muestra el texto del pedido en las views
                            let carMesaStatus = cardMesa.lastElementChild;
                            
                            //Le colocamos el texto al contenedor del pedido
                            if (pedido.status_pedido == 1) {

                                /*
                                Pendiente (amarillo) #E6C100
                                Rechazado (rojo) #C84444
                                Preparando (verde) #1CB44
                                listo (azul) #00BCC8

                                */

                                cardMesa.style = "background-color: #E6C100"
                                carMesaStatus.innerHTML = `ID pedido: ${pedido.id_cliente} <br>Estatus: pendiente`;
                                break;
                            }
                            else if (pedido.status_pedido == 2) {
                                cardMesa.style = "background-color: #C84444"
                                carMesaStatus.innerHTML = `ID pedido: ${pedido.id_cliente} <br>Estatus: rechazado`;
                                break;
                            }
                            else if (pedido.status_pedido == 3) {
                                cardMesa.style = "background-color: #00BCC8"
                                carMesaStatus.innerHTML = `ID pedido: ${pedido.id_cliente} <br>Estatus: preparando`;
                                break;
                            }
                        }
                }
            }
            }
        }
        )
    } catch (error) {
        console.error('Error al actualizar los pedidos:', error);
    }
}
setInterval(actualizarPedidos, 15000); // Actualizar la vista de los pedidos cada 15 segundos (15000 milisegundos)

//boton procesar
var idPedido = "" // Esta variable guarda los id de los contenedores de pedidos de que se seleccionen en las vistas que a su vez, coinciden con los id de los pedidos que guarda ventas en la base de datos

// obtenemos el boton procesar
let botonProcesar = document.querySelector("#botonProcesar")

// le añadimos un evento a este boton procesar
botonProcesar.addEventListener("click" , async () => {
    // Evento asignado al botón de "Procesar". Se encarga de validar si se tienen ingredientes e instrumentos disponibles

    if (idPedido == ""){
        alert("Seleccione un pedido")
        return null
    }

    let contenedorPedidoAqui = document.getElementById(idPedido)
    if(!contenedorPedidoAqui.innerHTML.includes("pendiente")){
        return alert("Pedido invalido para procesar")
    }

    try {
        
        let idCardSeleccionada = idPedido; // se guarda el id del pedido seleccionado


        const response1 = await fetch(`http://localhost:1234/ventas/factura/${idCardSeleccionada}`)
        if (!response1.ok) {
            throw new Error('La solicitud no pudo completarse correctamente');
        }

        let pedido = await response1.json(); // obtenemos el pedido retornado por el controlador
        let listaComidas = pedido[0]
        listaComidas = JSON.parse(listaComidas.consumo) // [{"id": 2, "quantity": 3},{"id": 3, "quantity": 3}]
        let multilpicador = []
        listaComidas.forEach(comida => {
            multilpicador.push(comida.quantity)
        })    

        let fetchPromises = listaComidas.map(async objetoComida => {
            let res = await fetch(`http://localhost:1234/cocina/comida/${objetoComida.id}`)
            let nombrePlato = await res.json();
            return nombrePlato[0]; // objeto comida
        })

        let comidas = await Promise.all(fetchPromises); // array con los objetos comidas
        
        let ingredientesRequeridos = {}
        for(let i = 0; i < comidas.length ; i++){
            let ingredientesParaComida = JSON.parse(comidas[i].ingredientes) // {"2":1}
            
            Object.keys(ingredientesParaComida).forEach(idIngredienteRequerido => {
                if (idIngredienteRequerido in ingredientesRequeridos){
                    ingredientesRequeridos[idIngredienteRequerido] += parseFloat(parseFloat(ingredientesParaComida[idIngredienteRequerido]) * parseInt(multilpicador[i]))
                }
                else{
                    ingredientesRequeridos[idIngredienteRequerido] = parseFloat(parseFloat(ingredientesParaComida[idIngredienteRequerido]) * parseInt(multilpicador[i]))
                }
            })
        }
        
        let fetchPromises1 = Object.keys(ingredientesRequeridos).map(async idIngredienteRequerido => {
            let res = await fetch(`http://localhost:1234/inventario/api/cocina-bar/${idIngredienteRequerido}`);
            let ingrediente = await res.json();
            console.log(ingrediente)
            return ingrediente; // Devuelve el nombre del plato obtenido
        });

        let fetchPromises10 = Object.keys(ingredientesRequeridos).map(async idIngredienteRequerido => {
            let res = await fetch(`http://localhost:1234/inventario/api/cocina-bar/${idIngredienteRequerido}`);
            let ingrediente = await res.json();
            console.log(ingrediente)
            return ingrediente; // Devuelve el nombre del plato obtenido
        });

        let ingredientes = await Promise.all(fetchPromises1) // lista con los objetos ingredientes requeridos

        console.log({ingredientes})
        let ingredientesCalculo = await Promise.all(fetchPromises10)

        let contadorComidasHacer = [] // contador de las comidas que se pueden hacer

        for(let i= 0; i<comidas.length ; i++){
            let contador = 0 // contador de las comidas que se pueden hacer
            let ingredientesParaComida = JSON.parse(comidas[i].ingredientes) // {"2":1}
            for(let j = 0; j < multilpicador[i] ; j++){
                let bandera = false // bandera para chechar si se puede hacer una unidad de esta comida
                Object.keys(ingredientesParaComida).forEach(idIngredienteRequerido => {
                    ingredientesCalculo.forEach(objetoIngrediente => {
                        if(objetoIngrediente.id_cocina_bar == idIngredienteRequerido){
                            if(objetoIngrediente.id_cocina_bar == "6"){
                                console.log(objetoIngrediente.cantidad)
                                console.log(ingredientesParaComida[idIngredienteRequerido])
                                console.log(objetoIngrediente.cantidad - ingredientesParaComida[idIngredienteRequerido] )
                            }
                            if(objetoIngrediente.cantidad - ingredientesParaComida[idIngredienteRequerido]  < 0){
                                bandera = true
                            }
                            else{
                                objetoIngrediente.cantidad -= ingredientesParaComida[idIngredienteRequerido]
                            }
                        }
                    })
                })
                if(!bandera){
                    contador+= 1
                }
            }
            console.log("holaAquiVale")
            contadorComidasHacer.push(contador)
        }

        console.log({ingredientes})

        console.log({contadorComidasHacer})

        let bandera = false // bandera para saber si hacen falta ingredientes
        let valoresIngredientesRequeridos = Object.values(ingredientesRequeridos) // lista con los valores requeridos [2,5,67]

        
        let ingredientesFaltantes = []
        console.log({ingredientesRequeridos})
        console.log({ingredientes})
        console.log("Hola")
        for(let i = 0 ; i< ingredientes.length ; i++){
            console.log(ingredientes[i].cantidad)
            console.log(valoresIngredientesRequeridos[i])
            if((ingredientes[i].cantidad < valoresIngredientesRequeridos[i])){
                let cosa = {id: ingredientes[i].id_cocina_bar , cantidad: valoresIngredientesRequeridos[i]-ingredientes[i].cantidad}
                ingredientesFaltantes.push(cosa)
                bandera = true
            }
        }


        if(bandera){
            console.log("RECHAZADO")
            console.log({ingredientesFaltantes}) // diccionario con los id de los ingredientes faltantes y su respectiva cantidad que falta
            // alfredo aqui esta la variable que guarda cuanto de cada comida se puede hacer, eso dice la cantidad que se puede hacer por comida en el orden de 
            // contadorComidasHacer ---> esta es la variable

            let aviso = "Se pueden hacer los siguientes platos:\n"
            for (let index = 0; index < comidas.length; index++){
                aviso += `${comidas[index].nombre}: ${contadorComidasHacer[index]}\n`
            }
            console.log(aviso)
            
            /*HACERLO PARA CUANDO VENTAS HAGA ESE NUEVO ATRIBUTO */
            // const cambio = {status_pedido: 2, detalle_rechazo: aviso}
            const cambio = {status_pedido: 2}
            const requestOptions = {
                method: 'PATCH', 
                headers: {
                'Content-Type': 'application/json' 
                },
                body: JSON.stringify(cambio) 
            };

            const API_URL = `http://localhost:1234/ventas/factura/${idPedido}`
            const response = await fetch(API_URL , requestOptions)
            if (!response.ok) throw new Error('No se pudo obtener el ingrediente');

            alert("No se cuenta con los ingredientes suficientes para realizar este pedido");
            let cardMesa = document.getElementById(`${idCardSeleccionada}`);
            cardMesa.style = "background-color: #C84444"
            let cardMesaStatus = cardMesa.lastElementChild;
            cardMesaStatus.innerHTML = `ID pedido: ${idCardSeleccionada} <br>Estatus: rechazado`;


            // hacemos una solitud de los ingredientes faltantes a compras

            ingredientesFaltantes.forEach(async objetoIngredienteFaltante => {
                let nombreIngredienteFaltante = ""
                ingredientes.forEach(ingrediente => {
                    if(ingrediente.id_cocina_bar == objetoIngredienteFaltante.id){
                        nombreIngredienteFaltante = ingrediente.nombre
                    }
                })
                console.log(objetoIngredienteFaltante.cantidad)
                console.log(nombreIngredienteFaltante)
                const solicitud = {
                    depar: 'cocina', // departamento que realiza la solicitud
                    id_emp: "1", // ID del empleado que realiza la solicitud, ajustar según corresponda
                    cant: Math.ceil(objetoIngredienteFaltante.cantidad).toString(),
                    nombre_producto: nombreIngredienteFaltante,
                    fecha: new Date(),
                    detalle: 'Solicitud por falta de insumo para producior un pedido'
                };
                // Enviar solicitud de compra
                try{
                    await fetch('http://localhost:1234/compras-index/soli', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(solicitud)
                    });
                    console.log("solicitud enviada")
                }
                catch(e){
                    console.log(`Error: `, e)
                }
                
            })

            return null

        }

        let maquinariaNecesaria = [] // array que guardara los id de las maquinarias necesarias
        console.log(comidas)
        for(let i = 0; i < comidas.length ; i++){
            let maquinariaParaComida = comidas[i].instrumentos.split(",")
            maquinariaParaComida.forEach(idMaquinariaRequerida => {
                if(idMaquinariaRequerida in maquinariaNecesaria){
                    //nada
                } else{
                    maquinariaNecesaria.push(idMaquinariaRequerida)
                }
            })
        }
        
        let fetchPromises2 = maquinariaNecesaria.map(async idMaquinariaRequerida => {
            let res = await fetch(`http://localhost:1234/inventario/api/general/${idMaquinariaRequerida}`);
            let ingrediente = await res.json();
            return ingrediente; // Devuelve el nombre del plato obtenido
        });

        let maquinarias = await Promise.all(fetchPromises2) // lista con las maquinarias
        console.log({maquinariaNecesaria})
        console.log({maquinarias})
        let bandera1 = false

        for (let i = 0; i < maquinarias.length; i++) {
            console.log(maquinarias[i].funciona_estado)
            if(maquinarias[i].funciona_estado == 0){
                bandera1 = true
                break
            }
        }

        if(bandera1){
            console.log("RECHAZADO")
            const cambio = {status_pedido: 2}
            const requestOptions = {
                method: 'PATCH', 
                headers: {
                'Content-Type': 'application/json' 
                },
                body: JSON.stringify(cambio) 
            };

            const API_URL = `http://localhost:1234/ventas/factura/${idPedido}`
            const response = await fetch(API_URL , requestOptions)
            if (!response.ok) throw new Error('No se pudo obtener el ingrediente');

            alert("No se cuenta con los instrumentos para realizar este pedido");
            let cardMesa = document.getElementById(`${idCardSeleccionada}`);
            cardMesa.style = "background-color: #C84444"
            let cardMesaStatus = cardMesa.lastElementChild;
            cardMesaStatus.innerHTML = `ID pedido: ${idCardSeleccionada} <br>Estatus: rechazado`;
            return null

        }
        

        // si llega este punto hay que descontar los ingredientes de inventario

        ingredientes.forEach(async objetoIngrediente => {
            console.log("DESCONTADO")
            let index = ingredientes.indexOf(objetoIngrediente)
            let cantidadDescontar = valoresIngredientesRequeridos[index]
            await funcionUpdateIngrediente(objetoIngrediente.id_cocina_bar , cantidadDescontar)
        })

        // Si se llega a este punto entonces se han cumplido todas las validaciones
        // Y se cambia el estado de pedido a preparando/aceptado

        const cambio = {status_pedido: 3}
        const requestOptions = {
            method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify(cambio) 
        };

        const API_URL = `http://localhost:1234/ventas/factura/${idPedido}`
        const response = await fetch(API_URL , requestOptions)
        if (!response.ok) throw new Error('No se pudo actualizar el estado del pedido');

        // si el estado del pedido es 3, se acepta el pedido y se puede preparar
        console.log("ESTADO DEL PEDIDO: ", pedido[0].status_pedido)
        // se obtiene el contenedor del pedido seleccionado
        alert("Pedido aceptado")
        let cardMesa = document.getElementById(`${idCardSeleccionada}`);
        cardMesa.style = "background-color: #00BCC8"
        let cardMesaStatus = cardMesa.lastElementChild;
        cardMesaStatus.innerHTML = `ID pedido: ${idCardSeleccionada} <br>Estatus: preparando`;
        // Al aceptarse el pedido se considera (en la vista) que inicia la preparación
    } catch (error) {
        console.error('Hubo un error al conectarse con la base de datos de ventas:', error);
    }
    
})


// aqui le damos la funcionalidad a los contenedores de los pedidos cuando se le den click
const pedidosContainers = document.querySelectorAll(".order-card") //cartas de pedidos
pedidosContainers.forEach(container => {

    container.addEventListener("click", async function (e) {
        // Evento que muestra detalles del pedido, en la carta resumen, al clickear una de las cartas de pedidos

        // Efecto de seleccionado (Para permitir la selección de una sola carta a la vez)
        let otraVezMiDiv = document.querySelectorAll('.order-card');
        otraVezMiDiv.forEach(otraVezOrden => {
            if (!(otraVezOrden == e.currentTarget)){
                otraVezOrden.classList.remove("clicked")
            }
        })
        e.currentTarget.classList.toggle("clicked") 


        // al id del contenedor que coincide con el id del pedido, se lo asignamos al variable global que guarda los id
        let idStringCardSeleccionada = e.currentTarget.id
        if (idStringCardSeleccionada == ""){
            vaciarFichaLateralDerecha()
            agregarFuncionDelBotonListo()
            return null
        }
        idPedido = idStringCardSeleccionada // Obtenemos el id del pedido

        // Petición al controlador de mostrar pedido, que retorna los datos del mismo
        await fetch(`http://localhost:1234/cocina/mostrar-pedido?pedido_id=${idPedido}`, {
            method: "GET",
            headers: {
                "content-type": "aplication/json"
            }
        })
        .then( async response => { 
           let dato = await response.json()
            return dato
        }
        )
        .then(async data => {
            // Se muestran los datos del pedido en la carta resumen
            let pedido = data[0]
            /* pedido.consumo sera un string que representara una lista de objetos que seran las comidas pedidas ejemplo '[{"id":2,"quantity":3,"price":10},{"id":8,"quantity":2,"price":10}]' */
            let listaComidas = JSON.parse(pedido.consumo) // aqui tendremos el arreglo de las comidas
            let contenedorPedido = document.querySelector(".order-summary")
            contenedorPedido.innerHTML = "" // Se borra el contenido de la carta resumen de pedidos

            let elementoH3 = document.createElement("h3")
            elementoH3.className = "order-number"
            elementoH3.id = "order-id"
            elementoH3.textContent = `Pedido ID: ${idPedido}`
            contenedorPedido.appendChild(elementoH3) // Se agrega el id del pedido 

            let divPedido = document.createElement("div")
            divPedido.className = "order-type"
            divPedido.innerHTML = "PEDIDO"
            contenedorPedido.appendChild(divPedido) // Se agrega el indicador "PEDIDO"

             // Array para almacenar todas las promesas de fetch
            let fetchPromises = listaComidas.map(async objetoComida => {
                let res = await fetch(`http://localhost:1234/cocina/comida/${objetoComida.id}`);
                let nombrePlato = await res.json();
                return nombrePlato[0]; // Devuelve el nombre del plato obtenido
            });

            // Ejecutar todas las promesas de fetch simultáneamente
            let nombresPlatos = await Promise.all(fetchPromises);

            // Iterar sobre los resultados obtenidos y construir los elementos HTML
            nombresPlatos.forEach((nombrePlato, index) => {
                let objetoComida = listaComidas[index];

                let divItem = document.createElement("div");
                divItem.className = "order-item"; // div que almacena el nombre y cantidad de platos

                let itemName = document.createElement("span");
                itemName.className = "item-name";
                itemName.innerHTML = `${nombrePlato.nombre}`; // span con el nombre del plato

                let itemDetail = document.createElement("span");
                itemDetail.className = "item-detail";
                itemDetail.innerHTML = `x${objetoComida.quantity}`; // span con la cantidad del plato

                divItem.appendChild(itemName);
                divItem.appendChild(itemDetail);
                contenedorPedido.appendChild(divItem);
            });

            // Se completa el tamaño de la ficha después de construir los elementos
            completarTamañoFicha();

            
            // Se agrega el botón listo que (ya que se elimina tmb al inicio del evento)
            let listoButton = document.createElement("button")
            listoButton.className = "order-ready"
            listoButton.textContent = "Listo"
            contenedorPedido.appendChild(listoButton)
            // se agrega su funcionalidad 
            agregarFuncionDelBotonListo()
        })
        .catch(e => {
            console.error(`Error al acceder a la base de datos de pedidos (tabla de factura de ventas)`, e)
        })
    })
})


function agregarFuncionDelBotonListo(){
    // accedemos al boton listo
const listoButton = document.querySelector(".order-ready")

// le agregamos el evento al boton listo
listoButton.addEventListener("click", async function () {
    // Evento que cambia el estado del pedido

    

    if (idPedido === ""){
        // Se verifica que haya un pedido seleccionado
        alert("Seleccione un pedido")
        return null
    }

    // accedemos al contenedor que contiene el pedido seleccionado
    let cardSeleccionada = document.getElementById(idPedido.toString())

    if (!cardSeleccionada.innerHTML.includes("preparando")){
        // Se verifica que el pedido no tenga el estatus de rechazado, pendiente o listo
        alert("Pedido invalido para ponerlo en listo")
        return null
    }

    const cambio = {status_pedido: 4}
    const requestOptions = {
        method: 'PATCH', 
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify(cambio) 
    };

    const API_URL = `http://localhost:1234/ventas/factura/${idPedido}`
    const response = await fetch(API_URL , requestOptions)
    if (!response.ok) throw new Error('No se pudo obtener el ingrediente');
    
    let cardPedido = document.getElementById(`${idPedido}`)
    cardPedido.classList.remove("ocupado")
    let cardPedidoStatus = cardPedido.lastElementChild;
    cardPedido.style = "background-color: #1CB447"
    cardPedidoStatus.innerHTML = `ID pedido: ${idPedido}<br>Estatus: listo`; // Se muestra el cambio en la view
    idPedido = ""
    quitarEstatusClickeado()
        
})
}
agregarFuncionDelBotonListo()

// le agregamos un evento al boton devolver, que sirve para quitar de las vistas las ordenes rechazadas
let devolverBoton = document.querySelector("#botonDevolver")
devolverBoton.addEventListener("click" , async ()=>{
    // Evento que elimina de la carta seleccionada un pedido

    if (idPedido == ""){
        alert("Seleccione un pedido")
        return null
    }
    let cardSeleccionada = document.getElementById(idPedido.toString())

    // si el pedido no ha sido rechazado entonces no se puede devolver
    if (!cardSeleccionada.innerHTML.includes("rechazado")){
        return alert("Solo se pueden devolver pedidos que hayan sido rechazados")
    }

    let cardPedido = document.getElementById(`${idPedido}`)
    cardPedido.style = "background-color: "
    cardPedido.classList.remove("ocupado")
    let cardPedidoStatus = cardPedido.lastElementChild;
    cardPedidoStatus.textContent = `ORDEN`;
    idPedido = ""
    quitarEstatusClickeado()
    vaciarFichaLateralDerecha()
    agregarFuncionDelBotonListo()
})


// evento boton hacer de nuevo en caso de que haya habido un incidente en la cocina
let botonHacerNuevo = document.querySelector("#botonHacerNuevo")
botonHacerNuevo.addEventListener("click" , async ()=> {

    if (idPedido == ""){
        alert("Seleccione un pedido")
        return null
    }
    let contenedorPedidoAqui = document.getElementById(idPedido)
    if(!contenedorPedidoAqui.innerHTML.includes("preparando")){
        return alert("Pedido invalido para procesa de nuevo")
    }

    if (confirm("¿Estas seguro que deseas volver a procesar el pedido?")){
    
        try {
            let idCardSeleccionada = idPedido; // se guarda el id del pedido seleccionado
    
            const response1 = await fetch(`http://localhost:1234/ventas/factura/${idCardSeleccionada}`)
            if (!response1.ok) {
                throw new Error('La solicitud no pudo completarse correctamente');
            }
    
            let pedido = await response1.json(); // obtenemos el pedido retornado por el controlador
            let listaComidas = pedido[0]
                listaComidas = JSON.parse(listaComidas.consumo)
            let multilpicador = []
            listaComidas.forEach(comida => {
                multilpicador.push(comida.quantity)
            })    
    
            let fetchPromises = listaComidas.map(async objetoComida => {
                let res = await fetch(`http://localhost:1234/cocina/comida/${objetoComida.id}`)
                let nombrePlato = await res.json();
                return nombrePlato[0];
            })
    
            let comidas = await Promise.all(fetchPromises); // array con los objetos comidas
            
            let ingredientesRequeridos = {}
            for(let i = 0; i < comidas.length ; i++){
                let ingredientesParaComida = JSON.parse(comidas[i].ingredientes) // {"2":1}
                
                Object.keys(ingredientesParaComida).forEach(idIngredienteRequerido => {
                    if (idIngredienteRequerido in ingredientesRequeridos){
                        ingredientesRequeridos[idIngredienteRequerido] += parseFloat(parseFloat(ingredientesParaComida[idIngredienteRequerido]) * parseInt(multilpicador[i]))
                    }
                    else{
                        ingredientesRequeridos[idIngredienteRequerido] = parseFloat(parseFloat(ingredientesParaComida[idIngredienteRequerido]) * parseInt(multilpicador[i]))
                    }
                })
            }
            
            let fetchPromises1 = Object.keys(ingredientesRequeridos).map(async idIngredienteRequerido => {
                let res = await fetch(`http://localhost:1234/inventario/api/cocina-bar/${idIngredienteRequerido}`);
                let ingrediente = await res.json();
                return ingrediente; // Devuelve el nombre del plato obtenido
            });
    
            let ingredientes = await Promise.all(fetchPromises1) // lista con los objetos ingredientes requeridos
            console.log({ingredientesRequeridos})
            console.log({ingredientes})
    
            let bandera = false // bandera para saber si hacen falta ingredientes
            let valoresIngredientesRequeridos = Object.values(ingredientesRequeridos)
            for(let i = 0 ; i< ingredientes.length ; i++){
                if((ingredientes[i].cantidad < valoresIngredientesRequeridos[i])){
                    bandera = true
                    break
                }
            }
    
            if(bandera){
                console.log("RECHAZADO")
                const cambio = {status_pedido: 2}
                const requestOptions = {
                    method: 'PATCH', 
                    headers: {
                    'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(cambio) 
                };
    
                const API_URL = `http://localhost:1234/ventas/factura/${idPedido}`
                const response = await fetch(API_URL , requestOptions)
                if (!response.ok) throw new Error('No se pudo obtener el ingrediente');
    
                alert("No se cuenta con los recursos para realizar de nuevo este pedido");
                let cardMesa = document.getElementById(`${idCardSeleccionada}`);
                cardMesa.style = "background-color: #C84444"
                let cardMesaStatus = cardMesa.lastElementChild;
                cardMesaStatus.innerHTML = `ID pedido: ${idCardSeleccionada} <br>Estatus: rechazado`;
                return null
    
            }
    
            let maquinariaNecesaria = [] // array que guardara los id de las maquinarias necesarias
            console.log(comidas)
            for(let i = 0; i < comidas.length ; i++){
                let maquinariaParaComida = comidas[i].instrumentos.split(",")
                maquinariaParaComida.forEach(idMaquinariaRequerida => {
                    if(idMaquinariaRequerida in maquinariaNecesaria){
                        //nada
                    } else{
                        maquinariaNecesaria.push(idMaquinariaRequerida)
                    }
                })
            }
            
            let fetchPromises2 = maquinariaNecesaria.map(async idMaquinariaRequerida => {
                let res = await fetch(`http://localhost:1234/inventario/api/general/${idMaquinariaRequerida}`);
                let ingrediente = await res.json();
                return ingrediente; // Devuelve el nombre del plato obtenido
            });
    
            let maquinarias = await Promise.all(fetchPromises2) // lista con las maquinarias
            console.log({maquinariaNecesaria})
            console.log({maquinarias})
            let bandera1 = false
    
            for (let i = 0; i < maquinarias.length; i++) {
                console.log(maquinarias[i].funciona_estado)
                if(maquinarias[i].funciona_estado == 0){
                    bandera1 = true
                    break
                }
            }
    
            if(bandera1){
                console.log("RECHAZADO")
                const cambio = {status_pedido: 2}
                const requestOptions = {
                    method: 'PATCH', 
                    headers: {
                    'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(cambio) 
                };
    
                const API_URL = `http://localhost:1234/ventas/factura/${idPedido}`
                const response = await fetch(API_URL , requestOptions)
                if (!response.ok) throw new Error('No se pudo obtener el ingrediente');
    
                alert("No se cuenta con los recursos para realizar de nuevo este pedido");
                let cardMesa = document.getElementById(`${idCardSeleccionada}`);
                cardMesa.style = "background-color: #C84444"
                let cardMesaStatus = cardMesa.lastElementChild;
                cardMesaStatus.innerHTML = `ID pedido: ${idCardSeleccionada} <br>Estatus: rechazado`;
                return null
    
            }
            
    
            // si llega este punto hay que descontar los ingredientes de inventario
    
            ingredientes.forEach(async objetoIngrediente => {
                console.log("DESCONTADO")
                let index = ingredientes.indexOf(objetoIngrediente)
                let cantidadDescontar = valoresIngredientesRequeridos[index]
                await funcionUpdateIngrediente(objetoIngrediente.id_cocina_bar , cantidadDescontar)
            })
    
            // Si se llega a este punto entonces se han cumplido todas las validaciones
            // Y se cambia el estado de pedido a preparando/aceptado
    
            const cambio = {status_pedido: 3}
            const requestOptions = {
                method: 'PATCH', 
                headers: {
                'Content-Type': 'application/json' 
                },
                body: JSON.stringify(cambio) 
            };
    
            const API_URL = `http://localhost:1234/ventas/factura/${idPedido}`
            const response = await fetch(API_URL , requestOptions)
            if (!response.ok) throw new Error('No se pudo actualizar el estado del pedido');
    
            // si el estado del pedido es 3, se acepta el pedido y se puede preparar
            console.log("ESTADO DEL PEDIDO: ", pedido[0].status_pedido)
            // se obtiene el contenedor del pedido seleccionado
            alert("Si se cuenta con los recursos para volver a preparar el pedido");
            let cardMesa = document.getElementById(`${idCardSeleccionada}`);
            cardMesa.style = "background-color: #00BCC8"
            let cardMesaStatus = cardMesa.lastElementChild;
            cardMesaStatus.innerHTML = `ID pedido: ${idCardSeleccionada} <br>Estatus: preparando`;
            // Al aceptarse el pedido se considera (en la vista) que inicia la preparación
        } catch (error) {
            console.error('Hubo un error al conectarse con la base de datos de ventas:', error);
        }
    }
})


// funcion que quita el status de clickeado de los contenedores de las vistas que representan los pedidos
function quitarEstatusClickeado(){
    let contenedoresPedidos = document.querySelectorAll(".order-card")
    contenedoresPedidos.forEach(contenedorPedido => {
        contenedorPedido.classList.remove("clicked")
    })
}

// vacia la ficha lateral derecha que muestra la info del pedido
function vaciarFichaLateralDerecha() {
    let contenedorPedido = document.querySelector(".order-summary")
    contenedorPedido.innerHTML = `<h3 class="order-number">Pedido ID:</h3>
                    <div class="order-type">PEDIDO</div>
                    <div class="order-item">
                        <span class="item-name"></span>
                        <span class="item-detail"></span>
                    </div>
                    <div class="order-item">
                        <span class="item-name"></span>
                        <span class="item-detail"></span>
                    </div>
                    <div class="order-item">
                        <span class="item-name"></span>
                        <span class="item-detail"></span>
                    </div>
                    <div class="order-item">
                        <span class="item-name"></span>
                        <span class="item-detail"></span>
                    </div>
                    <div class="order-item">
                        <span class="item-name"></span>
                        <span class="item-detail"></span>
                    </div>
                    <div class="order-item">
                        <span class="item-name"></span>
                        <span class="item-detail"></span>
                    </div>
                    <button class="order-ready">listo</button>` 
    
    /*
    // Se borra el contenido de la carta resumen de pedidos

    let elementoH3 = document.createElement("h3")
    elementoH3.className = "order-number"
    elementoH3.id = "order-id"
    elementoH3.textContent = `Pedido ID:`
    contenedorPedido.appendChild(elementoH3) // Se agrega el id del pedido 

    let divPedido = document.createElement("div")
    divPedido.className = "order-type"
    divPedido.innerHTML = "PEDIDO"
    contenedorPedido.appendChild(divPedido) // Se agrega el indicador "PEDIDO"

    */
}

function completarTamañoFicha(){
    let contenedorPedido = document.querySelector(".order-summary")
    let elementosHijos = contenedorPedido.children;
    let elementosArray = Array.from(elementosHijos).slice(2);
    if (elementosArray.length < 6){
        for (let i = 0 ; i < 6 - elementosArray.length ; i++){
            let contenedor1 = document.createElement("DIV")
            contenedor1.classList.add("order-item")
            let subContenedor1 = document.createElement("span")
            subContenedor1.classList.add("item-name")
            let subContenedor2 = document.createElement("span")
            subContenedor1.classList.add("item-detail")
            contenedor1.appendChild(subContenedor1)
            contenedor1.appendChild(subContenedor2)
            contenedorPedido.appendChild(contenedor1)
        }
    }
    else {
        return null
    }
    }

    async function funcionUpdateIngrediente(id, canitdadRequerida){
        // Función que cambia el estado del instrumento seleccionado en la base de datos
    
        // Solicitud GET para obtener los atributos del instrumento
          let instrumentoData = {}
    
          const options = {
            method: 'GET', 
            headers: {
            'Content-Type': 'application/json' 
            }
        };
    
      await fetch(`http://localhost:1234/inventario/api/cocina-bar/${id}` , options)
      .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          instrumentoData = data
          instrumentoData.cantidad = instrumentoData.cantidad - canitdadRequerida
          instrumentoData.fecha_caducidad = instrumentoData.fecha_caducidad.slice(0,-1)
          console.log(instrumentoData.fecha_caducidad)
          console.log(typeof instrumentoData.fecha_caducidad)
          console.log('Se obtuvo el instrumento:', instrumentoData);
        })
        .catch(error => {
          console.error('Fetch error:', error);
         
        });
    
        // Actualización del instrumento en base de datos
        const requestOptions = {
            method: 'PUT', 
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify(instrumentoData) 
        };
    
        // Petición a inventario (habria que importar esta ruta de inventario)
        await fetch(`http://localhost:1234/inventario/api/cocina-bar/${id}` , requestOptions)
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parsear la respuesta JSON si es necesario
          })
          .then(data => {
            console.log('Actualización exitosa:', data); // Manejar la respuesta de éxito
            
          })
          .catch(error => {
            console.error('Fetch error:', error);
           
          });
    }