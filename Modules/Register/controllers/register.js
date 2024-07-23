
import { validateEmpleado } from "../schemas/empleados.js"
import { EmpleadosModel } from "../models/empleados.js"
import { logged } from "../../Login/middlewares/logged.js"
import { VerifyCargo } from "../../Register/middlewares/cargo.js"

export class RegisterController {
    store = async (req, res) => {
        const result = await validateEmpleado(req.body)
        console.log(req.body)
    
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        await EmpleadosModel.create({ input: req.body })
    
        res.status(200).json({ message: 'Empleado created' })
    }

    create = async (req, res) => {
        res.render('Register/register')
    }
}  
