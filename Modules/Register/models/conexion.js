import mysql from 'mysql2/promise';

async function createConnection() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "127.0.0.1", //lo mismo que localhost
            database: "bistrot",
            user: "root",
            password: "Samp1203*",
        });
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
    return connection;
}

const connection = await createConnection();

export default connection;
