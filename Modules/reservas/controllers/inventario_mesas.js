import { InventarioMesasModel } from '../models/inventario_mesas.js'
import { validarInventarioMesas } from '../schemes/validacion_inventarioMesas.js'

export class ListaEsperaController{
    static async getAll (req, res) {
        const reservas = await InventarioMesasModel.listar()
        if (reservas) {
            return res.json(reservas)
        }
        res.status(404).json({ message: 'No hay mesas en la base de datos' })
    }

    static async getForID (req, res) {
        const { id } = req.params
        const reserva = await InventarioMesasModel.encontrar({id})
        if (reserva) {
            return res.json(reserva)
        }
        res.status(404).json({ message: 'Mesa no encontrada' })
    }

    static async create (req, res) {
        const result = validarInventarioMesas(req.body)
  
        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const input = result.data
        const nueva_espera = await InventarioMesasModel.crear({input})
        res.status(201).json(nueva_espera)
        }
        
    static async delete (req, res) {
        const { id } = req.params
        const validacion = await InventarioMesasModel.eliminar({id})
        
        if (!validacion) {
          return res.status(404).json({ message: 'No se encontró la mesa' })
        }
      
        return res.json({ message: 'Mesas eliminadas' })
        }
    
    static async update (req, res) {
        const result = validarInventarioMesas(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        const { id } = req.params
        const input = result.data
        const response = await InventarioMesasModel.modificar({id,input})
    
        return res.json(response)  
        }   
}