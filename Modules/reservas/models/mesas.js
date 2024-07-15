import mysql from 'mysql2/promise';
import 'dotenv/config';

const DBConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USERNAME || 'root',
  port: process.env.DB_PORT || 3306,
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || 'modulo_reservas',
};

const connection = await mysql.createConnection(DBConfig);

export class MesasModel {
  static async create({ input }) {
    const {
      ID_mesa,
      descripcion,
      numero_sillas,
      ubicacion,
    } = input;

    try {
      await connection.query(
        `INSERT INTO mesas (ID_mesa, descripcion, numero_sillas, ubicacion)
          VALUES (?, ?, ?, ?);`,
        [ID_mesa, descripcion, numero_sillas, ubicacion]
      );
    } catch (e) {
      console.log(e);
      throw new Error('Error creating mesa');
    }
  }

  static async modificar({ ID_mesa, modi }) {
    const {
      descripcion,
      numero_sillas,
      ubicacion,
    } = modi;

    try {
      await connection.query(
        'UPDATE inventario_mesas SET descripcion = ?, numero_sillas = ?, ubicacion = ? WHERE ID_mesa = ?',
        [descripcion, numero_sillas, ubicacion,ID_mesa]
      );
    } catch (e) {
      console.log(e);
      throw new Error('Error updating mesa');
    }
  }

  static async encontrar({ ID_mesa }) {
    try {
      const [rows] = await connection.query(
        `SELECT * FROM mesas WHERE ID_mesa = ?;`,
        [ID_mesa]
      );
      return rows[0];
    } catch (e) {
      console.log(e);
      throw new Error('Error finding mesa');
    }
  }

  static async eliminar({ ID_mesa }) {
    try {
      const response = await connection.query(
        'DELETE FROM mesas WHERE ID_mesa = ?',
        [ID_mesa]
      );
      if (result.affectedRows > 0) {
        return { message: `Mesa con id ${ID_mesa} eliminada correctamente.` }
      }
    } catch (e) {
      console.log(e);
      throw new Error('Error deleting mesa');
    }
  }
}
