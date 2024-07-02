import { Router } from "express";
import { InstrumentoController } from "../controllers/instrumentos.js";


export const instrumentosRouter = Router()

instrumentosRouter.get('/', InstrumentoController.getAll)

instrumentosRouter.get('/:id', InstrumentoController.getById)

instrumentosRouter.post('/', InstrumentoController.create)

instrumentosRouter.delete('/', InstrumentoController.delete)

instrumentosRouter.patch('/', InstrumentoController.update)