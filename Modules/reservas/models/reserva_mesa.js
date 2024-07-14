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

export class ReservaMesasModel {
    static async crear({ input }) {
        const {
            ID_mesa,
            ID_reserva,
        } = input

        try {
            await connection.query(
                `INSERT INTO reserva_mesa (ID_mesa, numero_reserva)
                VALUES (?, ?);`,
                [ID_mesa, ID_reserva]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error creando reserva de mesa')
        }
    }
    // Creo que no debería poder modificarse los ID, se deja comentado por si acaso

    // static async modificar({ modi }) {
    //     const {
    //         ID_mesa,
    //         ID_reserva,
    //     } = modi

    //     try {
    //         await connection.query(
    //             'UPDATE reserva_mesa SET ID_reserva = ? WHERE ID_mesa = ?',
    //             [ID_reserva, ID_mesa]
    //         )
    //     } catch (e) {
    //         console.log(e)
    //         throw new Error('Error actualizando reserva de mesa')
    //     }
    // }
    static async encontrar({ ID_mesa }) {
        try {
            const [rows] = await connection.query(
                `SELECT * FROM reserva_mesa WHERE ID_mesa = ?;`,
                [ID_mesa]
            )
            return rows[0]
        } catch (e) {
            console.log(e)
            throw new Error('Error buscando reserva de mesa')
        }
    }
    static async eliminar({ ID_mesa }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM reserva_mesa WHERE ID_mesa = ?',
                [ID_mesa]
            )

            if (result.affectedRows > 0) {
                return { message: `Reserva con id ${id} eliminada correctamente.` }
            }
        } catch (e) {
            console.log(e)
            throw new Error('Error eliminando reserva de mesa')
        }
    }
    static async listar() {
        try {
            const [rows] = await connection.query(
                `SELECT * FROM reserva_mesa;`
            )
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error listando reserva de mesa')
        }
    }
}