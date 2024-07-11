import { Router } from 'express'
import { HistorialController, ProductoController, ProveedorController, SolicitudController } from '../../Register/controllers/controlador.js'

export const createComprasRouter = ({productoModel,historialModel,proveedoresModel,solicitudModel}) => {
  const ComprasRouter = Router()
  const historialController = new HistorialController({historialModel})
  const productoController = new ProductoController({productoModel,solicitudModel})
  const proveedorController = new ProveedorController({proveedoresModel})
  const solicitudController = new SolicitudController({solicitudModel})

  ComprasRouter.post('/prod', productoController.create)
  ComprasRouter.delete('/prod/:nombre', productoController.delete)
  ComprasRouter.patch('/prod/:id',productoController.update)
  ComprasRouter.get('/prod',productoController.getAll1)

  ComprasRouter.post('/historial', historialController.create)
  ComprasRouter.get('/',historialController.getAll) 

  ComprasRouter.post('/proveedores', proveedorController.create)
  ComprasRouter.patch('/proveedores/:id', proveedorController.update)
  ComprasRouter.delete('/proveedores/:id', proveedorController.delete)
  ComprasRouter.get('/proveedores/:id', proveedorController.getById)
  ComprasRouter.get('/prov',proveedorController.getAll)

  ComprasRouter.post('/soli', solicitudController.create)
  ComprasRouter.delete('/solicitud/:id',solicitudController.delete)
  ComprasRouter.patch('/soli/:id', solicitudController.update)
  ComprasRouter.get('/solicitud/:id',solicitudController.getById)

  ComprasRouter.get('/soli',productoController.getAllData)
  //ComprasRouter.post('/soli',productoController.create)


  return ComprasRouter
}