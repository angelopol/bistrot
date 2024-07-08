//import { HistorialModel } from "../models/modeloCompra/historial.js";
//import { ProductoModel } from "../models/modeloCompra/Productos.js";

export class HistorialController {
    constructor ({historialModel}){
        this.historialModel = historialModel
    }
    create = async (req,res)=>{
        //me falta agregar las validaciones al req.body
        const {result} = req.body
        console.log(req.body)
        const newHistorial = await this.historialModel.agregar({input: req.body})
        res.json(newHistorial)
    }
}

export class ProductoController{
    constructor ({productoModel}){
        this.productoModel = productoModel
    }
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

}

export class SolicitudController{
    constructor ({solicitudModel}){
        this.solicitudModel = solicitudModel
    }
    create = async (req,res)=>{
        //me falta agregar las validaciones
        const {result} = req.body

        console.log(req.body)

        

        const newSolicitud = await this.solicitudModel.agregar({input: req.body})
        return res.json(newSolicitud)

    }
    update = async (req,res)=>{
        //me falta agregar las validaciones
        const result = req.body

        const {id} = req.params
        console.log(result)
        console.log(id)
        const updatedSolicitud = await this.solicitudModel.modificar({id,result})

        return res.json(updatedSolicitud)

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