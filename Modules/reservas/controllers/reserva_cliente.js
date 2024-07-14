import { ReservaClienteModel } from '../models/reserva_cliente.js'
import { validar_reserva } from '../schemes/validacion_reserva.js'

export class ReservaClientesController{
    static async getAll (req, res) {
        const reservas = await ReservaClienteModel.listarReservas()
        if (reservas) {
            return res.json(reservas)
        }
        res.status(404).json({ message: 'No hay reservas de clientes en la base de datos' })
    }

    static async getForNumeroReserva (req, res) {
        const { numero_reserva } = req.params
        const reserva = await ReservaClienteModel.encontrar({numero_reserva})
        if (reserva) {
            return res.json(reserva)
        }
        res.status(404).json({ message: 'Reserva de cliente no encontrada' })
    }

    static async create (req, res) {
        const result = validar_reserva(req.body)
  
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
            return res.status(404).json({ message: 'No se encontró la reserva de cliente' })
          }
      
        return res.json({ message: 'Reserva de cliente eliminada' })
        }    

    static async update (req, res) {
        const result = validar_reserva(req.body)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
  
        const { numero_reserva } = req.params
        const input = result.data
        const response = await ReservaClienteModel.modificar({numero_reserva,input})
  
        return res.json(response)  
        }    
}