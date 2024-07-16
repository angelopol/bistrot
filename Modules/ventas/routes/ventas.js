import { Router } from 'express'
import { ControllerCaja } from '../controllers/caja.js'
import { ControllerCliente } from '../controllers/cliente.js'
import { ControllerSalon } from '../controllers/salon.js'
import { ControllerFactura } from '../controllers/factura.js'
import { RenderController } from '../controllers/render.js'


export const createVentasRouter = () => {
  const VentasRouter = Router()
  const controllerCaja = new ControllerCaja()
  const controllerCliente = new ControllerCliente()
  const controllerSalon = new ControllerSalon()
  const controllerFactura = new ControllerFactura()
  const renderController = new RenderController()

  // Rutas de Caja
  VentasRouter.get('/caja', controllerCaja.getAll_c);
  VentasRouter.get('/caja/:id', controllerCaja.getById_c);
  VentasRouter.post('/caja', controllerCaja.create_c);
  VentasRouter.put('/:id', controllerCaja.update_c);
  VentasRouter.delete('/caja/:id', controllerCaja.delete_c);

  // Rutas de Salón
  VentasRouter.get('/salon', controllerSalon.getAll_s);
  VentasRouter.get('/salon/:id', controllerSalon.getById_s);
  VentasRouter.post('/salon', controllerSalon.create_s);
  VentasRouter.put('/salon/:id', controllerSalon.update_s);
  VentasRouter.delete('/salon/:id', controllerSalon.delete_s);

  // Rutas de Cliente
  VentasRouter.get('/cliente', controllerCliente.getAll_cl);
  VentasRouter.get('/cliente/:id', controllerCliente.getById_cl);
  VentasRouter.post('/cliente', controllerCliente.create_cl);
  VentasRouter.put('/cliente/:id', controllerCliente.update_cl);
  VentasRouter.delete('/cliente/:id', controllerCliente.delete_cl);

  // Rutas de Factura
  VentasRouter.get('/factura', controllerFactura.getAll_f);
  VentasRouter.get('/factura/:id', controllerFactura.getById_f);
  VentasRouter.post('/factura', controllerFactura.create_f);
  VentasRouter.put('/factura/:id', controllerFactura.update_f);
  VentasRouter.delete('/factura/:id', controllerFactura.delete_f);

  //Renderizado de Vistas
  //PAGINAS
  VentasRouter.get("/gerente", renderController.renderGerente)
  
  VentasRouter.get("/meseros_general", renderController.renderMeserosGeneral)

  VentasRouter.get("/meseros_terraza", renderController.renderMeserosTerraza)

  VentasRouter.get("/caja", renderController.renderCaja)

  VentasRouter.get("/pedidos", renderController.renderPedidos)

  //Estilos
  VentasRouter.get("/assets/styles_Gerente.css", renderController.stylesGerente)
  VentasRouter.get("/assets/Zona_General.css", renderController.stylesMeserosGeneral)
  VentasRouter.get("/assets/Terraza_styles.css", renderController.stylesMeserosTerraza)
  VentasRouter.get("/assets/Caja_Styles.css", renderController.stylesCaja)
  VentasRouter.get("/assets/pedidos_styles.css", renderController.stylesPedidos)


  
  
  

  return VentasRouter
}