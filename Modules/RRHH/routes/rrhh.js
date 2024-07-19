import { Router } from 'express';
import { RecursosHumanos } from '../controllers/recursoHumano.js';

export const createRRHHRouter = () => {
  const RRHHRouter = Router();
  const controlador = new RecursosHumanos();

  RRHHRouter.get('/usuario', controlador.GetUsuario);

  // Para los HTML
  RRHHRouter.get('/', controlador.create);
  RRHHRouter.get('/horarios', controlador.horarios);
  RRHHRouter.get('/form', controlador.form);
  RRHHRouter.get('/entradas', controlador.entradas);
  RRHHRouter.get('/ausensias', controlador.ausensias);
  RRHHRouter.get('/informe', controlador.informe);
  // Para los estilos
  RRHHRouter.get('/assets/style.css', controlador.GetStyle);
  RRHHRouter.get('/assets/horarios.css', controlador.getStyle);
  RRHHRouter.get('/assets/header.css', controlador.GetStyles);
  RRHHRouter.get('/assets/form.css', controlador.getStyles);
  RRHHRouter.get('/assets/entradas.css', controlador.getStyless);
  RRHHRouter.get('/assets/ausensias.css', controlador.GetStyless);

  // Para los JS
  RRHHRouter.get('/assets/formulario', controlador.formulario);

  // Para la consulta de empleados
  // Esta funcion trae todos los datos de la base de datos
  RRHHRouter.get('/empleados', controlador.empleados);
  
  RRHHRouter.get('/entrada', controlador.entrada);

  return RRHHRouter;
};
