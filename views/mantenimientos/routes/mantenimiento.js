import { Router } from 'express';
import { createMantenimientoApi } from './api.js';

export const createMantenimientoRouter = () => {
  var MantenimientoRouter = Router();
  MantenimientoRouter = createMantenimientoApi(MantenimientoRouter);
   
  /*Rutas de los documentos HTML/EJS*/ 


  
  MantenimientoRouter.get('/', (req, res) =>{
    res.render('Pagina_principal');
  });

  MantenimientoRouter.get('/Pagina_contacto.ejs', (req, res) =>{
    res.render('Pagina_contacto', contacto);
  });

  MantenimientoRouter.get('/Pagina_reportes.ejs', (req, res) =>{
    res.render('Pagina_reportes');
  });


  /*Rutas de los documentos de estilo*/


  MantenimientoRouter.get('/styles/styles.css', (req, res) =>{
    res.sendFile(process.cwd() + 'mantenimientos/styles/styles.css');
  });

  MantenimientoRouter.get('/styles/styles2.css', (req, res) =>{
    res.sendFile(process.cwd() + 'mantenimientos/styles/styles2.css');
  });

  MantenimientoRouter.get('/styles/side.css', (req, res) =>{
    res.sendFile(process.cwd() + 'mantenimientos/styles/side.css');
  });

  /* Ruta de iconos */
  
  /* Ruta de icono de la pestaña */
  MantenimientoRouter.get('/icon.jpeg', (req, res) =>{
    res.sendFile(process.cwd() + 'resources/icon.jpeg');
});

  return MantenimientoRouter;
}