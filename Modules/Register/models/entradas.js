import connection from "../../RRHH/conexion.js";
import { logged } from "../../Login/middlewares/logged.js";

export class EntradasModel {
  static async registrarEntrada(req, res, { cedula }) {
    if (logged(req, res, false, false)) return;
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
