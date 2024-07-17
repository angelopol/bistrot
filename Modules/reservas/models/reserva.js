import mysql from 'mysql2/promise'
import 'dotenv/config'

const DBConfig = {
  host: '127.0.0.1' || process.env.DB_HOST,
  user: 'root' || process.env.DB_USERNAME,
  port: 3306 || process.env.DB_PORT,
  password: '1234' || process.env.DB_PASSWORD,
  database: 'modulo_reservas' || process.env.DB_DATABASE,
}

const connection = await mysql.createConnection(DBConfig)

export class ReservaModel {
    static async create (input) {
      const {
        fecha, // Debe coincidir con el nombre del campo en el formulario HTML
        personas,
        cedula,
        hora_inicio,
        hora_fin,
        iddescripcion, // Asegúrate de que este nombre coincida con el esperado
        idtelefono,
        nombre,
        idmesa,
        zona  // Asegúrate de que este nombre coincida con el esperado
      } = input;

      
  
      try {
        await connection.query(
          `INSERT INTO reserva (ID_mesa,cantidad_personas, ID_cliente, fecha, hora_inicio, hora_fin, descripcion, telefono, nombre, ubicacion)
           VALUES (?,?,?,?,?,?,?,?,?,?);`,
          [idmesa,personas,cedula, fecha, hora_inicio, hora_fin, iddescripcion, idtelefono, nombre,zona]
      );
      } catch (e) {
        console.log(e);
        throw new Error('Error creating reserva');
      }
    }
    static async encontrar ({ numero_reserva }) {
        const [rows] = await connection.query(
          `SELECT * FROM reserva WHERE numero_reserva = ?;`,
          [numero_reserva]
        )
        return rows[0]
    }

    static async eliminar({numero_reserva}){
        try{
          const [result] = await connection.query(
            'DELETE FROM reserva WHERE numero_reserva = ?',
            [numero_reserva]
          )
          
          if (result.affectedRows > 0) {
            return { message: `Reserva con numero de reserva ${numero_reserva} eliminada correctamente.` }
        }
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
    static async modificar (cedulaC, modi) {
        const {fecha,
        hora_inicio,
        hora_fin,
        iddescripcion, 
        } = modi
    
        try {
          await connection.query(
            'UPDATE reserva SET fecha = ?, hora_inicio = ?, hora_fin = ?, descripcion = ? WHERE ID_cliente = ?',
            [fecha, hora_inicio, hora_fin, iddescripcion, cedulaC]
          )
        } catch (e) {
          console.log(e)
          throw new Error('Error updating reserva')
        }
    }
}