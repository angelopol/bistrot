

import { Router } from 'express'
import { RegisterController} from '../controllers/register.js'

export const createRegisterRouter = () => {
  const registerRouter = Router()
  const registerController = new RegisterController()
  
  registerRouter.post('/', registerController.store)
  registerRouter.get('/', registerController.create)

  return registerRouter
}
