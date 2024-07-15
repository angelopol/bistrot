import { MesasModel } from '../models/mesas.js'
import { validarMesas } from '../schemes/validacion_mesas.js'

export class MesasController{
    getAll = async(req, res)=> {
        const reservas = await MesasModel.listar()
        if (reservas) {
            return res.json(reservas)
        }
        res.status(404).json({ message: 'No hay mesas en la base de datos' })
    }

    getForID = async(req, res)=> {
        const { id } = req.params
        const reserva = await MesasModel.encontrar({id})
        if (reserva) {
            return res.json(reserva)
        }
        res.status(404).json({ message: 'Mesa no encontrada' })
    }

     create = async(req, res) =>{
        const result = validarInventarioMesas(req.body)
  
        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const input = result.data
        const nueva_espera = await MesasModel.crear({input})
        res.status(201).json(nueva_espera)
        }
        
     delete = async (req, res)=> {
        const { id } = req.params
        const validacion = await MesasModel.eliminar({id})
        
        if (!validacion) {
          return res.status(404).json({ message: 'No se encontró la mesa' })
        }
      
        return res.json({ message: 'Mesas eliminadas' })
        }
    
    update = async(req, res) =>{
        const result = validarInventarioMesas(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        const { id } = req.params
        const input = result.data
        const response = await MesasModel.modificar({id,input})
    
        return res.json(response)  
        }   
}