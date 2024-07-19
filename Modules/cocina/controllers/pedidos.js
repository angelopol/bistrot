import { ComidaModel } from '../models/mysql/comida.js'
const PathUrl = 'http://localhost:1234/'

export class PedidoController {

    
    /* 
    Ventas manejo el status de los pedidos con enteros, aqui se muestra que significa cada numero
    Estatus:
    Pendiente = 1
    Rechazado = 2
    Aceptado = 3
    Listo = 4
    */


    //Funcion para buscar el pedido(De la tabla de factura de ventas) por id, y hacer verificar y modificar el status del pedido a aceptado (3) o rechazado (2)
    orderStatus = async (req , res) => {

        const {pedido_id} = req.query // sacamos el id del pedido de la url

        //Importamos el pedido con su id
        const response = await fetch(PathUrl+`ventas/factura/${pedido_id}`); /*IMPORTAR MODULO EXTERNO Ventas*/
            if (!response.ok){
                throw new Error('No se pudo obtener el ingrediente');
            }


        // Aqui obtenemos el pedido de ventas
        const pedido = await response.json()

        //sacamos las comidas del pedido
        /* pedido.consumo sera un string que representara una lista de objetos que seran las comidas pedidas ejemplo '[{"id":2,"quantity":3,"price":10},{"id":8,"quantity":2,"price":10}]' */

        const listaComidas = JSON.parse(pedido.consumo); // aqui tendremos el arreglo de las comidas

        

        // este diccionario guardara cada id de los ingredientes requiridos y la cantidad de esos ingredientes que se requieren para realizar la orden
        let ingredientesRequeridos = {};

        // iteramos los id de las comidas
        listaComidas.forEach( async objetoComida => {
            
            let multiplicador = parseInt(objetoComida.quantity) // multiplicador representa la cantidad de es comida/bebida que pidio 
            let comidaId = objetoComida.id // sacamos el id de las comidas
            let comida = await ComidaModel.getForId({comidaId}) // obtenemos el objeto de la comida/bebida por su id

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
            const response = await fetch(PathUrl+`inventario/api/cocina-bar/${idIngredienteRequerido}`); /*Importar Modulo externo Inventario*/
            if (!response.ok){
                throw new Error('No se pudo obtener el ingrediente');
            }


            let ingredienteInventario = await response.json()

            //sacamos la cantidad que se tiene de ese ingrediente
            let cantidadIngredienteInventario = ingredienteInventario.cantidad

            // comparamos la cantidad que se requiere del ingrediente para realizar el pedido con la cantidad del ingrediente que se tiene en invetario
            if(ingredientesRequeridos[idIngredienteRequerido] > cantidadIngredienteInventario){
                // hacen falta ingredientes

                // Solicitud GET para obtener los atributos del pedido 
                let pedidoData = {}

                const options = {
                    method: 'GET', 
                    headers: {
                    'Content-Type': 'application/json' 
                    }
                };

                await fetch(PathUrl+`ventas/factura/${pedido_id}` , options)
                .then(response => {
                    if (!response.ok){
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data =>{
                    pedidoData = data
                    pedidoData.status_pedido = 2 // estatus de rechazado
                    console.log('Se obtuvo el pedido:', pedidoData);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });

                //actualizacmos el pedido en base de datos
                const requestOptions = {
                    method: 'PATCH', 
                    headers: {
                    'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(pedidoData) 
                };

                // este es el endpoint de ventas para actualizar la factura 
                await fetch(PathUrl+`ventas/factura/${pedido_id}` , requestOptions) /*IMPORTAR MODULO EXTERNO Ventas*/
                .then( async response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return await response.json(); 
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
                const response1 = await fetch(PathUrl+`ventas/factura/${pedido_id})`); /*IMPORTAR MODULO EXTERNO Ventas*/
                if (!response1.ok){
                    throw new Error('No se pudo obtener el ingrediente');
                }


                let nuevoPedido = await response1.json()
                return res.json(nuevoPedido)   
            }

        })


        // Verificamos por cada comida, si se cuenta con la maquinaria disponible para realizarla en invetario
        listaComidas.forEach( async objetoComida => {

            // obtenemos el objeto comida/bebida
            let comidaId = objetoComida.id
            let comida = await ComidaModel.getForId({comidaId})

            // verificamos si el objeto comida/bebida requiere de algun instrumento para realizarse
            if(!(comida.instrumentos == null)){

                // comida.instrumento sera un string que tendra los id de los intrumentos que usa, separador por comas, ejemplo '2,5,4'
                let instrumentos = comida.instrumentos.split(",")
                instrumentos.forEach(async idInstrumentos => {

                    // con este endpoint de inventario obtenemos el instrumento
                    const response = await fetch(PathUrl+`inventario/api/general/${idInstrumentos}`); /*Importar Modulo externo Inventario*/
                    if (!response.ok){
                        throw new Error('No se pudo obtener el ingrediente');
                    }
                    
    
                    let instrumentoInventario = await response.json()
                    if (instrumentoInventario.funciona_estado == 0){
                        // no se cuenta con la maquinaria necesaria
    
                        // Solicitud GET para obtener los atributos del pedido 
                        let pedidoData = {}

                        const options = {
                            method: 'GET', 
                            headers: {
                            'Content-Type': 'application/json' 
                            }
                        };

                        await fetch(PathUrl+`ventas/factura/${pedido_id}` , options)
                        .then(response => {
                            if (!response.ok){
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data =>{
                            pedidoData = data
                            pedidoData.status_pedido = 2 // estatus de rechazado
                            console.log('Se obtuvo el pedido:', pedidoData);
                        })
                        .catch(error => {
                            console.error('Fetch error:', error);
                        });

                        //actualizacmos el pedido en base de datos
                        const requestOptions = {
                            method: 'PATCH', 
                            headers: {
                            'Content-Type': 'application/json' 
                            },
                            body: JSON.stringify(pedidoData) 
                        };

                        // este es el endpoint de ventas para actualizar la factura 
                        await fetch(PathUrl+`ventas/factura/${pedido_id}` , requestOptions) /*IMPORTAR MODULO EXTERNO Ventas*/
                        .then( async response => {
                            if (!response.ok) {
                            throw new Error('Network response was not ok');
                            }
                            return await response.json(); 
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
                        const response1 = await fetch(PathUrl+`ventas/factura/${pedido_id})`); /*IMPORTAR MODULO EXTERNO Ventas*/
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

            let ingredienteData = {}

            const response = await fetch(PathUrl+`inventario/api/cocina-bar/${idIngredienteRequerido}`); /*Importar Modulo externo Inventario*/
            if (!response.ok){
                throw new Error('No se pudo obtener el ingrediente');
            }

            let ingredienteInventario = await response.json()
            let cantidadIngredienteInventario = ingredienteInventario.cantidad

            // restamos los ingredientes de inventario
            let nuevaCantidadInventario = cantidadIngredienteInventario - ingredientesRequeridos[idIngredienteRequerido]
            ingredienteData = ingredienteInventario
            ingredienteData.cantidad = nuevaCantidadInventario
            
            // Opciones de la solicitud fetch
            const requestOptions = {
                method: 'PUT', 
                headers: {
                'Content-Type': 'application/json' 
                },
                body: JSON.stringify(ingredienteData) 
            };


            // con este endpoint actualizamos la cantidad del ingrediente en inventario
            await fetch(PathUrl+`inventario/api/cocina-bar/${idIngredienteRequerido}` , requestOptions)
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
        // Solicitud GET para obtener los atributos del pedido 
        let pedidoData = {}

        const options = {
            method: 'GET', 
            headers: {
            'Content-Type': 'application/json' 
            }
        };

        await fetch(PathUrl+`ventas/factura/${pedido_id}` , options)
        .then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data =>{
            pedidoData = data
            pedidoData.status_pedido = 3 // estatus de aceptado
            console.log('Se obtuvo el pedido:', pedidoData);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

        //actualizacmos el pedido en base de datos
        const requestOptions = {
            method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify(pedidoData) 
        };

        // este es el endpoint de ventas para actualizar la factura 
        await fetch(PathUrl+`ventas/factura/${pedido_id}` , requestOptions) /*IMPORTAR MODULO EXTERNO Ventas*/
        .then( async response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return await response.json(); 
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
        const response1 = await fetch(PathUrl+`ventas/factura/${pedido_id})`); /*IMPORTAR MODULO EXTERNO Ventas*/
        if (!response1.ok){
            throw new Error('No se pudo obtener el ingrediente');
        }


        let nuevoPedido = await response1.json()
        return res.json(nuevoPedido)
        
    }

    // funcion para solo obtener un pedido de ventas
    getOrder = async (req, res) => {
        /* Guiandome de la función anterior, esta función en teoría solo retorna los datos del pedido
        tomados de la base de datos. El id recibido será tomado del frontend al clickear en uno de los pedidos
        procesados */

        const {pedido_id} = req.query // sacamos el id del pedido de la url

       
       //Importamos el pedido con su id
       const response = await fetch(PathUrl+`ventas/factura/${pedido_id})`); /*IMPORTAR MODULO EXTERNO Ventas*/
       if (!response.ok){
           throw new Error('No se pudo obtener el ingrediente');
       }

        const data = await response.json();
        return res.json(data);
    }

    // funcion para cambiar el status de un pedido de ventas por su id a listo (4)
    orderListaStatus = async (req, res) => {
        const {pedido_id} = req.query

        // cambiamos el estado a listo

        // Solicitud GET para obtener los atributos del pedido 
        let pedidoData = {}

        const options = {
            method: 'GET', 
            headers: {
            'Content-Type': 'application/json' 
            }
        };

        await fetch(PathUrl+`ventas/factura/${pedido_id}` , options)
        .then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data =>{
            pedidoData = data
            pedidoData.status_pedido = 4 // estatus a listo
            console.log('Se obtuvo el pedido:', pedidoData);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

        //actualizacmos el pedido en base de datos
        const requestOptions = {
            method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify(pedidoData) 
        };

        // este es el endpoint de ventas para actualizar la factura 
        await fetch(PathUrl+`ventas/factura/${pedido_id}` , requestOptions) /*IMPORTAR MODULO EXTERNO Ventas*/
        .then( async response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return await response.json(); 
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
        const response1 = await fetch(PathUrl+`ventas/factura/${pedido_id})`); /*IMPORTAR MODULO EXTERNO Ventas*/
        if (!response1.ok){
            throw new Error('No se pudo obtener el ingrediente');
        }


        let nuevoPedido = await response1.json()
        return res.json(nuevoPedido)
    }
}