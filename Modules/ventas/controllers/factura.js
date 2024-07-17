import {VentasModel} from '../models/ventas_salon.js';
import {validateFactura, validatePartialFactura} from '../schemas/factura.js';

export class ControllerFactura {

    // FACTURA

    // obtener todo los registros de la tabla de factura
    getAll_f = async (req, res) => {
        try{
            const registros_facturas = await VentasModel.getAll_factura({})
            if (registros_facturas) return res.json(registros_facturas)
            res.status(404).json({ message: 'registros de los facturas  not found' })
        
        }
        catch (error){
            console.log('error')
        }
    }



    // obtener un registro de la tabla de factura por id
    getById_f = async (req, res) => {
        const { id } = req.params
        const registro_factura = await VentasModel.getForId_factura({ id })
        if (registro_factura) return res.json(registro_factura)
        res.status(404).json({ message: 'registro de factura not found' })
    }


    // crea un registros de la tabla de factura
    create_f = async (req, res) => {
        const result = (req.body)
        
        console.log(result.data)
        const new_registro_factura = await VentasModel.create_factura({ input: req.body })
        res.status(201).json(new_registro_factura)
    };
    


    // actualiza un registro de la tabla de factura por id
    update_f = async (req, res) => {
        const result = validatePartialFactura(req.body)

        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updated_factura = await VentasModel.update_factura({ id, input: result.data })

        return res.json(updated_factura)
    }



    // elimina un registro de la tabla de factura por id
    delete_f = async (req, res) => {
        const { id } = req.params

        const result = await VentasModel.delete_factura({ id })

        if (result === false) {
        return res.status(404).json({ message: 'factura not found' })
        }

        return res.json({ message: 'factura deleted' })
    }


    probarPost = async (req, res) => {
        let aa = JSON.stringify([
            {
                "id": 1,
                "quantity": 3,
                "price": 10
            },
            {
                "id": 2,
                "quantity": 2,
                "price": 10
            }
            ])
        let data = {
            "monto":444,
            "iva":222,
                "consumo": aa,
            "status_pedido":1,
            "mesa":1,
            "zona":"general"
        }
        let response = await fetch("http://localhost:1234/ventas/factura", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
                },
            body: JSON.stringify(data)
        })

        if (!response.success) {
            console.log("HOLAAAA")
            return res.json("NOOOO")
        }
        else {
            return res.json(data)
        }
    }
    

}