import { EmpleadosModel } from '../models/empleados.js'
import 'dotenv/config'
import bcrypt from 'bcrypt'; 

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
      error: new Error(JSON.stringify({ nombre: 'Ingrese una contraseña valida' }))
    }
  }
  if (clave_usuario.length < 8) {
    return {
      success: false,
      error: new Error(JSON.stringify({ nombre: 'La contraseña debe contener mas de 8 caracteres' }))
    }
  }
  if (register) {
    console.log(!await EmpleadosModel.unique( cedula ))
    if (await EmpleadosModel.unique( cedula )) {
      return {
        success: false,
        error: new Error(JSON.stringify({ nombre: 'El empleado ingresado ya esta registrado' }))
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

export async function validateLogin (input, register = true) {
  var {user, password} = input
  
  if (typeof password !== 'string' || password.length < 1) {
    return {
      success: false,
      error: 'La contraseña es requerida.'
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