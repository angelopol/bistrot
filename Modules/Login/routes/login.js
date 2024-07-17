
import { Router } from 'express'
import { LoginController } from '../controllers/login.js'

export const createLoginRouter = () => {
  const loginRouter = Router()
  const loginController = new LoginController()
  
  loginRouter.get('/', loginController.show)
  loginRouter.get('/home', loginController.home)
  loginRouter.post('/', loginController.login)
  loginRouter.post('/logout', loginController.logout)
  loginRouter.get('/assets/style.css', loginController.GetStyle)

  return loginRouter
}

