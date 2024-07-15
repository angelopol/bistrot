import { Router } from 'express';
import { createMantenimientoApi } from './api.js';

export const createMantenimientoRouter = () => {
  var MantenimientoRouter = Router();
  MantenimientoRouter = createMantenimientoApi(MantenimientoRouter);

  MantenimientoRouter.get('/', (req, res) =>{
    res.render('mantenimientos/Pagina_principal');
  });

  MantenimientoRouter.get('/styles.css', (req, res) =>{
    res.sendFile(process.cwd() + '/views/mantenimientos/styles/styles.css');
  });

  MantenimientoRouter.get('/agregar', (req, res) =>{
    res.render('mantenimientos/Pagina_agregarMantenimiento');
  });

  return MantenimientoRouter;
}