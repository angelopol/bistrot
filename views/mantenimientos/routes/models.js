import mysql from 'mysql'
import 'dotenv/config'

const DBConfig = {
    host: '127.0.0.1' || process.env.DB_HOST,
    user: 'root' || process.env.DB_USERNAME,
    port: 3306 || process.env.DB_PORT,
    password: 'root1234' || process.env.DB_PASSWORD,
    database: 'mantenimiento' || process.env.DB_DATABASE,
}

export const db = await mysql.createConnection(DBConfig)