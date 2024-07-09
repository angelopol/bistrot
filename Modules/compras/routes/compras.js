import { Router } from 'express'
import { HistorialController, ProductoController, ProveedorController, SolicitudController } from '../../Register/controllers/controlador.js'

export const createComprasRouter = ({productoModel,historialModel,proveedoresModel,solicitudModel}) => {
  const ComprasRouter = Router()
  const historialController = new HistorialController({historialModel})
  const productoController = new ProductoController({productoModel})
  const proveedorController = new ProveedorController({proveedoresModel})
  const solicitudController = new SolicitudController({solicitudModel})

  ComprasRouter.post('/producto', productoController.create)
  ComprasRouter.delete('producto/:id', productoController.delete)
  ComprasRouter.patch('producto/:id',productoController.update)
  ComprasRouter.get('/prod',productoController.getAll1)

  ComprasRouter.post('/historial', historialController.create)
  ComprasRouter.get('/',historialController.getAll)

  ComprasRouter.post('/proveedores', proveedorController.create)
  ComprasRouter.patch('/proveedores/:id', proveedorController.update)
  ComprasRouter.delete('/proveedores/:id', proveedorController.delete)
  ComprasRouter.get('/proveedores/:id', proveedorController.getById)
  ComprasRouter.get('/prov',proveedorController.getAll)

  ComprasRouter.post('/solicitud', solicitudController.create)
  ComprasRouter.delete('/solicitud/:id',solicitudController.delete)
  ComprasRouter.patch('/solicitud/:id', solicitudController.update)
  ComprasRouter.get('/solicitud/:id',solicitudController.getById)

  ComprasRouter.get('/soli',productoController.getAllData)


  return ComprasRouter
}