//import { HistorialModel } from "../models/modeloCompra/historial.js";
//import { ProductoModel } from "../models/modeloCompra/Productos.js";
import { HistorialValidaschema } from "../schemas/ValidacionHistorial.js"

export class HistorialController {
    constructor ({historialModel}){
        this.historialModel = historialModel
    }
    create = async (req,res)=>{
        try{
            const {body} = res
            const prueba = HistorialValidaschema.parse(body)
            const nuevoregistro = await this.historialModel.agregar({input: prueba})
            res.json(nuevoregistro)
        }catch(error){
            res.status(400).json({ message: error.message })
        }
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

        

        const newProducto = await this.productoModel.crear({input: req.body})
        return res.json(newProducto)

    }
    update = async (req,res)=>{
        //me falta agregar las validaciones
        const result = req.body

        const {id} = req.params
        console.log(result)
        console.log(id)
        const [updatedProducto] = await this.productoModel.modificar({id,result})

        return res.json(updatedProducto)

    }
    delete = async (req,res)=>{
        //Lo deje aqui  
        const {id} = req.params
        console.log(id)
        const mensaje = await this.productoModel.eliminar({id})

        return res.json(mensaje)
    }

}

export class ProveedorController{
    constructor ({proveedoresModel}){
        this.proveedoresModel = proveedoresModel
    }
    create = async (req,res)=>{
        //me falta agregar las validaciones
        const {result} = req.body

        console.log(req.body)

        

        const newProveedor = await this.proveedoresModel.crear({input: req.body})
        return res.json(newProveedor)

    }
    update = async (req,res)=>{
        //me falta agregar las validaciones
        const result = req.body

        const {id} = req.params
        console.log(result)
        console.log(id)
        const updatedProveedor = await this.proveedoresModel.modificar({id,result})

        return res.json(updatedProveedor)

    }
    delete = async (req,res)=>{
        //Lo deje aqui  
        const {id} = req.params
        console.log(id)
        const mensaje = await this.proveedoresModel.eliminar({id})

        return res.json(mensaje)
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

        console.log(req.body)

        

        /*const newSolicitud =*/
        await this.solicitudModel.agregar({input: req.body})
        //return res.json(newSolicitud)
        res.redirect('/soli');

    }
    update = async (req,res)=>{
        //me falta agregar las validaciones
        
        console.log("Entree")
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