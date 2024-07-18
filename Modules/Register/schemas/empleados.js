import bcrypt from 'bcrypt'
import { EmpleadosModel } from '../models/empleados.js'
import 'dotenv/config'

export async function validateEmpleado (input, register = true) {
  var { nombre,
        clave_usuario,
        cedula,
        codigo_empleado,
        puesto,
       } = input
  
  if (typeof clave_usuario !== 'string' || clave_usuario.length < 1) {
    return {
      success: false,
      error: new Error(JSON.stringify({ nombre: 'clave_usuario is required' }))
    }
  }
  if (clave_usuario.length < 8) {
    return {
      success: false,
      error: new Error(JSON.stringify({ nombre: 'clave_usuario lenght is too short' }))
    }
  }
  if (register) {
    if (!await EmpleadosModel.unique({ nombre })) {
      return {
        success: false,
        error: new Error(JSON.stringify({ nombre: 'nombre already exists' }))
      }
    }
    clave_usuario = bcrypt.hashSync(clave_usuario, 10)
  }
  return { success: true, data: {  nombre,
    clave_usuario,
    cedula,
    codigo_empleado,
    puesto } }
}