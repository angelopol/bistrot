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

// Modelo para los proveedores


export class ProveedoresModel{
  //Funcion que crea un proovedor
  static async crear({create}) {
    const {
      nombre_empresa,
      rif,
      Dire_Fiscal,
      Correo,
      nombre_responsa,
      Tlf
    } = create

    try{
      await connection.query(
        'INSERT INTO Proveedores(Nombre_empresa,RIF,Dire_Fiscal,Correo,Nombre_responsa,Tlf) VALUES(?,?,?,?,?,?)',
        [nombre_empresa,rif,Dire_Fiscal,Correo,nombre_responsa,Tlf]
      )
    }catch(e){
      console.log(e)
      throw new Error('Error creando el proveedor')
    }
  }
  // Funcion que elimina un proveedor
  static async eliminar({Elimin}){
    const{nombre_empresa} = Elimin

    try{
      await connection.query(
        'DELETE FROM Proveedores WHERE Nombre_empresa = ?',
        [nombre_empresa]
      )
    }catch(e){
      console.log(e)
      throw new Error('Error a eliminar el proveedor')
    }

  }
  // Función que encuentra al proveedor
  static async Buscar({busca}){
    const[fila] = await connection.query(
      'SELECT * FROM Proveedores WHERE Nombre_responsa = ?'
      [busca]
    )
    return fila[0]
  }
  // Función que modifica la informacion del Proveedor
  static async Modificar({input}){
    const{
      nombre_empresa,
      rif,
      Dire_Fiscal,
      Correo,
      Tlf
    } = input

    try{
      await connection.query(
        'UPDATE Proveedor SET Nombre_empresa = ?, RIF = ?, Dire_Fiscal = ?, Correo = ?, Tlf = ? WHERE Nombre_responsa = ?',
        [nombre_empresa,rif,Dire_Fiscal,Correo,Tlf]
      )
    }catch(e){
      console.log(e)
      throw new Error('Error a Modificar los datos del proveedor')
    }
  }
}

