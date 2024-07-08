import { ComidaModel } from '../models/mysql/comida.js'
export class pedidoController {

    //Funcion para buscar el pedido por id, y hacer las validaciones
    static async orderStatus(req , res) {

        const {pedido_id} = req.query // sacamos el id del pedido de la url

        // hay que importar PedidoModel que es un el modelo de pedido del modulo de ventas
        const pedido = await PedidoModel.getForId({pedido_id}) /* IMPORTAR MODULO EXTERO VENTAS*/

        //sacamos las comidas del pedido
        const comidas = JSON.parse(pedido.comidas);

        let ingredientesRequeridos = {};

        // iteramos los id de las comidas
        Object.keys(comidas).forEach( async idComida => {
            
            let multiplicador = parseInt(comidas[idComida])
            let comida = await ComidaModel.getForId({idComida})
            let ingredientes = JSON.parse(comida.ingredientes) 

            Object.keys(ingredientes).forEach(async idIngrediente => {

                if (idIngrediente in ingredientesRequeridos){
                    ingredientesRequeridos[idIngrediente] += parseFloat(ingredientes[idIngrediente]) * multiplicador
                } else {
                    ingredientesRequeridos[idIngrediente] = parseFloat(ingredientes[idIngrediente]) * multiplicador
                }
            })
        })


        // verificamos la cantidad de ingredientes que se requieren con la cantidad de ingredientes en inventario 
        Object.keys(ingredientesRequeridos).forEach(async idIngredienteRequerido => {

            // habria que importar esta funcion de inventario
            const response = await fetch(`http://localhost:3000/api/modulo-cocina/cocina-bar/${idIngredienteRequerido}`); /*Importar Modulo externo Inventario*/
            if (!response.ok){
                throw new Error('No se pudo obtener el ingrediente');
            }


            let ingredienteInventario = await response.json()
            let cantidadIngredienteInventario = ingredienteInventario.cantidad

            if(ingredientesRequeridos[idIngredienteRequerido] > cantidadIngredienteInventario){
                // hacen falta ingredientes

                //actualizacmos el estatus de pedido a rechazado
                let cambios = {status: "rechazado"}
                // hay que importar PedidoModel que es un el modelo de pedido del modulo de ventas
                let nuevoPedido = await PedidoModel.update({id: pedido_id , input: cambios}) /* IMPORTAR MODULO EXTERO VENTAS*/
                return res.json(nuevoPedido)
            }

        })


        // Verificamos por cada comida, si se cuenta con la maquinaria disponible para realizarla en invetario
        Object.keys(comidas).forEach( async idComida => {
            let comida = await ComidaModel.getForId({idComida})
            let instrumentos = comida.instrumentos.split(",")
            instrumentos.forEach(async idInstrumentos => {
                // habria que importar esta funcion de inventario
                const response = await fetch(`http://localhost:3000/api/general/${idInstrumentos}`); /*Importar Modulo externo Inventario*/
                if (!response.ok){
                    throw new Error('No se pudo obtener el ingrediente');
                }
                

                let instrumentoInventario = await response.json()
                if (instrumentoInventario.funciona_estado == false){
                    // no se cuenta con la maquinaria necesaria

                    //actualizacmos el estatus de pedido a rechazado
                    let cambios = {status: "rechazado"}
                    let nuevoPedido = await PedidoModel.update({id: pedido_id , input: cambios})
                    return res.json(nuevoPedido) 
                }
            })
        })

        // si llega a este punto, entonces si se puede realizar el pedido
        //TODO: Descontamos los ingredientes de inventario
        Object.keys(ingredientesRequeridos).forEach(async idIngredienteRequerido => {

            // habria que importar esta funcion de inventario
            const response = await fetch(`http://localhost:3000/api/modulo-cocina/cocina-bar/${idIngredienteRequerido}`); /*Importar Modulo externo Inventario*/
            if (!response.ok){
                throw new Error('No se pudo obtener el ingrediente');
            }


            let ingredienteInventario = await response.json()
            let cantidadIngredienteInventario = ingredienteInventario.cantidad

            // restamos los ingredientes de inventario
            let nuevaCantidadInventario = cantidadIngredienteInventario - ingredientesRequeridos[idIngredienteRequerido]
            let cambios = {cantidad: nuevaCantidadInventario}
            
            // Opciones de la solicitud fetch
            const requestOptions = {
                method: 'PUT', // Método HTTP para actualizar (puede ser PUT o PATCH dependiendo de tu API)
                headers: {
                'Content-Type': 'application/json' // Tipo de contenido que estás enviando
                },
                body: JSON.stringify(cambios) // Convertir el objeto data a JSON
            };


            // habria que importar esta funcion de inventario
            await fetch(`http://localhost:3000/api/cocina-bar/${idIngredienteRequerido}` , requestOptions)
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json(); // Parsear la respuesta JSON si es necesario
              })
              .then(data => {
                console.log('Actualización exitosa:', data); // Manejar la respuesta de éxito
                // Puedes hacer lo que necesites con la respuesta de la actualización aquí
              })
              .catch(error => {
                console.error('Fetch error:', error);
                // Manejar el error de la solicitud
              });

        })        

        // cambiamos el estado a aceptado
        let cambios = {status: "aceptado"}
        let nuevoPedido = await PedidoModel.update({id: pedido_id , input: cambios})
        return res.json(nuevoPedido)
        
    }

    static async getOrder(req, res) {
        /* Guiandome de la función anterior, esta función en teoría solo retorna los datos del pedido
        tomados de la base de datos. El id recibido será tomado del frontend al clickear en uno de los pedidos
        procesados */

        const {pedido_id} = req.query // sacamos el id del pedido de la url

        // hay que importar PedidoModel que es un el modelo de pedido del modulo de ventas
        const pedido = await PedidoModel.getForId({pedido_id}) /* IMPORTAR MODULO EXTERO VENTAS*/

        return res.json(pedido)
    }

    static async orderListaStatus(req, res) {
        const {pedido_id} = req.query

        const pedido = await PedidoModel.update({pedido_id, input: "listo"})

        return res.json(pedido)
    }
}