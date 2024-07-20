import mysql from 'mysql2/promise';
import 'dotenv/config'

async function createConnection() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            port: process.env.DB_PORT || 3306,
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'inventario',
        });
        console.log('Connected to the database.');
    } catch (error) { 
        console.error('Error connecting to the database:', error);
    }
    return connection;
}

const connection = await createConnection();

export default connection;