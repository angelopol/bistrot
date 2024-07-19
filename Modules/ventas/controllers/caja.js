import {VentasModel} from '../models/ventas_salon.js';
import {validateCaja, validatePartialCaja} from '../schemas/caja.js';

export class ControllerCaja {

    // CAJA

    // obtener todo los registros de la tabla de caja
    getAll_c = async (req, res) => {

        const registro_ventas = await VentasModel.getAll_caja({})
        if (registro_ventas) return res.json(registro_ventas)
        res.status(404).json({ message: 'registro de ventas not found' })
    }


    // obtiene un registro especifico de la caja, buscandolo por id
    getById_c = async (req, res) => {
        const { id } = req.params
        const ventas = await VentasModel.getForId_caja({ id })
        if (ventas) return res.json(ventas)
        res.status(404).json({ message: 'ventas not found' })
    }

    

    // crea un registro de caja
    create_c = async (req, res) => {
        const result = validateCaja(req.body)


        const new_Venta = await VentasModel.create_caja({ input: req.body })

        res.status(201).json(new_Venta)
    };
    


    // actualiza el registro de caja, buscandolo por id
    update_c = async (req, res) => {
        const result = validatePartialCaja(req.body)

        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updated_Ventas = await VentasModel.update_caja({ id, input: result.data })

        return res.json(updated_Ventas)
    }



    // elimina el registro de caja, buscandolo por id
    delete_c = async (req, res) => {
        const { id } = req.params

        const result = await VentasModel.delete_caja({ id })

        if (result === false) {
        return res.status(404).json({ message: 'Venta not found' })
        }

        return res.json({ message: 'Venta deleted' })
    }

}