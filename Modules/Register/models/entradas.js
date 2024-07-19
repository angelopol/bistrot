import connection from "../../RRHH/conexion.js";

export class EntradasModel {
  static async registrarEntrada({ cedula }) {
    try {
      await connection.query(
        `INSERT INTO entradas (cedula) VALUES (?);`,
        [cedula]
      );
    } catch (e) {
        
      console.error('Error registering entrada:', e);  // Imprimir el error completo
      throw new Error(`Error registering entrada: ${e.message}`);
    }
  }
}
