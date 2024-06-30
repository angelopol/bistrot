//Agregando la conexion a la base de datos

import mysql from 'mysql2/promise'
import 'dotenv/config'

const DBConfig = {
  host: '127.0.0.1' || process.env.DB_HOST,
  user: 'root' || process.env.DB_USERNAME,
  port: 3306 || process.env.DB_PORT,
  password: '' || process.env.DB_PASSWORD,
  database: 'bistrot' || process.env.DB_DATABASE,
}

const connection = await mysql.createConnection(DBConfig)

// Crud para la tabla de las solicitudes de compra

export class SolicitudModel{
  //Funcion que agrega una solicitud
  static async agregar({input}){
    const {
      depar,
      codigo_empleado,
      fecha,
      detalle
    } = input

    try{
      await connection.query(
        'INSERT INTO Solicitudes(Departamento,Codigo_empleado,FECHA,DETALLE) VALUES(?,?,?,?)',
        [depar,codigo_empleado,fecha,detalle]
      )
    }catch(e){
      console.log(e)
      throw new Error("Error al agregar una nueva solicitud")
    }
  }
  //Funcion que elimina una solicitud
  static async eliminar({eli}){
    const{ID} = eli

    try{
      await connection.query(
        'DELETE FROM Solicitudes WHERE ID_Empleado = ?',
        [ID]
      )
    }catch(e){
      console.log(e)
      throw new Error("Error al eliminar la solicitud")
    }
  }
  //Funcion que modifica una solicitud
  static async Modificar({modi}){
    const{
      depar,
      codigo_empleado,
      Id_requisión,
      fecha,
      detalle
    } = modi

    try{
      await connection.query(
        'UPDATE Solicitudes SET Departamento = ?, Codigo_Producto = ?, FECHA = ?, DETALLE = ?, ID_requisión = ? WHERE ID_Empleado = ?',
        [depar,codigo_empleado,Id_requisión,fecha,detalle]
      )
    }catch(e){
      console.log(e)
      throw new Error("Error al modificar la solicitud")
    }
  }
  //Funcion que busca una solicitud
  static async Buscar({bus}){
    const{fila} = await connection.query(
      'SELECT * FROM Solicitudes WHERE ID_Empleado = ?',
      [bus]
    )
    return fila[0]
  }
}