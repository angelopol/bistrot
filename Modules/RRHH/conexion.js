import mysql from 'mysql2/promise';
import 'dotenv/config'

async function createConnection() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: 'localhost' || process.env.DB_HOST,
            user: 'root' || process.env.DB_USERNAME,
            port: 3308 || process.env.DB_PORT,
            password: '' || process.env.DB_PASSWORD,
            database: 'rrhh' || process.env.DB_DATABASE,
        });
        console.log('Connected to the database.');
    } catch (error) { 
        console.error('Error connecting to the database:', error);
    }
    return connection;
}

const connection = await createConnection();

export default connection;