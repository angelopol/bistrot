import mysql from 'mysql2/promise'
import 'dotenv/config'

const DBConfig = {
  host: '127.0.0.1' || process.env.DB_HOST,
  user: 'root' || process.env.DB_USERNAME,
  port: 3306 || process.env.DB_PORT,
  password: '1234' || process.env.DB_PASSWORD,
  database: 'bistrot' || process.env.DB_DATABASE,
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
