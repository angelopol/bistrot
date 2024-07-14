import {VentasModel} from '../models/ventas_salon';
import {validateSalon, validatePartialSalon} from '../schemas/salon.js';


export class ControllerSalon {

    // SALON


    // obtener todo los registros de la tabla de salon
    getAll_s = async (req, res) => {
        const registro_salon = await VentasModel.getAll_salon({})
        if (registro_salon) return res.json(registro_salon)
        res.status(404).json({ message: 'registros de salon not found' })
    }



    // obtiene un registro de la tabla de salon, por id
    getById_s = async (req, res) => {
        const { id } = req.params
        const salon = await VentasModel.getForId_salon({ id })
        if (salon) return res.json(salon)
        res.status(404).json({ message: 'salon not found' })
    }

    

    // crea un registro de salon
    create_s = async (req, res) => {
        const result = validateSalon(req.body)

        if (result.error){
        return res.status(400).json({error : JSON.parse(result.error.message)})
        }

        const new_registro_salon = await VentasModel.create_salon({ input: result.data })

        res.status(201).json(new_registro_salon)
    };
    


    // actualiza los registros de la tabla de salon por id
    update_s = async (req, res) => {
        const result = validatePartialSalon(req.body)

        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updated_salon = await VentasModel.update_salon({ id, input: result.data })

        return res.json(updated_salon)
    }



    // elimina un registro de la tabla de salon, por id
    delete_s = async (req, res) => {
        const { id } = req.params

        const result = await VentasModel.delete_salon({ id })

        if (result === false) {
        return res.status(404).json({ message: 'salon not found' })
        }

        return res.json({ message: 'salon deleted' })
    }

}