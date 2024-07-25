import { Router } from 'express';
//import { createMantenimientoApi } from './api.js';
import { 
  getMantenimientos,
  getMantenimientoID,
  postMantenimiento,
  getContactos,
  getContactosID,
  postContactos,
  deleteContactos,
  deleteMantenimiento,
  }
  from './controller.js'

export const createMantenimientoRouter = () => {
  const MantenimientoRouter = Router();

  // rutas de las api de mantenimiento

  MantenimientoRouter.get('/api/mantenimientos_realizar', getMantenimientos);
  MantenimientoRouter.get('/api/mantenimientos_realizar/:id', getMantenimientoID);
  MantenimientoRouter.post('/mantenimientos_realizar', postMantenimiento)
  MantenimientoRouter.delete('/mantenimientos_realizar/:id', deleteMantenimiento)
  MantenimientoRouter.get('/contactos', getContactos)
  MantenimientoRouter.get('/contactos/:id', getContactosID)
  MantenimientoRouter.post('/contactos', postContactos)
  MantenimientoRouter.delete('/contactos/:id', deleteContactos)

  // #region Rutas EJS

  MantenimientoRouter.get('/', (_req, res) => {
    res.render('mantenimientos/principal.ejs', { title: 'Acerca de', message: 'Esta es la página Acerca de.' });
  });
  MantenimientoRouter.get('/', (_req, res) => {
    res.render('mantenimientos/principal.ejs', { title: 'Acerca de', message: 'Esta es la página Acerca de.' });
  });
  MantenimientoRouter.get('/escribirReporte', (_req, res) => {
    res.render('mantenimientos/escribirReporte.ejs', { title: 'Acerca de', message: 'Esta es la página Acerca de.' });
  });
  MantenimientoRouter.get('/reportes', (_req, res) => {
    res.render('mantenimientos/reportes.ejs', { title: 'Acerca de', message: 'Esta es la página Acerca de.' });
  });
  MantenimientoRouter.get('/vistaReporte', (_req, res) => {
    res.render('mantenimientos/vistaReporte.ejs', { title: 'Acerca de', message: 'Esta es la página Acerca de.' });
  });
  MantenimientoRouter.get('/icon.jpeg', (_req, res) =>{
    res.sendFile(process.cwd() + 'resources/icon.jpeg');
});

  return MantenimientoRouter;
}