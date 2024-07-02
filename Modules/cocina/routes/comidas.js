import {Router} from "express"
import { ComidaController } from "../controllers/comidas.js"


export const comidasRouter = Router()

comidasRouter.get("/" , ComidaController.getAll) 

comidasRouter.get("/:id" , ComidaController.getForId)

comidasRouter.post("/", ComidaController.create)

comidasRouter.delete("/:id" , ComidaController.delete)
comidasRouter.patch("/:id" , ComidaController.update)
