const PathUrl = "http:localhost:1234/ventas/";

addEventListener('DOMContentLoaded', function() {

    const enviar_pedido = document.querySelector(".confirm-button");

    let mesas = {"1" : pedido, "2" : pedido, "3" : pedido,
                 "4" : pedido, "5" : pedido, "6" : pedido,
                 "7" : pedido, "8" : pedido, "9" : pedido
    }

    // funcion para tomar el pedido
    function tomar_pedido(){

        const pedido_cliente = document.querySelector(".order-item");
        let consumo = {}

        // recorremos etiquetas con la orden del pedido
        pedido_cliente.forEach(item => {
        
            // obtenemos el nombre de la comida para asi conocer el id de la misma
            let id_comida = item.querySelector(".order-item-name").id;
            let cantidad_comida = item.querySelector(".quantity-value"); // obtenemos la cantidad de comida
            consumo[id_comida] = cantidad_comida;

        });

        const monto = document.querySelector(".total-amount").textContent;  // obtenemos el monto total del pedido
        const iva = monto * 1.16  // calcular el iva del monto total del pedido

        // creamos un objeto de nuestra factura
        const factura = {monto : monto, iva : iva, consumo : consumo, estatus : 1};
        return factura;
    }


    // creamos el pedido del cliente
    enviar_pedido.addEventListener("click", () => {

        if(document.querySelector(".order-item")){

            factura = tomar_pedido();  // obtener el objeto factura

            // creamos el pedido en nuestra tabla de facturas
            fetch(PathUrl+"factura", {
                method : "POST",
                headers : { "Content-Type" : "aplication/json" },
                body : JSON.stringify(factura)
            })
            .then((res) => {
                if (res.ok) {
                    console.log('Solicitud exitosa');
                    // Procesar la respuesta del servidor
                    return res.json();
                } else {
                    console.error('Error en la solicitud');
                    throw new Error('Error en la solicitud');
                }
            }).then((reJSON) => {
                console.log({reJSON})
            })

        } else {
            alert("No hay ningun pedido realizado")
        }
    })


    function ver_estatus_pedido(){

        fetch(PathUrl+"factura").then((res) => {
            if (res.ok) {

                // obtener los pedidos
                const pedidos = res.json();


                
            } else {
                console.error('Error en la solicitud');
                throw new Error('Error en la solicitud');
            }
        })

    }





});