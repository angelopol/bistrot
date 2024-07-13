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

export class ReservaClienteModel {
    static async create ({ input }) {
      const {
        numero_reserva,
        confirmado,
        cantidad_personas,
        ID_cliente,
        fecha_inicio,
        fecha_fin,
        tipo_evento
      } = input
  
      try {
        await connection.query(
          `INSERT INTO reserva (numero_reserva,confirmado,cantidad_personas,ID_cliente,
            fecha_inicio,fecha_fin,tipo_de_evento)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
          [numero_reserva,confirmado,cantidad_personas,ID_cliente,
            fecha_inicio,fecha_fin,tipo_evento
          ]
        )
      } catch (e) {
        console.log(e)
        throw new Error('Error creating reserva')
      }
    }
    static async modificar ({ modi }) {
        const {
            numero_reserva,
            confirmado,
            cantidad_personas,
            ID_cliente,
            fecha_inicio,
            fecha_fin,
            tipo_evento
        } = modi
    
        try {
          await connection.query(
            'UPDATE reserva SET numero_reserva = ?, confirmado = ?, cantidad_personas = ?, fecha_inicio = ?, fecha_fin = ?, tipo_de_evento = ? WHERE ID_cliente = ?'
            [numero_reserva,confirmado,cantidad_personas,fecha_inicio,fecha_fin,tipo_evento,ID_cliente]
          )
        } catch (e) {
          console.log(e)
          throw new Error('Error updating reserva')
        }
    }
    static async encontrar ({ numero_reserva }) {
        const [rows] = await connection.query(
          `SELECT * FROM reserva WHERE numero_reserva = ?;`,
          [numero_reserva]
        )
        return rows[0]
    }

    static async eliminar({Elimin}){
        const {numero_reserva} = Elimin
    
        try{
          await connection.query(
            'DELETE FROM reserva WHERE ID_mesa = ?',
            [numero_reserva]
          )
        }catch(e){
          console.log(e)
          throw new Error('Error al eliminar la reserva')
        }
    }
    static async listarReservas(){  
        try{
          const [rows] = await connection.query(
            `SELECT * FROM reserva`
          )
          return rows
        }catch(e){
          console.log(e)
          throw new Error('Error al listar las reservas')
        }
    }

    
  
}