//import { HistorialModel } from "../models/modeloCompra/historial.js";
//import { ProductoModel } from "../models/modeloCompra/Productos.js";
import {validarHistorial} from "../schemas/ValidacionHistorial.js"

export class HistorialController {
    constructor ({historialModel,solicitudModel,proveedoresModel}){
        this.historialModel = historialModel
        this.solicitudModel = solicitudModel
        this.proveedoresModel = proveedoresModel
    }

    getAllData2 = async (req,res)=>{
        const requisicion = await this.solicitudModel.getReq()
        const proveedores = await this.proveedoresModel.listar()

        res.render('compra',{data2: requisicion,data3: proveedores})
    }

    create = async (req,res)=>{
        //const result = validarHistorial(req.body)

        //const input = result.data
        console.log(req.body)
        await this.historialModel.agregar({input: req.body})
        res.redirect('/')
    }

    getAll = async (req,res)=>{
        const ordenes = await this.historialModel.listar()
        res.render('index',{data: ordenes});
    }
}

export class ProductoController{
    constructor ({productoModel,solicitudModel}){
        this.productoModel = productoModel
        this.solicitudModel = solicitudModel
    }
    //Hice un getAll1 para mostrar los datos en dos paginas distintan ya que si lo hacia en el mismo metodo estaba
    //renderizando dos paginas en un controlador y fallaba 
    getAll1 = async (req,res)=>{
        const productos = await this.productoModel.listar()
        res.render('productos',{data: productos})
    }

    //metodo en el que llamo a varios modelos para mostrar en la pagina de solicitudes
    getAllData = async (req,res)=>{
        const productos = await this.productoModel.listar()
        const nombres = await this.productoModel.getNombre()
        //const ids = await this.solicitudModel.getId()
        const requisicion = await this.solicitudModel.getReq()
        
        
        res.render('solicitud',{data: productos,data1: nombres,data2: requisicion})
    }

    /*getAll2 = async (req,res)=>{
        const productos = await this.productoModel.listar()
        res.render('solicitud',{data: productos,data1: null})
    }

    getName = async(req,res)=>{
        const nombres = await this.productoModel.getNombre()
        res.render('solicitud',{data: null,data1: nombres})
    }
    */

    create = async (req,res)=>{
        //me falta agregar las validaciones
        const {result} = req.body

        console.log(req.body)

        

        await this.productoModel.crear({input: req.body})
        res.redirect('/prod')

    }
    update = async (req,res)=>{
        //me falta agregar las validaciones
        const result = req.body

        const {id} = req.params
        console.log(result)
        console.log(id)
        await this.productoModel.modificar({id,result}) 
        res.redirect('/prod')
        

    }

    //Metodo para borrar un producto
    delete = async (req,res)=>{
        //Lo deje aqui  
        const {nombre} = req.params
        await this.productoModel.eliminar({nombre})

        res.redirect('/prod')
    }

}

export class ProveedorController{
    constructor ({proveedoresModel,solicitudModel}){
        this.proveedoresModel = proveedoresModel
        this.solicitudModel = solicitudModel
    }
    create = async (req,res)=>{
        //me falta agregar las validaciones
        const {result} = req.body

        console.log(req.body)

        

        await this.proveedoresModel.crear({input: req.body})
        res.redirect('/prov')

    }
    update = async (req,res)=>{
        //me falta agregar las validaciones
        const result = req.body

        const {id} = req.params

        await this.proveedoresModel.modificar({id,result})

        res.redirect('/prov')

    }
    delete = async (req,res)=>{
        //Lo deje aqui  
        const {nombre} = req.params
        console.log(nombre)
        await this.proveedoresModel.eliminar({nombre})

        res.redirect('/prov')
    }

    getByName = async (req,res)=>{
        console.log(req.params)
        const proveedor = await this.proveedoresModel.filtrar({nombre: req.params})

        const requisicion = await this.solicitudModel.getReq()
        res.render('compra',{data2:requisicion,data3:proveedor})
    }

    getById = async (req,res)=>{
        const {id} =req.params

        const proveedor = await this.proveedoresModel.buscar({ id })
        if (proveedor) return res.json(proveedor)
        res.status(404).json({ message: 'Proveedor not found' })
    }
    

    getAll = async (req,res)=>{
        const proveedores = await this.proveedoresModel.listar()
        
        
        res.render('prov',{data: proveedores});
         
    }

}

export class SolicitudController{
    constructor ({solicitudModel}){
        this.solicitudModel = solicitudModel
    }

    

    create = async (req,res)=>{
        //me falta agregar las validaciones
        const {result} = req.body
        /*const newSolicitud =*/
        await this.solicitudModel.agregar({input: req.body})
        //return res.json(newSolicitud)
        res.redirect('/soli');

    }
    update = async (req,res)=>{
        //me falta agregar las validaciones
        
        
        //console.log(req.params)
        await this.solicitudModel.modificar({input: req.body})
        res.redirect('/soli');
        

    }
    delete = async (req,res)=>{
        //Lo deje aqui  
        const {id} = req.params
        console.log(id)
        const mensaje = await this.solicitudModel.eliminar({id})

        return res.json(mensaje)
    }

    getById = async (req,res)=>{
        const {id} =req.params

        const solicitud = await this.solicitudModel.buscar({ id })
        if (solicitud) return res.json(solicitud)
        res.status(404).json({ message: 'Solicitud not found' })
    }

}