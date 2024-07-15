import { Router } from 'express';
import { createMantenimientoApi } from './api.js';

export const createMantenimientoRouter = () => {
  var MantenimientoRouter = Router();
  MantenimientoRouter = createMantenimientoApi(MantenimientoRouter);

  /*Rutas de los documentos HTML/EJS*/ 

  MantenimientoRouter.get('/', (req, res) =>{
    res.render('mantenimientos/Pagina_principal');
  });

  MantenimientoRouter.get('/agregar', (req, res) =>{
    res.render('mantenimientos/Pagina_agregarMantenimiento');
  });

  MantenimientoRouter.get('/Pagina_contacto.html', (req, res) =>{
    res.render('mantenimientos/Pagina_contacto');
  });

  MantenimientoRouter.get('/Pagina_reportes.html', (req, res) =>{
    res.render('mantenimientos/Pagina_reportes');
  });



  /*Rutas de los documentos de estilo*/

  MantenimientoRouter.get('/styles.css', (req, res) =>{
    res.sendFile(process.cwd() + '/views/mantenimientos/styles/styles.css');
  });

  MantenimientoRouter.get('/styles2.css', (req, res) =>{
    res.sendFile(process.cwd() + '/views/mantenimientos/styles/styles2.css');
  });




  return MantenimientoRouter;
}