
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
                    ingredientesRequeridos[idIngrediente] += parseInt(ingredientes[idIngrediente]) * multiplicador
                } else {
                    ingredientesRequeridos[idIngrediente] = parseInt(ingredientes[idIngrediente]) * multiplicador
                }
            })
        })


        // verificamos la cantidad de ingredientes que se requieren con la cantidad de ingrediente en invetario 
        Object.keys(ingredientesRequeridos).forEach(async idIngredienteRequerido => {

            // habria que importar esta funcion de inventario
            let ingredienteInventario = await cocinaBarRoutes.getForId({idIngredienteRequerido}) /*IMPORTAR MODULO EXTERNO INVENTARIO */
            let cantidadIngredienteInventario = ingredienteInventario.cantidad

            if(ingredientesRequeridos[idIngredienteRequerido] > cantidadIngredienteInventario){
                // hacen falta ingredientes

                //actualizacmos el estatus de pedido a rechazado
                let cambios = {status: "rechazado"}
                let nuevoPedido = await PedidoModel.update({id: pedido_id , input: cambios})
                return res.json(nuevoPedido)
            }

        })


        // Verificamos por cada comida, si se cuenta con la maquinaria disponible para realizarla en invetario
        Object.keys(comidas).forEach( async idComida => {
            let comida = await ComidaModel.getForId({idComida})
            let instrumentos = comida.instrumentos.split(",")
            instrumentos.forEach(async idInstrumentos => {
                // habria que importar esta funcion de inventario
                let instrumentoInventario = await generalRoutes.getForId({idInstrumentos}) /*IMPORTAR MODULO EXTERNO INVENTARIO */
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
            let ingredienteInventario = await cocinaBarRoutes.getForId({idIngredienteRequerido}) /*IMPORTAR MODULO EXTERNO INVENTARIO */
            let cantidadIngredienteInventario = ingredienteInventario.cantidad

            // restamos los ingredientes de inventario
            let nuevaCantidadInventario = cantidadIngredienteInventario - ingredientesRequeridos[idIngredienteRequerido]
            let cambios = {cantidad: nuevaCantidadInventario}
            
            // habria que importar esta funcion de inventario
            await cocinaBarRoutes.update({id: idIngredienteRequerido , input: cambios})

        })        

        // cambiamos el estado a aceptado
        let cambios = {status: "aceptado"}
        let nuevoPedido = await PedidoModel.update({id: pedido_id , input: cambios})
        return res.json(nuevoPedido)
        
    }
}