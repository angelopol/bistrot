import { ComidaModel } from '../models/mysql/comida.js'
export class pedidoController {

    
    /* 
    Ventas manejo el status de los pedidos con enteros, aqui se muestra que significa cada numero
    Estatus:
    Pendiente = 1
    Rechazado = 2
    Aceptado = 3
    Listo = 4
    */


    //Funcion para buscar el pedido(De la tabla de factura de ventas) por id, y hacer verificar y modificar el status del pedido a aceptado (3) o rechazado (2)
    static async orderStatus(req , res) {

        const {pedido_id} = req.query // sacamos el id del pedido de la url

        //Importamos el pedido con su id
        const response = await fetch(`http://localhost:3000/ventas/factura/${pedido_id}`); /*IMPORTAR MODULO EXTERNO Ventas*/
            if (!response.ok){
                throw new Error('No se pudo obtener el ingrediente');
            }


        // Aqui obtenemos el pedido de ventas
        const pedido = await response.json() 

        //sacamos las comidas del pedido
        /* pedido.consumo sera un string en formato json con los id de las comidas/bebidas pedidas y la cantidad que pidieron de esas comidas, por ejemplo '{"2":3,"1":4}' */
        const comidas = JSON.parse(pedido.consumo);

        // este diccionario guardara cada id de los ingredientes requiridos y la cantidad de esos ingredientes que se requieren para realizar la orden
        let ingredientesRequeridos = {};

        // iteramos los id de las comidas
        Object.keys(comidas).forEach( async idComida => {
            
            
            let multiplicador = parseInt(comidas[idComida]) // multiplicador representa la cantidad de es comida/bebida que pidio 
            let comida = await ComidaModel.getForId({idComida}) // obtenemos el objeto de la comida/bebida por su id

            /* comida.ingredientes de igual forma sera un string en formato json con los id de los ingredientes y la cantidadd de esos ingredientes para producir esa comida/bebida, por ejemplo '{"2":3,"1":4}' */
            let ingredientes = JSON.parse(comida.ingredientes) 

            // iteramos los id de los ingredientes
            Object.keys(ingredientes).forEach(async idIngrediente => {

                // si el ingrediente ya lo uso una comida pasada, sumamos la nueva cantidad
                if (idIngrediente in ingredientesRequeridos){
                    ingredientesRequeridos[idIngrediente] += parseFloat(ingredientes[idIngrediente]) * multiplicador
                // de no haberse usado el ingrediente, se agrega al diccionario
                } else {
                    ingredientesRequeridos[idIngrediente] = parseFloat(ingredientes[idIngrediente]) * multiplicador
                }
            })
        })


        // comparamos la cantidad de ingredientes que se requieren con la cantidad de ingredientes en inventario 
        Object.keys(ingredientesRequeridos).forEach(async idIngredienteRequerido => {

            // De inventario solicitamos el objeto ingrediente de su tabla cocina_bar
            const response = await fetch(`http://localhost:3000/api/cocina-bar/${idIngredienteRequerido}`); /*Importar Modulo externo Inventario*/
            if (!response.ok){
                throw new Error('No se pudo obtener el ingrediente');
            }


            let ingredienteInventario = await response.json()

            //sacamos la cantidad que se tiene de ese ingrediente
            let cantidadIngredienteInventario = ingredienteInventario.cantidad

            // comparamos la cantidad que se requiere del ingrediente para realizar el pedido con la cantidad del ingrediente que se tiene en invetario
            if(ingredientesRequeridos[idIngredienteRequerido] > cantidadIngredienteInventario){
                // hacen falta ingredientes

                //actualizacmos el estatus de pedido a rechazado
                let cambios = {status_pedido: 2}
                const requestOptions = {
                    method: 'PUT', 
                    headers: {
                    'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(cambios) 
                };

                // este es el endpoint de ventas para actualizar la factura 
                await fetch(`http://localhost:3000/ventas/factura/${pedido_id}` , requestOptions) /*IMPORTAR MODULO EXTERNO Ventas*/
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json(); 
                })
                .then(data => {
                    console.log('Actualización exitosa:', data); // Manejar la respuesta de éxito
                    // Puedes hacer lo que necesites con la respuesta de la actualización aquí
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    // Manejar el error de la solicitud
                });

                // con este enpoint obtenemos nuevamente el pedido con su estatus actualizado
                const response1 = await fetch(`http://localhost:3000/ventas/factura/${pedido_id})`); /*IMPORTAR MODULO EXTERNO Ventas*/
                if (!response1.ok){
                    throw new Error('No se pudo obtener el ingrediente');
                }


                let nuevoPedido = await response1.json()
                return res.json(nuevoPedido)   
            }

        })


        // Verificamos por cada comida, si se cuenta con la maquinaria disponible para realizarla en invetario
        Object.keys(comidas).forEach( async idComida => {

            // obtenemos el objeto comida/bebida
            let comida = await ComidaModel.getForId({idComida})

            // verificamos si el objeto comida/bebida requiere de algun instrumento para realizarse
            if(!(comida.instrumentos == null)){

                // comida.instrumento sera un string que tendra los id de los intrumentos que usa, separador por comas, ejemplo '2,5,4'
                let instrumentos = comida.instrumentos.split(",")
                instrumentos.forEach(async idInstrumentos => {

                    // con este endpoint de inventario obtenemos el instrumento
                    const response = await fetch(`http://localhost:3000/api/general/${idInstrumentos}`); /*Importar Modulo externo Inventario*/
                    if (!response.ok){
                        throw new Error('No se pudo obtener el ingrediente');
                    }
                    
    
                    let instrumentoInventario = await response.json()
                    if (instrumentoInventario.funciona_estado == 0){
                        // no se cuenta con la maquinaria necesaria
    
                        //actualizacmos el estatus de pedido a rechazado
                        let cambios = {status_pedido: 2}
                        const requestOptions = {
                            method: 'PUT', 
                            headers: {
                            'Content-Type': 'application/json' 
                            },
                            body: JSON.stringify(cambios) 
                        };

                        await fetch(`http://localhost:3000/ventas/factura/${pedido_id})` , requestOptions)
                        .then(response => {
                            if (!response.ok) {
                            throw new Error('Network response was not ok');
                            }
                            return response.json(); 
                        })
                        .then(data => {
                            console.log('Actualización exitosa:', data); // Manejar la respuesta de éxito
                           
                        })
                        .catch(error => {
                            console.error('Fetch error:', error);
                            
                        });
        
                        // obtenemos nuevamente el pedido con el endpoint de ventas
                        const response1 = await fetch(`http://localhost:3000/ventas/factura/${pedido_id})`); /*IMPORTAR MODULO EXTERNO Ventas*/
                        if (!response1.ok){
                            throw new Error('No se pudo obtener el ingrediente');
                        }

                        let nuevoPedido = await response1.json()
                        return res.json(nuevoPedido)    
                    }
                })
            }
        })

        // si llega a este punto, entonces si se puede realizar el pedido
        //TODO: Descontamos los ingredientes de inventario
        Object.keys(ingredientesRequeridos).forEach(async idIngredienteRequerido => {

            // con este endpoint obtenemos el ingrediente de inventario
            const response = await fetch(`http://localhost:3000/api/cocina-bar/${idIngredienteRequerido}`); /*Importar Modulo externo Inventario*/
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
                method: 'PUT', 
                headers: {
                'Content-Type': 'application/json' 
                },
                body: JSON.stringify(cambios) 
            };


            // con este endpoint actualizamos la cantidad del ingrediente en inventario
            await fetch(`http://localhost:3000/api/cocina-bar/${idIngredienteRequerido}` , requestOptions)
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json(); 
              })
              .then(data => {
                console.log('Actualización exitosa:', data); 
                
              })
              .catch(error => {
                console.error('Fetch error:', error);
                // Manejar el error de la solicitud
              });

        })        

        // cambiamos el estado a aceptado
        let cambios = {status_pedido: 3}
        const requestOptions = {
            method: 'PUT', 
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify(cambios) 
        };

        // con este endpoint cambiamos el status del pedido a aceptado
        await fetch(`http://localhost:3000/ventas/factura/${pedido_id})` , requestOptions)
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); 
          })
          .then(data => {
            console.log('Actualización exitosa:', data); // Manejar la respuesta de éxito
            
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
        
        // con este endpoint obtenemos nuevamente el pedido de ventas, para retornarlo
        const response1 = await fetch(`http://localhost:3000/ventas/factura/${pedido_id})`); /*IMPORTAR MODULO EXTERNO Ventas*/
          if (!response.ok){
              throw new Error('No se pudo obtener el pedido');
          }

        let nuevoPedido = await response1.json()
        return res.json(nuevoPedido)
        
    }

    // funcion para solo obtener un pedido de ventas
    static async getOrder(req, res) {
        /* Guiandome de la función anterior, esta función en teoría solo retorna los datos del pedido
        tomados de la base de datos. El id recibido será tomado del frontend al clickear en uno de los pedidos
        procesados */

        const {pedido_id} = req.query // sacamos el id del pedido de la url

       
       //Importamos el pedido con su id
       const response = await fetch(`http://localhost:3000/ventas/factura/${pedido_id})`); /*IMPORTAR MODULO EXTERNO Ventas*/
       if (!response.ok){
           throw new Error('No se pudo obtener el ingrediente');
       }

        return await res.json(response)
    }

    // funcion para cambiar el status de un pedido de ventas por su id a listo (4)
    static async orderListaStatus(req, res) {
        const {pedido_id} = req.query

        // cambiamos el estado a listo
        let cambios = {status_pedido: 4}
        const requestOptions = {
            method: 'PUT', 
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify(cambios) 
        };

        await fetch(`http://localhost:3000/ventas/factura/${pedido_id})` , requestOptions)
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); 
          })
          .then(data => {
            console.log('Actualización exitosa:', data);   
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
        
          // con este endpoint retornamos el pedido
        const response1 = await fetch(`http://localhost:3000/ventas/factura/${pedido_id})`); /*IMPORTAR MODULO EXTERNO Ventas*/
          if (!response1.ok){
              throw new Error('No se pudo obtener el ingrediente');
          }

        let nuevoPedido = await response1.json()
        return res.json(nuevoPedido)
    }
}