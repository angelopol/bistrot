import { Router } from 'express'
import { HistorialController, ProductoController, ProveedorController, SolicitudController } from '../../Register/controllers/controlador.js'

export const createComprasRouter = ({productoModel,historialModel,proveedoresModel,solicitudModel}) => {
  const ComprasRouter = Router()
  const historialController = new HistorialController({historialModel,solicitudModel,proveedoresModel})
  const productoController = new ProductoController({productoModel,solicitudModel})
  const proveedorController = new ProveedorController({proveedoresModel,solicitudModel})
  const solicitudController = new SolicitudController({solicitudModel})

  ComprasRouter.post('/prod', productoController.create)
  ComprasRouter.delete('/prod/:nombre', productoController.delete)
  ComprasRouter.patch('/prod/:id',productoController.update)
  ComprasRouter.get('/prod',productoController.getAll1)

  
  ComprasRouter.get('/',historialController.getAll)  

  ComprasRouter.post('/prov', proveedorController.create)
  ComprasRouter.patch('/prov/:id', proveedorController.update)
  ComprasRouter.delete('/prov/:nombre', proveedorController.delete)
  //ComprasRouter.get('/prov/:id', proveedorController.getById)
  ComprasRouter.get('/prov/:name', proveedorController.getByName)
  ComprasRouter.get('/prov',proveedorController.getAll)

  ComprasRouter.post('/soli', solicitudController.create)
  ComprasRouter.delete('/solicitud/:id',solicitudController.delete)
  ComprasRouter.patch('/soli/:id', solicitudController.update)
  ComprasRouter.get('/solicitud/:id',solicitudController.getById) 

  ComprasRouter.get('/soli',productoController.getAllData)
  //ComprasRouter.post('/soli',productoController.create)
 
  //Ruta para presentar los datos de las solicitudes en la tabla en el apartado de realizar compra
  ComprasRouter.get('/compra',historialController.getAllData2)
  ComprasRouter.post('/compra', historialController.create)

  ComprasRouter.patch('/compra/confirmacion/:id', solicitudController.updateCompra)
  ComprasRouter.delete('/compra/confirmacion', historialController.delete)

  return ComprasRouter
}