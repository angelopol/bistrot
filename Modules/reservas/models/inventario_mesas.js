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

export class MesasModel {
    static async create ({ input }) {
      const {
        ID_mesa,
        descripcion,
        numero_sillas,
        ubicacion
      } = input
  
      try {
        await connection.query(
          `INSERT INTO inventario_mesas (ID_mesa,descripcion,numero_sillas,ubicacion)
            VALUES (?, ?, ?, ?);`,
          [ID_mesa, descripcion,numero_sillas,ubicacion]
        )
      } catch (e) {
        console.log(e)
        throw new Error('Error creating mesa')
      }
    }
    static async modificar ({ modi }) {
        const {
          ID_mesa,
          descripcion,
          numero_sillas,
          ubicacion
        } = modi
    
        try {
          await connection.query(
            'UPDATE inventario_mesas SET descripcion = ?, numero_sillas = ?, ubicacion = ? WHERE ID_mesa = ?'
            [descripcion,numero_sillas,ubicacion,ID_mesa]
          )
        } catch (e) {
          console.log(e)
          throw new Error('Error updating mesa')
        }
    }
    static async encontrar ({ ID_mesa }) {
        const [rows] = await connection.query(
          `SELECT * FROM inventario_mesas WHERE ID_mesa = ?;`,
          [ID_mesa]
        )
        return rows[0]
    }

    static async eliminar({Elimin}){
        const {ID_mesa} = Elimin
    
        try{
          await connection.query(
            'DELETE FROM inventario_mesas WHERE ID_mesa = ?',
            [ID_mesa]
          )
        }catch(e){
          console.log(e)
          throw new Error('Error al eliminar la mesa')
        }
    }

    
  
}