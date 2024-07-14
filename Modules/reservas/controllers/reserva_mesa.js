import { ReservaMesasModel } from '../models/reserva_mesa.js'
import { validarReservaMesas } from '../schemes/validacion_reserva_mesas.js'

export class ReservaMesasController{
    static async getAll (req, res) {
        const reservas = await ReservaMesasModel.listar()
        if (reservas) {
            return res.json(reservas)
        }
        res.status(404).json({ message: 'No hay reservas de mesas en la base de datos' })
    }

    static async getForId (req, res) {
        const { id } = req.params
        const reserva = await ReservaMesasModel.encontrar({id})
        if (reserva) {
            return res.json(reserva)
        }
        res.status(404).json({ message: 'Reserva de mesas no encontrada' })
    }

    static async create (req, res) {
        const result = validarReservaMesas(req.body)
  
        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const input = result.data
        const nueva_reserva = await ReservaMesasModel.crear({input})
        res.status(201).json(nueva_reserva)
        }
        
    static async delete (req, res) {
        const { id } = req.params
        const validacion = await ReservaMesasModel.eliminar({id})
        
        if (!validacion) {
          return res.status(404).json({ message: 'No se encontró la reserva de mesas' })
        }
      
        return res.json({ message: 'Reserva de mesad eliminada' })
        }    

    // Leer comentario en el modelo

    // static async update (req, res) {
    //     const result = validarReservaMesas(req.body)
    //     if (!result.success) {
    //       return res.status(400).json({ error: JSON.parse(result.error.message) })
    //     }
  
    //     const { id } = req.params
    //     const input = result.data
    //     const response = await ReservaMesasModel.modificar({id,input})
  
    //     return res.json(response)  
    //     }    
}