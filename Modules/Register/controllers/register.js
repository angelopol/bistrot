import { validateEmpleado } from "../schemas/empleados.js"
import { EmpleadosModel } from "../models/empleados.js"

export class RegisterController {
    store = async (req, res) => {
        const result = await validateEmpleado(req.body)
    
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        await EmpleadosModel.create({ input: result.data })
    
        res.status(200).json({ message: 'Empleado created' })
    }

    create = async (req, res) => {
        res.render('Register/register')
    }
}  