import { Router } from 'express'
import { createCocinaBarRouter } from './cocina_bar.js'
import { createGeneralRouter } from './general.js'
import { createModuloCocinaRouter } from './modulo_cocina.js'
import { createModuloComprasRouter } from './modulo_compras.js'
import { createModuloMantenimientoRouter } from './modulo_mantenimiento.js'
import { createRegistrosRouter } from './registros.js'
import { createSubmoduloRouter } from './submoduloinventario.js'
import { createVerificarRouter } from './verificar-inventario.js'
import { createLoginRouter } from './login.js'
import { InventarioController } from '../controllers/inventario.js'

export const createInventarioRouter = () => {
  var InventarioRouter = Router()
  const inventarioController = new InventarioController()
 
  InventarioRouter = createLoginRouter(InventarioRouter)
  InventarioRouter = createCocinaBarRouter(InventarioRouter)
  InventarioRouter = createGeneralRouter(InventarioRouter)
  InventarioRouter = createModuloCocinaRouter(InventarioRouter)
  InventarioRouter = createModuloComprasRouter(InventarioRouter)
  InventarioRouter = createModuloMantenimientoRouter(InventarioRouter)
  InventarioRouter = createRegistrosRouter(InventarioRouter)
  InventarioRouter = createSubmoduloRouter(InventarioRouter)
  InventarioRouter = createVerificarRouter(InventarioRouter)
  
  InventarioRouter.get('/', inventarioController.index)

  return InventarioRouter
}