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

  static async unique(cedula) {
    try {
        const [rows] = await connection.query(
            `SELECT nombre FROM empleados WHERE cedula = ?;`,
            [cedula]
        );

        // Si no se encontraron filas, el nombre es único
        if (rows.length !== 0) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error('Error checking uniqueness of empleado:', e);  // Imprimir el error completo
        throw new Error(`Error checking uniqueness of empleado: ${e.message}`);
    }
}


  static async delete(input) {
    const { id } = input
    try {
      await connection.query(
        `DELETE FROM empleados WHERE user = ?;`,
        [id]
      );
    } catch (e) {
      console.error('Error deleting empleado:', e);  // Imprimir el error completo
      throw new Error(`Error deleting empleado: ${e.message}`);
    }
  }

  static async update(input) {
    console.log(input)
    const formatDateForSubmission = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
    };
    const {
      nombre,
      apellido,
      cedula,
      user,
      cargo,
      salario,
      telefono,
      direccion,
      fecha_contratacion,
      fecha_culminacion
    } = input;

    try {
      await connection.query(
        `UPDATE empleados SET
          nombre = ?,
          apellido = ?,
          cedula = ?,
          puesto = ?,
          salario = ?,
          telefono = ?,
          direccion = ?,
          fecha_contratacion = ?,
          fecha_culminacion = ?
          WHERE user = ?;`,
        [nombre, apellido, cedula, cargo, salario, telefono, direccion, formatDateForSubmission(fecha_contratacion), formatDateForSubmission(fecha_culminacion), user]
      );
    } catch (e) {
      console.error('Error updating empleado:', e);  // Imprimir el error completo
      throw new Error(`Error updating empleado: ${e.message}`);
    }
    
  }
  //Solicitudes
  static async getSolicitudes() {
    try {
        const [rows] = await connection.query(
            `SELECT solicitudes.*, empleados.nombre FROM solicitudes
                left join empleados on solicitudes.ID_Empleado = empleados.ID`
        );
        return rows;
    } catch (e) {
        console.error('Error finding solicitudes:', e);  // Imprimir el error completo
        throw new Error(`Error finding solicitudes: ${e.message}`);
    }
}

  static async createSolicitud({ input }) {
    const {
      ID_Empleado,
      Fecha,
      Fecha_Registro,
      Cargo,
      Motivo,
      Modulo,
    } = input;

    try {
      await connection.query(
        `INSERT INTO solicitudes (ID_Empleado, Fecha_Registro, Fecha, motivo, Cargo, Modulo)
         VALUES (?, ?, ?, ?, ?);`,
        [ID_Empleado, Fecha_Registro, Fecha, Motivo, Cargo, Modulo]
      );
    } catch (e) {
      throw new Error(`Error creando solicitud: ${e.message}`);
    }
  }
  // Actualiza el estado de una solicitud
  static async updateEstado(ID, newEstado) {
    try {
        // Ejecuta la consulta SQL para actualizar el estado de la solicitud
        const [results] = await connection.query(
            `UPDATE solicitudes 
            SET estado = ? 
            WHERE ID = ?`,
            [newEstado, ID]
        );

        // Puedes manejar el resultado aquí si es necesario, por ejemplo, comprobando el número de filas afectadas
        if (results.affectedRows === 0) {
            throw new Error('No se encontró la solicitud para actualizar.');
        }
    } catch (e) {
        // Lanza un error si ocurre algún problema durante la actualización
        throw new Error(`Error actualizando el estado de la solicitud: ${e.message}`);
    }
  }


}