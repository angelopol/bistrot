//import { HistorialModel } from "../models/modeloCompra/historial.js";
//import { ProductoModel } from "../models/modeloCompra/Productos.js";
import {validarHistorial} from "../schemas/ValidacionHistorial.js"
import { ValidarProducto,validarProductoM } from "../schemas/ValidacionProducto.js"
import { ValidarProv,ValidarProvM } from "../schemas/ValidacionProv.js"
import { ValidarSolicitudes,ValidarSolicitudesM } from "../schemas/ValidacionSolicitud.js"

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
        const{
            id,
            nombreP,
            proveedor
        } = req.body
        const result = validarHistorial(req.body)
        //Obtener producto que vende el proveedor para validar que si vende el producto solicitado
        const productoProveedor = await this.proveedoresModel.getProducto({proveedor})
        //const {Productos_Proveedor} = productoProveedor
        //console.log(Productos_Proveedor)
        
        if((!result.success)&&(productoProveedor[0].Productos_Proveedor.toLowerCase() != nombreP.toLowerCase())){
            
            res.redirect('/compra')
        }else{
            const orden = await this.historialModel.agregar({input: req.body})
            res.render('confirmacion',{dato: id,dato2: orden})
        }
        
        
    }

    getAll = async (req,res)=>{
        const ordenes = await this.historialModel.listar()
        res.render('index',{data: ordenes});
    }

    delete = async (req,res)=>{
        await this.historialModel.eliminar()
        
        res.redirect('/compra')
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
        const result = ValidarProducto(req.body)
        console.log(result)
        if (!result.success) {
            res.redirect('/prod')
        } else {
            await this.productoModel.crear({input: req.body})
            res.redirect('/prod')
        }
        

    }
    update = async (req,res)=>{
        //me falta agregar las validaciones
        const result = validarProductoM(req.body)
        const {id} = req.params
        console.log(result)
        console.log(id)
        if(!result.success){
            res.redirect('/prod')
        }else{
            await this.productoModel.modificar({id,result}) 
            res.redirect('/prod')
        }
        

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
        const result = ValidarProv(req.body)
        console.log(req.body)
        if(!result.success){
            res.redirect('/prov')
        }else{
            await this.proveedoresModel.crear({input: req.body})
            res.redirect('/prov')
        }

    }
    update = async (req,res)=>{
        const result = ValidarProvM(req.body)
        const {id} = req.params

        if(!result.success){
            res.redirect('/prov')
        }else{
            await this.proveedoresModel.modificar({id,result})
            res.redirect('/prov')
        }

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
        const result = ValidarSolicitudes(req.body)
        if(!result.success){
            res.redirect('/soli');
        }else{
            await this.solicitudModel.agregar({input: req.body})
            res.redirect('/soli');
        }

    }
    update = async (req,res)=>{
        const result = ValidarSolicitudesM(req.body)
        if(!result.success){
            res.redirect('/soli')
        }else{
            await this.solicitudModel.modificar({input: req.body})
            res.redirect('/soli');
        }

        

    }
    updateCompra = async (req,res)=>{
        const {id} = req.params
        await this.solicitudModel.modificarCompra({id})
        res.redirect('/compra')
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