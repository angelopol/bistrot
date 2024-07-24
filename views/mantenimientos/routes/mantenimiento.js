import { Router } from 'express';
import { createMantenimientoApi } from './api.js';

export const createMantenimientoRouter = () => {
  const MantenimientoRouter = Router();
  const c = createMantenimientoApi(MantenimientoRouter);

  // rutas de las api de mantenimiento

  MantenimientoRouter.get('/mantenimientos_realizar', c)

  MantenimientoRouter.get('/mantenimientos_realizar/:id', c)

  MantenimientoRouter.post('/mantenimientos_realizar', c)
 
  MantenimientoRouter.delete('/mantenimientos_realizar/:id', c)

  MantenimientoRouter.get('/contactos', c)

  MantenimientoRouter.get('/contactos/:id', c)

  MantenimientoRouter.post('/contactos', c)

  MantenimientoRouter.delete('/contactos/:id', c)

  /*Rutas de los documentos HTML/EJS*/ 

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
    res.render('mantenimientos/vistaReporte', { title: 'Acerca de', message: 'Esta es la página Acerca de.' });
  });
  MantenimientoRouter.get('/icon.jpeg', (_req, res) =>{
    res.sendFile(process.cwd() + 'resources/icon.jpeg');
});

  return MantenimientoRouter;
}