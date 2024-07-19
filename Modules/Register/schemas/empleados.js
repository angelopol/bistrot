
import bcrypt from 'bcrypt'
import { EmpleadosModel } from '../models/empleados.js'
import 'dotenv/config'

export async function validateEmpleado (input, register = true) {
  var {user, password} = input
  
  if (typeof password !== 'string' || password.length < 1) {
    return {
      success: false,
      error: 'La contraseña es requerida.'
    }
  }
  if (password.length < 8) {
    return {
      success: false,
      error: 'La longitud de la contraseña es muy corta.'
    }
  }
  if (register) {
    if (!await EmpleadosModel.unique({ user })) {
      return {
        success: false,
        error: 'El usuario ya existe.'
      }
    }
    password = bcrypt.hashSync(password, 10)
  }
  return { success: true, data: { user, password } }
}
