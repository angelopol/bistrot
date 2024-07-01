import pkg from 'mysql2';
const {mysql} = pkg;
import {promisify} from 'util';

const db = {
  host: '127.0.0.1',
  user: 'root',
  password: 'santiago',
  database: 'Ventas_Salon'
};

export const pool = () => {
  // Crear la conexión
  const connection = mysql.createConnection(db);

  // Conectar a la base de datos
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.stack);
      return;
    }

    console.log('Conexión establecida con la base de datos MySQL');
  });

  connection.query = promisify(connection.query);
}