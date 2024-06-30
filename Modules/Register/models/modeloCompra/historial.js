// Agregando la conexion a a base de datos

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

// Crud para la tabla del historial de compras

export class HistorialModel{
  // Funcion que agrega la compra
  static async Agregar({input}){
    const{
      fecha,
      factura,
      Pago,
      Producto,
      Cantidad,
      Precio,
      Nombre_proveedor,
      Departamento
     } = input

    try{
      await connection.query(
        'INSERT INTO Historial(FECHA,Factura,Pago,Producto,Cantidad,Precio,Nombre_Proveedor,Departamento) VALUES(?,?,?,?,?,?,?,?,?)',
        [fecha,factura,Pago,Producto,Cantidad,Precio,Nombre_proveedor,Departamento]
      )
    }catch(e){
      console.log(e)
      throw new Error("Error agregando la compra al historial")
    }
  }
}