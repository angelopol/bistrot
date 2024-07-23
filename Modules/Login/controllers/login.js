
import { EmpleadosModel } from "../../Register/models/empleados.js"
import { logged } from "../middlewares/logged.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { alert } from "../../../global/helpers/alert.js"
import { validateLogin } from "../../Register/schemas/empleados.js"

export class LoginController {
  home = async (req, res) => {
    var user = logged(req, res)
    if (!user) return
    res.render('Home/index', user)
  }

  show = async (req, res) => {
    if (!logged(req, res, true)) return
    res.render('Login/loging')
  }

  login = async (req, res) => {
    if (!logged(req, res, true)) return
    
    const result = await validateLogin(req.body, false)
    if (!result.success) {
      return res.send(alert(result.error, '/login'))
    }
    var user = await EmpleadosModel.findUser({ user: result.data.user })
    if (user == null){
      return res.send(alert("Usuario no encontrado.", '/login'))
    }
    if (result.data.password != user.password){
      return res.send(alert("Contraseña incorrecta.", '/login'))
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
