import connection from "../../RRHH/conexion.js";
export class EmpleadosModel {
  static async create({ input }) {
    const {
      nombre,
      clave_usuario,
      cedula
    } = input;
    //y asi vas agregando todas 
    try {
      await connection.query(
        `INSERT INTO empleados (nombre, clave_usuario, cedula)
          VALUES (?, ?);`,
        [nombre, clave_usuario, cedula]
      );
    } catch (e) {
      console.log(e);
      throw new Error('Error creating empleado');
    }
  }

  static async find({ nombre }) {
    const [rows] = await connection.query(
      `SELECT * FROM empleados WHERE nombre = ?;`,
      [nombre]
    );
    return rows[0];
  }

  static async unique({ nombre }) {
    const [rows] = await connection.query(
      `SELECT nombre FROM empleados WHERE nombre = ?;`,
      [nombre]
    );
    if (rows.length > 0) return false;
    return true;
  }

  static async delete({ id }) {
    try {
      await connection.query(
        `DELETE FROM empleados WHERE id = ?;`,
        [id]
      );
    } catch (e) {
      console.log(e);
      throw new Error('Error deleting empleado');
    }
  }

  static async update({ id, input }) {
    const {
      nombre,
      clave_usuario,
      // Agrega otros campos aquí y arriba
    } = input;

    try {
      await connection.query(
        `UPDATE empleados SET
          nombre = ?,
          clave_usuario = ?,
          -- Agrega otros campos aquí según sea necesario
          WHERE id = ?;`,
        [nombre, clave_usuario, id]
        // Agrega otros campos aquí y arriba
      );
    } catch (e) {
      console.log(e);
      throw new Error('Error updating empleado');
    }
  }
}
