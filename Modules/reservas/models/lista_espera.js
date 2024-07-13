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

export class ListaEsperaModel {
    static async crear({ input }) {
        const {
            cedula,
            nombre,
            apellido,
            cantidad_personas,
        } = input

        try {
            await connection.query(
                `INSERT INTO lista_espera (cedula, nombre, apellido, cantidad_personas)
                VALUES (?, ?, ?, ?);`,
                [cedula, nombre, apellido, cantidad_personas]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error creando lista de espera')
        }
    }
    static async modificar({ modi }) {
        const {
            cedula,
            nombre,
            apellido,
            cantidad_personas,
        } = modi

        try {
            await connection.query(
                'UPDATE lista_espera SET nombre = ?, apellido = ?, cantidad_personas = ? WHERE cedula = ?',
                [nombre, apellido, cantidad_personas, cedula]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error actualizando lista de espera')
        }
    }
    static async encontrar({ cedula }) {
        try {
            const [rows] = await connection.query(
                `SELECT * FROM lista_espera WHERE cedula = ?;`,
                [cedula]
            )
            return rows[0]
        } catch (e) {
            console.log(e)
            throw new Error('Error buscando lista de espera')
        }
    }

    static async eliminar({ cedula }) {
        try {
            await connection.query(
                `DELETE FROM lista_espera WHERE cedula = ?;`,
                [cedula]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error eliminando lista de espera')
        }
    }

    static async listar() {
        try {
            const [rows] = await connection.query(
                `SELECT * FROM lista_espera;`
            )
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error listando lista de espera')
        }
    }
}