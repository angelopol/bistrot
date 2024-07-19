
import mysql from 'mysql2/promise'
import 'dotenv/config'

const DBConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USERNAME || 'root',
  port: process.env.DB_PORT || 3306,
  password: process.env.DB_PASSWORD || 'Samp1203*',
  database: process.env.DB_DATABASE || 'bistrot',
}

const connection = await mysql.createConnection(DBConfig)

export class EmpleadosModel {
  static async create ({ input }) {
    const {
      user,
      password,
    } = input

    try {
      await connection.query(
        `INSERT INTO empleados (user, password)
          VALUES (?, ?);`,
        [user, password]
      )
    } catch (e) {
      console.log(e)
      throw new Error('Error creating empleado')
    }
  }

  static async find ({ user }) {
    const [rows] = await connection.query(
      `SELECT * FROM empleados WHERE user = ?;`,
      [user]
    )
    return rows[0]
  }

  static async unique ({ user }) {
    const [rows] = await connection.query(
      `SELECT user FROM empleados WHERE user = ?;`,
      [user]
    )
    if (rows.length > 0) return false
    return true
  }

  static async delete ({ id }) {
  }

  static async update ({ id, input }) {
  }
}
