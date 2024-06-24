import { Router } from 'express'
import { LoginController } from '../controllers/login.js'

export const createLoginRouter = () => {
  const loginRouter = Router()
  const loginController = new LoginController()
  
  loginRouter.get('/', loginController.show)
  loginRouter.post('/', loginController.login)
  loginRouter.get('/assets/style.css', loginController.GetStyle)

  return loginRouter
}