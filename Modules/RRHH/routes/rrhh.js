import { Router } from 'express'
// const path = require('path');
import { RecursosHumanos } from '../controllers/recursoHumano.js';


export const createRRHHRouter = () => {
  const RRHHRouter = Router()
  const controlador = new RecursosHumanos();

  
  //Para los html

  RRHHRouter.get('/recursos-humanos', controlador.create)

  RRHHRouter.get('/horarios', controlador.horarios)

  RRHHRouter.get('/form', controlador.form)

  RRHHRouter.get('/entradas', controlador.entradas)

  RRHHRouter.get('/ausensias', controlador.ausensias)



  // Para los estilos

  RRHHRouter.get('/assets/style.css', controlador.GetStyle)

  RRHHRouter.get('/assets/horarios.css', controlador.getStyle)

  RRHHRouter.get('/assets/header.css', controlador.GetStyles)
  
  RRHHRouter.get('/assets/form.css', controlador.getStyles)
  
  RRHHRouter.get('/assets/entradas.css', controlador.getStyless)

  RRHHRouter.get('/assets/ausensias.css', controlador.GetStyless)

  
  return RRHHRouter
}