
import { validateEmpleado } from "../schemas/empleados.js"
import { EmpleadosModel } from "../models/empleados.js"
import { logged } from "../../Login/middlewares/logged.js"
import { VerifyCargo } from "../../Register/middlewares/cargo.js"

export class RegisterController {
    store = async (req, res) => {

        const result = await validateEmpleado(req.body)
    
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        await EmpleadosModel.create({ input: req.body })
    
        res.status(200).json({ message: 'Empleado created' })
    }
    

    create = async (req, res) => {
        res.render('Register/register')
    }
    delete = async (req, res) => {
        await EmpleadosModel.delete(req.body)
        res.status(200).json({ message: 'Empleado created' })
    }
    update = async (req, res) => {
        if (logged(req, res, false, false)) return
        try {
            await EmpleadosModel.update(req.body);
            res.status(200).json({ message: 'Entrada registrada exitosamente' });
        } catch (e) {
            console.error('Error actualizando datos:', e);
            res.status(500).json({ error: 'Error actualizando datos' });
        }

    }

    //Solicitudes
    solicitar = async (req, res) => {
        if (logged(req, res, false, false)) return
        console.log("ruta ok",req.body)
        try {
            await EmpleadosModel.createSolicitud({ input: req.body })
            res.status(200).json({ message: 'Entrada registrada exitosamente' });
        } catch (e) {
            console.error('Error actualizando datos:', e);
            res.status(500).json({ error: 'Error actualizando datos' });
        }
    }
    solicitudes = async (req, res) => {
        if (logged(req, res, false, false)) return
        try {
            const result = await EmpleadosModel.getSolicitudes()
            res.status(200).json(result);
        } catch (e) {
            console.error('Error actualizando datos:', e);
            res.status(500).json({ error: 'Error obteniendo datos' });
        }
    }
    updateEstado = async (req, res) => {
        // Verifica si el usuario está autenticado
        if (logged(req, res, false, false)) return;
    
        // Obtén los parámetros necesarios de la solicitud
        const { id } = req.body; // ID de la solicitud que se va a actualizar
        const { estado } = req.body; // Nuevo estado
        try {
            // Verifica si el estado es válido
            if (!["0", "1", "2", 0 ,1 ,2].includes(estado)) {
                return res.status(400).json({ error: 'Estado inválido' });
            }
    
            // Llama a la función del modelo para actualizar el estado
            await EmpleadosModel.updateEstado(id, estado);
    
            // Envía una respuesta exitosa
            res.status(200).json({ success: true });
        } catch (e) {
            // Maneja cualquier error que ocurra durante el proceso
            console.error('Error actualizando el estado:', e);
            res.status(500).json({ error: 'Error actualizando el estado' });
        }
    };
    
}  