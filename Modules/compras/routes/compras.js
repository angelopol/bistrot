import { Router } from 'express'
import { HistorialController, ProductoController, ProveedorController, SolicitudController } from '../controllers/controlador.js'

export const createComprasRouter = () => {
  const ComprasRouter = Router()
  const historialController = new HistorialController()
  const productoController = new ProductoController()
  const proveedorController = new ProveedorController()
  const solicitudController = new SolicitudController()
    /*
  //ComprasRouter.get('/index',(req,res)=>{
      //res.sendFile(path.join (__dirname,'routes','html','index.html'))
      //res.render('Compras/index',{data: null})
  //});

  //Vista para las solicitudes en el modulo de compras
  ComprasRouter.get('/soli',(req,res)=>{
      //res.sendFile(path.join (__dirname,'routes','html','index.html'))
      res.render('Compras/solicitud',{data: null, data1: null, data2: null})
  });

  //Vista para los proveedores en el modulo de compras
  ComprasRouter.get('/prov',(req,res)=>{
      //res.sendFile(path.join (__dirname,'routes','html','index.html'))
      res.render('Compras/prov',{data: null, data1: null, data2: null})
  });

  ComprasRouter.get('/compra',(req,res)=>{
      //res.sendFile(path.join (__dirname,'routes','html','index.html'))
      res.render('Compras/compra',{data2: null, data3: null})
  });

  ComprasRouter.get('/compras-prod',(req,res)=>{
      //res.sendFile(path.join (__dirname,'routes','html','index.html'))
      res.render('Compras/productos',{data: null, data1: null, data2: null})
  });

  ComprasRouter.get('/compra/confirmacion',(req,res)=>{
      //res.sendFile(path.join (__dirname,'routes','html','index.html'))
      res.render('Compras/confirmacion')
  });
    */
  ComprasRouter.post('/compras-prod', productoController.create)
  ComprasRouter.delete('/compras-prod/:nombre', productoController.delete)
  ComprasRouter.patch('/compras-prod/:id',productoController.update)
  ComprasRouter.get('/compras-prod',productoController.getAll1)

  
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


  //RUTA QUE NECESITA INVENTARIO
  //ComprasRouter.get('/ruta',historialController.getById)

  return ComprasRouter
}