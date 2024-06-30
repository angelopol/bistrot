// Agregando la conexion a la base de datos
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

//Crud de la tabla de los productos de compra

export class ProductoModel{
  // Funcion que crear un producto
  static async crear({input}){
    const {
      NombreP,
      Unidades,
      Consumo,
      Monto,
      Numero_Factura
     } = input

    try{
      await connection.query(
        'INSERT INTO ProductoCompras(NombreP,Unidades,Consumo,Monto,Numero_Factura) VALUES(?,?,?,?,?)'
        [ NombreP,Unidades,Consumo,Monto,Numero_Factura]
      )
    }catch(e){
      console.log(e)
      throw new Error("Error al crear un producto")
    }
  }
  //Funcion que modifica un producto
  static async Modificar({modi}){
    const{
      NombreP,
      Unidades,
      Consumo,
      Monto,
      Numero_Factura
    } = modi

    try{
      await connection.query(
        'UPDATE ProductoCompras SET NombreP = ?, Unidades = ?, Consumo = ?, Monto = ?, Numero_Factura = ? WHERE ID = ?',
        [nombre_empresa,rif,Dire_Fiscal,Correo,Tlf]
      )
    }catch(e){
      console.log(e)
      throw new Error('Error a Modificar los datos del proveedor')
    }
  }
  // Funcion que elimina un producto
  static async eliminar({Elimin}){
    const{ID} = Elimin

    try{
      await connection.query(
        'DELETE FROM ProductoCompras WHERE ID = ?',
        [nombre_empresa]
      )
    }catch(e){
      console.log(e)
      throw new Error('Error a eliminar el producto')
    }
  }
}