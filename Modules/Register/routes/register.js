import { Router } from 'express';
import { RegisterController } from '../controllers/register.js';
import { EntradasController } from '../controllers/entradas.js';

export const createRegisterRouter = () => {
  const registerRouter = Router();
  const registerController = new RegisterController();
  const entradasController = new EntradasController();

  registerRouter.post('/', registerController.store);
  registerRouter.get('/', registerController.create);
  registerRouter.post('/entradas', entradasController.registrarEntrada);
  registerRouter.get('/entradas', entradasController.create);

  return registerRouter;
}
