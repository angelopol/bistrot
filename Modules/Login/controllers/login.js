
import { EmpleadosModel } from "../../Register/models/empleados.js"
import { validateEmpleado } from "../../Register/schemas/empleados.js"
import { logged } from "../middlewares/logged.js"
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import 'dotenv/config'

export class LoginController {
  home = async (req, res) => {
    var user = logged(req, res)
    if (!user) return
    res.render('Login/home', user)
  }

  show = async (req, res) => {
    if (!logged(req, res, true)) return
    res.render('Login/login')
  }

  login = async (req, res) => {
    if (!logged(req, res, true)) return
    
    const result = await validateEmpleado(req.body, false)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    var user = await EmpleadosModel.find({ user: result.data.user })
    const isValid = await bycrypt.compare(result.data.password, user.password)
    if (!isValid){
      return res.status(400).json({ message: 'Invalid password' })
    }
    user = {
      user: user.user
    }
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 180
    }).redirect('login/home')
  }

  logout = async (req, res) => {
    res.clearCookie('access_token').redirect('/login')
  }

  GetStyle = async (req, res) => {
    res.sendFile(process.cwd() + '/views/Login/assets/style.css')
  }
}
