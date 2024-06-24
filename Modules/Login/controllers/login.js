import { EmpleadosModel } from "../../Register/models/empleados.js"
import { validateEmpleado } from "../../Register/schemas/empleados.js"
import bycrypt from 'bcrypt'

export class LoginController {
  show = async (req, res) => {
    res.render('Login/login')
  }

  login = async (req, res) => {
    const result = await validateEmpleado(req.body, false)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const user = await EmpleadosModel.find({ user: result.data.user })
    if (!user){
      return res.status(404).json({ message: 'User not found' })
    }
    const isValid = bycrypt.compare(result.data.password, user.password)
    if (!isValid){
      return res.status(400).json({ message: 'Invalid password' })
    }
    return {
      user: user.user
    }
  }

  GetStyle = async (req, res) => {
    res.sendFile(process.cwd() + '/views/Login/assets/style.css')
  }
}
