
import { validarHistorial } from "../schemas/ValidacionHistorial.js"
import { ValidarProducto, validarProductoM } from "../schemas/ValidacionProducto.js"
import { ValidarProv, ValidarProvM } from "../schemas/ValidacionProv.js"
import { ValidarSolicitudes } from "../schemas/ValidacionSolicitud.js"
import { ProductoModel } from '../models/Productos.js'
import { HistorialModel } from '../models/historial.js'
import { ProveedoresModel } from '../models/proveedor.js'
import { SolicitudModel } from '../models/solicitud.js'
import { logged } from "../../Login/middlewares/logged.js"
import { VerifyCargo } from "../../Register/middlewares/cargo.js"

export class HistorialController {
    getAllData2 = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const requisicion = await SolicitudModel.getReq()
        const proveedores = await ProveedoresModel.listar()

        res.render('compras/compra', { data2: requisicion, data3: proveedores })
    }

    create = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const{
            id,
            nombreP,
            proveedor
        } = req.body
        const result = validarHistorial(req.body)
        //Obtener producto que vende el proveedor para validar que si vende el producto solicitado
        const productoProveedor = await ProveedoresModel.getProducto({ proveedor })


        if ((!result.success) && (productoProveedor[0].Productos_Proveedor.toLowerCase() != nombreP.toLowerCase())) {

            res.redirect('/compra-index/compra')
        } else {
            const orden = await HistorialModel.agregar({ input: req.body })
            res.render('compras/confirmacion', { dato: id, dato2: orden })
        }


    }

    getAll = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const ordenes = await HistorialModel.listar()
        res.render('compras/index', { data: ordenes });
    }

    delete = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        await HistorialModel.eliminar()

        res.redirect('/compras-index')
    }

    update = async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID es requerido' });
        }

        try {
            await HistorialModel.actualizar({ id });
            res.status(200).json({ message: 'Orden actualizada correctamente' });
        } catch (error) {
            console.error('Error al actualizar la orden:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    };


    //Metodo de obtener por ID (INVENTARIO)
    getById = async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID es requerido' });
        }

        try {
            const orden = await HistorialModel.obtener({ id });

            if (!orden) {
                return res.status(404).json({ message: 'Orden no encontrada' });
            }

            // Devuelve los datos en formato JSON
            res.json(orden);
        } catch (error) {
            console.error('Error al obtener la orden:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    };


}

export class ProductoController {
    //renderizando dos paginas en un controlador y fallaba 
    getAll1 = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const productos = await ProductoModel.listar()
        res.render('compras/productos', { data: productos })
    }

    //metodo en el que llamo a varios modelos para mostrar en la pagina de solicitudes
    getAllData = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const productos = await ProductoModel.listar()
        const nombres = await ProductoModel.getNombre()
        const requisicion = await SolicitudModel.getReq()


        res.render('compras/solicitud', { data: productos, data1: nombres, data2: requisicion })
    }


    create = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const result = ValidarProducto(req.body)
        console.log(result)
        if (!result.success) {
            res.redirect('compras-prod')
        } else {
            await ProductoModel.crear({ input: req.body })

            res.redirect('compras-prod')
        }


    }
    update = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        //me falta agregar las validaciones
        const result = ValidarProducto(req.body)
        const { id } = req.params
        //console.log(result.success)
        //console.log(id)
        if (!result.success) {
            //console.log("Validacion no exitosa")
            res.redirect('/compras-index/compras-prod')
        } else {
            //console.log("Validacion exitosa")
            await ProductoModel.modificar({ id, result: result.data })
            res.redirect('/compras-index/compras-prod')
        }


    }

    //Metodo para borrar un producto
    delete = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        //Lo deje aqui  
        const { nombre } = req.params
        await ProductoModel.eliminar({ nombre })

        res.redirect('/compras-index/compras-prod')
    }

}

export class ProveedorController{
    create = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const result = ValidarProv(req.body)
        //console.log(result.success)
        //console.log(result.data)
        //console.log(req.body)
        if (!result.success) {
            //console.log("Validacion Incorrecta")
            res.redirect('/compras-index/prov')
        } else {
            //console.log("Validacion correcta")
            await ProveedoresModel.crear({ input: req.body })
            res.redirect('/compras-index/prov')
        }

    }
    update = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const result = ValidarProv(req.body)
        const { id } = req.params
        //console.log(result)
        //console.log(result.success)
        //console.log(req.body)
        if (!result.success) {
            //console.log("Validacion devolvio false")
            res.redirect('/compras-index/prov')
        } else {
            await ProveedoresModel.modificar({ id, result: req.body })
            res.redirect('/compras-index/prov')
        }

    }
    delete = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        //Lo deje aqui 
        const { nombre } = req.params
        //console.log(nombre)
        if (nombre === undefined) {
            res.redirect('/compras-index/prov')
        } else {
            await ProveedoresModel.eliminar({ nombre })
            res.redirect('/compras-index/prov')
        }



    }

    getByName = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        console.log(req.params)
        const proveedor = await ProveedoresModel.filtrar({ nombre: req.params })

        const requisicion = await SolicitudModel.getReq()
        res.render('compras/compra', { data2: requisicion, data3: proveedor })
    }

    getById = async (req,res)=>{
        if (logged(req, res, false, false)) return
        const {id} =req.params

        const proveedor = await ProveedoresModel.buscar({ id })
        if (proveedor) return res.json(proveedor)
        res.status(404).json({ message: 'Proveedor not found' })
    }


    getAll = async (req, res) => {
        if (!await VerifyCargo(req, res, 'Compras')) return
        const proveedores = await ProveedoresModel.listar()


        res.render('compras/prov', { data: proveedores });

    }

}

export class SolicitudController{
    create = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const result = ValidarSolicitudes(req.body)
        //console.log(result)
        if (!result.success) {
            res.redirect('/compras-index/soli');
        } else {
            await SolicitudModel.agregar({ input: req.body })
            res.redirect('/compras-index/soli');
        }

    }
    update = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const {id_req} = req.body
        
        if(id_req === undefined){
            res.redirect('/compras-index/soli')
        } else {
            await SolicitudModel.modificar({ input: req.body })
            res.redirect('/compras-index/soli');
        }



    }
    updateCompra = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Compras')) return
        const {id} = req.params
        await SolicitudModel.modificarCompra({id})
        res.redirect('/compras-index')
    }
    delete = async (req,res)=>{
        if (logged(req, res, false, false)) return
        //Lo deje aqui  
        const { id } = req.params
        console.log(id)
        const mensaje = await SolicitudModel.eliminar({ id })

        return res.json(mensaje)
    }

    getById = async (req,res)=>{
        if (logged(req, res, false, false)) return
        const {id} =req.params

        const solicitud = await SolicitudModel.buscar({ id })
        if (solicitud) return res.json(solicitud)
        res.status(404).json({ message: 'Solicitud not found' })
    }

}