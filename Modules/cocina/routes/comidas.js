import {Router} from "express"
import { ComidaController } from "../controllers/comidas.js"
import { pedidoController } from "../controllers/pedidos.js"


export const comidasRouter = Router()

comidasRouter.get("/" , ComidaController.getAll) 

comidasRouter.get("/:id" , ComidaController.getForId)

comidasRouter.post("/", ComidaController.create)

comidasRouter.delete("/:id" , ComidaController.delete)

comidasRouter.patch("/:id" , ComidaController.update)


// este endpoint lo que hace es que le pasamos el id del pedido(factura de ventas) por la url, verifica si se puede realizar el pedido, retorna este pedido y con su atributo status_pedido se verifica si se acepto (3) o si se rechazo(2)
comidasRouter.get("/procesar-pedido", pedidoController.orderStatus)

// este endpoint lo que hace es retornar el objeto pedido (factura de ventas) por su id  que le pasamos por la url y retorna este pedido
comidasRouter.get("/mostrar-pedido", pedidoController.getOrder)

// este endpoint lo que hace es cambiar el status a listo, del pedido por id que se pasa por la url y retornar este pedido
comidasRouter.get("/pedido-listo", pedidoController.orderListaStatus)
