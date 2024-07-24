import { Router } from 'express';
import { RegisterController } from '../controllers/register.js';
import { EntradasController } from '../controllers/entradas.js';

export const createRegisterRouter = () => {
  const registerRouter = Router();
  const registerController = new RegisterController();
  const entradasController = new EntradasController();

  //Entradas
  registerRouter.post('/entradas', entradasController.registrarEntrada);
  registerRouter.get('/entradas', entradasController.create);
  //Registro
  registerRouter.post('/', registerController.store);
  registerRouter.delete('/eliminar', registerController.delete);
  registerRouter.put('/modificar', registerController.update);
  //Solicitudes
  registerRouter.get('/solicitudes', registerController.solicitudes);
  registerRouter.post('/solicitar', registerController.solicitar);
  registerRouter.put('/solicitudes/estado', registerController.updateEstado);



  return registerRouter;
}