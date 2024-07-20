import {VentasModel} from '../models/ventas_salon.js';
import {validateCliente, validatePartialCliente} from '../schemas/cliente.js';
import { logged } from "../../Login/middlewares/logged.js"

export class ControllerCliente {


    // CLIENTE


    // obtener todo los registros de la tabla de cliente
    getAll_cl = async (req, res) => {
        if (logged(req, res, false, false)) return
        const registros_clientes = await VentasModel.getAll_cliente({})
        if (registros_clientes) return res.json(registros_clientes)
        res.status(404).json({ message: 'registros de los clientes  not found' })
    }



    // obtener un registro de la tabla de cliente por id
    getById_cl = async (req, res) => {
        if (logged(req, res, false, false)) return
        const { id } = req.params
        const registro_cliente = await VentasModel.getForId_cliente({ id })
        if (registro_cliente) return res.json(registro_cliente)
        res.status(404).json({ message: 'cliente not found' })
    }


    
    // crearun registro la tabla de cliente
    create_cl = async (req, res) => {
        if (logged(req, res, false, false)) return
        const result = validateCliente(req.body)

        console.log(result)

        const new_registro_cliente = await VentasModel.create_cliente({ input: req.body })

        res.status(201).json(new_registro_cliente)
    };
    


    // actualiza un registro de la tabla cliente por id
    update_cl = async (req, res) => {
        if (logged(req, res, false, false)) return
        const result = validatePartialCliente(req.body)

        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updated_cliente = await VentasModel.update_cliente({ id, input: result.data })

        return res.json(updated_cliente)
    }



    // elimina un registro de la tabla de cliente por id
    delete_cl = async (req, res) => {
        if (logged(req, res, false, false)) return
        const { id } = req.params

        const result = await VentasModel.delete_cliente({ id })

        if (result === false) {
        return res.status(404).json({ message: 'cliente not found' })
        }

        return res.json({ message: 'cliente deleted' })
    }


}