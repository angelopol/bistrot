import mysql from "mysql2/promise"

const config = {
    host: "localhost",
    user: "root",
    port: 3306,
    password: "root",
    database: "data_comida",
}

const connection = await mysql.createConnection(config)


 export class ComidaModel{

    //esta funcion filtra las comidas de la base de datos por el tipo_comida o tipo_bebida si los tiene, sino devuelve todas las comidas
    static async getAll ({tipo_comida , tipo_bebida}) {
        if(!tipo_bebida && !tipo_comida) {
            const [comidas] = await connection.query("SELECT * FROM comida")
            return comidas
        }
        let query = "SELECT * FROM comida WHERE ";
        const params = [];

        if (tipo_comida) {
            query += `tipo_comida = ?`;
            params.push(tipo_comida.toLowerCase())
        }

        if (tipo_bebida) {
            query += `tipo_bebida = ?`;
            params.push(tipo_bebida.toLowerCase())
        }

        const [comidas] = await connection.query(query , params);
        return comidas;
    }

    static async getForId({id}) {
        const [comidas] = await connection.query(
            "SELECT * FROM comida WHERE id = ?;" , [id]
        )
        return comidas
    }

    static async create({input}) {
        const {
            nombre,
            tipo_comida,
            tipo_bebida,
            instrumentos,
            ingredientes
        } = input
        try {
            await connection.query(
                "INSERT INTO comida (nombre , tipo_comida, tipo_bebida , instrumentos , ingredientes) VALUES (?,?,?,?,?);", [nombre , tipo_comida, tipo_bebida , instrumentos , ingredientes]
            )
            const [comida] = await connection.query("SELECT * FROM comida WHERE id = LAST_INSERT_ID()");
            return comida
        } catch (error) {
            throw new Error("Error creando una comida")
        }
        
    }

    static async delete({id}) {
        try {
            // Consulta SQL para eliminar la comida por ID
            const query = "DELETE FROM comida WHERE id = ?";
            const [result] = await connection.query(query, [id]);

            if (result.affectedRows > 0) {
                return { message: `Comida con id ${id} eliminada correctamente.` };
            } else {
                throw new Error(`No se encontró ninguna comida con id ${id}.`);
            }
        } catch (error) {
            console.error('Error al eliminar la comida:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

    static async update({id , input}) {
        const {
            nombre,
            tipo_comida,
            tipo_bebida,
            instrumentos,
            ingredientes
        } = input;

        try {
            // Construir la parte de la consulta SQL para actualizar
            let updates = [];
            let values = [];

            if (nombre) {
                updates.push("nombre = ?");
                values.push(nombre);
            }
            if (tipo_comida !== undefined && tipo_comida !== null) {
                updates.push("tipo_comida = ?");
                values.push(tipo_comida);
            }
            if (tipo_bebida !== undefined && tipo_bebida !== null) {
                updates.push("tipo_bebida = ?");
                values.push(tipo_bebida);
            }
            if (instrumentos) {
                updates.push("instrumentos = ?");
                values.push(instrumentos);
            }
            if (ingredientes) {
                updates.push("ingredientes = ?");
                values.push(ingredientes);
            }

            // Comprobar si hay campos para actualizar
            if (updates.length == 0) {
                throw new Error("No se proporcionaron datos para actualizar.");
            }

            // Agregar el ID como último valor en el array de values
            values.push(id);

            // Consulta SQL para actualizar
            const query = `UPDATE comida SET ${updates.join(', ')} WHERE id = ?`;
            const [result] = await connection.query(query, values);
            
            
            if (result.affectedRows > 0) {
                // Consulta para obtener la comida actualizada
                const selectQuery = "SELECT * FROM comida WHERE id = ?";
                const [updatedComida] = await connection.query(selectQuery, [id]);
                if (updatedComida.length === 0) {
                    throw new Error(`No se encontró comida con id ${id} después de la actualización.`);
                }
                return updatedComida[0];
            } else {
                return false
            }
        } catch (error) {
            console.error('Error al actualizar la comida:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

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