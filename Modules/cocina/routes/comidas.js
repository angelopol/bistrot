import {Router} from "express"
import { ComidaController } from "../controllers/comidas.js"
import { pedidoController } from "../controllers/pedidos.js"


export const comidasRouter = Router()

comidasRouter.get("/" , ComidaController.getAll) 

comidasRouter.get("/:id" , ComidaController.getForId)

comidasRouter.post("/", ComidaController.create)

comidasRouter.delete("/:id" , ComidaController.delete)

comidasRouter.patch("/:id" , ComidaController.update)

comidasRouter.get("/procesar-pedido:id", pedidoController.orderStatus)

comidasRouter.get("/mostrar-pedido:id", pedidoController.getOrder)
