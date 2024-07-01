import { Router } from 'express'
import { ControllerVentasSalon } from '../controllers/ventas_salon'

export const createVentasRouter = () => {
  const VentasRouter = Router()
  const controllerVentasSalon = new ControllerVentasSalon()
  
  VentasRouter.use(errorMiddleware);
  // Rutas de Caja
  VentasRouter.get('/caja', controllerVentasSalon.getAll_c);
  VentasRouter.get('/caja/:id', controllerVentasSalon.getById_c);
  VentasRouter.post('/caja', controllerVentasSalon.create_c);
  VentasRouter.put('/:id', controllerVentasSalon.update_c);
  VentasRouter.delete('/caja/:id', controllerVentasSalon.delete_c);

  // Rutas de Salón
  VentasRouter.get('/salon', controllerVentasSalon.getAll_s);
  VentasRouter.get('/salon/:id', controllerVentasSalon.getById_s);
  VentasRouter.post('/salon', controllerVentasSalon.create_s);
  VentasRouter.put('/salon/:id', controllerVentasSalon.update_s);
  VentasRouter.delete('/salon/:id', controllerVentasSalon.delete_s);

  // Rutas de Cliente
  VentasRouter.get('/cliente', controllerVentasSalon.getAll_cl);
  VentasRouter.get('/cliente/:id', controllerVentasSalon.getById_cl);
  VentasRouter.post('/cliente', controllerVentasSalon.create_cl);
  VentasRouter.put('/cliente/:id', controllerVentasSalon.update_cl);
  VentasRouter.delete('/cliente/:id', controllerVentasSalon.delete_cl);

  // Rutas de Factura
  VentasRouter.get('/factura', controllerVentasSalon.getAll_f);
  VentasRouter.get('/factura/:id', controllerVentasSalon.getById_f);
  VentasRouter.post('/factura', controllerVentasSalon.create_f);
  VentasRouter.put('/factura/:id', controllerVentasSalon.update_f);
  VentasRouter.delete('/factura/:id', controllerVentasSalon.delete_f);

  return VentasRouter
}