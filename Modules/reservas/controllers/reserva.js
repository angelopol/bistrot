import { ReservaModel } from '../models/reserva.js'
import { validarMesas } from '../schemes/validacion_mesas.js'
import { validar_reserva } from '../schemes/validacion_reserva.js'

export class ReservaController{
     getAll = async(req, res) =>{
        const reservas = await ReservaModel.listarReservas()
        if (reservas) {
            return reservas
        }
        res.status(404).json({ message: 'No hay reservas de mesas en la base de datos' })
    }

    getForId = async(req, res) =>{
        const { id } = req.params
        const reserva = await ReservaModel.encontrar({id})
        if (reserva) {
            return res.json(reserva)
        }
        res.status(404).json({ message: 'Reserva de mesas no encontrada' })
    }

    create=async (req, res)=> {
        
        const result = validar_reserva(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const input = result.data
        const { idmesa,fecha, personas, hora_inicio, hora_fin, nombre, cedula, idtelefono, iddescripcion,zona} = input;
        const nueva_reserva = await ReservaModel.create(input)
        res.redirect('/')
    }
        
    delete = async(req, res) =>{
        console.log("progra web sueltame el brazooooo")
        const { id } = req.params
        const validacion = await ReservaModel.eliminar({id})
        
        if (!validacion) {
          return res.status(404).json({ message: 'No se encontró la reserva de mesas' })
        }
      
        res.redirect('/')
        }    

    update = async (req, res) =>{
        console.log(req.params)
        const { id } = req.params;
        const input = req.body; 
        const response = await ReservaModel.modificar({ id, ...input });
        res.redirect('/')
    }

    getModificar = async (req, res) =>{
        const { id } = req.params;
        res.render('modificarReserva', { data: id }); 
    }

}