import bcrypt from 'bcrypt'
import { EmpleadosModel } from '../models/empleados.js'
import 'dotenv/config'

export async function validateEmpleado (input) {
  var {user, password} = input
  if (typeof user !== 'string' || user.length < 1) {
    return {
      success: false,
      error: new Error(JSON.stringify({ user: 'user is required' }))
    }
  }
  if (typeof password !== 'string' || password.length < 1) {
    return {
      success: false,
      error: new Error(JSON.stringify({ user: 'password is required' }))
    }
  }
  if (password.length < 8) {
    return {
      success: false,
      error: new Error(JSON.stringify({ user: 'password lenght is too short' }))
    }
  }
  if (!await EmpleadosModel.unique({ user })) {
    return {
      success: false,
      error: new Error(JSON.stringify({ user: 'user already exists' }))
    }
  }
  password = bcrypt.hashSync(password, 10)
  return { success: true, data: { user, password } }
}