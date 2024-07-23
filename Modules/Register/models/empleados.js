import connection from "../../RRHH/conexion.js";

export class EmpleadosModel {
  static async create({ input }) {
    const {
      nombre,
      apellido,
      clave_usuario,
      cedula,
      codigo_empleado,
      puesto,
      salario,
      telefono,
      direccion,
      fecha_contratacion,
      fecha_culminacion
    } = input;
    console.log('Input:', JSON.stringify(input));  // Depuración de entrada

    try {
      await connection.query(
        `INSERT INTO empleados (nombre, apellido, password, cedula, user, puesto, salario, telefono, direccion, fecha_contratacion, fecha_culminacion)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [nombre, apellido, clave_usuario, cedula, codigo_empleado, puesto, salario, telefono, direccion, fecha_contratacion, fecha_culminacion]
      );
    } catch (e) {
      console.error('Error creating empleado:', e);  // Imprimir el error completo
      throw new Error(`Error creating empleado: ${e.message}`);
    }
  }

  static async find({ nombre }) {
    try {
      const [rows] = await connection.query(
        `SELECT * FROM empleados WHERE nombre = ?;`,
        [nombre]
      );
      return rows[0];
    } catch (e) {
      console.error('Error finding empleado:', e);  // Imprimir el error completo
      throw new Error(`Error finding empleado: ${e.message}`);
    }
  }

  static async findUser ({ user }) {
    const [rows] = await connection.query(
      `SELECT * FROM empleados WHERE user = ?;`,
      [user]
    )
    return rows[0]
  }

  static async unique({ nombre }) {
    try {
      const [rows] = await connection.query(
        `SELECT nombre FROM empleados WHERE nombre = ?;`,
        [nombre]
      );
      return rows.length === 0;
    } catch (e) {
      console.error('Error checking uniqueness of empleado:', e);  // Imprimir el error completo
      throw new Error(`Error checking uniqueness of empleado: ${e.message}`);
    }
  }

  static async delete({ id }) {
    try {
      await connection.query(
        `DELETE FROM empleados WHERE id = ?;`,
        [id]
      );
    } catch (e) {
      console.error('Error deleting empleado:', e);  // Imprimir el error completo
      throw new Error(`Error deleting empleado: ${e.message}`);
    }
  }

  static async update({ id, input }) {
    const {
      nombre,
      apellido,
      clave_usuario,
      cedula,
      codigo_empleado,
      puesto,
      salario,
      telefono,
      direccion,
      fecha_contratacion,
      fecha_culminacion
    } = input;
    console.log('Update Input:', JSON.stringify(input));  // Depuración de entrada

    try {
      await connection.query(
        `UPDATE empleados SET
          nombre = ?,
          apellido = ?,
          password = ?,
          cedula = ?,
          user = ?,
          puesto = ?,
          salario = ?,
          telefono = ?,
          direccion = ?,
          fecha_contratacion = ?,
          fecha_culminacion = ?
          WHERE id = ?;`,
        [nombre, apellido, clave_usuario, cedula, codigo_empleado, puesto, salario, telefono, direccion, fecha_contratacion, fecha_culminacion, id]
      );
    } catch (e) {
      console.error('Error updating empleado:', e);  // Imprimir el error completo
      throw new Error(`Error updating empleado: ${e.message}`);
    }
  }
}