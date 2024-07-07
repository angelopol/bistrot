import pkg from 'mysql2';
const {mysql} = pkg;
import {promisify} from 'util';

const db = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'Ventas_Salon'
};


// Crear la conexión
const connection = mysql.createConnection(db);

/*
// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }

  console.log('Conexión establecida con la base de datos MySQL');
});

connection.query = promisify(connection.query);
*/

export class VentasModel {


    // CAJA
    static async getAll_caja({}) {
        try {
        const [registro_ventas] = await connection.query("SELECT * FROM submodulo_caja")
            return registro_ventas
        } catch {
            throw new Error("Error obteniendo el registro de las ventas")
        }
    }

    static async getForId_caja({id}) {
        try {
            const [ventas] = await connection.query(
                "SELECT * FROM submodulo_caja WHERE id = ?;" , [id]
            )
            return comidas
        } catch {
            throw new Error("Error obteniendo la venta")
        }
    }

    static async create_caja({input}) {
        const {
            turno_horario, tasa_del_dia, apertura, cierre, monto_inicial, monto_final, ingresos, egresos
        } = input

        try {
            await connection.query(
                "INSERT INTO submodulo_caja (turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [turno_horario, tasa_del_dia, apertura, cierre, monto_inicial, monto_final, ingresos, egresos]
            )
        } catch (error) {
            throw new Error("Error creando una venta")
        }
        
    }

    static async update({id , input}) {
        const {
            turno_horario, tasa_del_dia, apertura, cierre, monto_inicial, monto_final, ingresos, egresos
        } = input;

        try {
            // Construir la parte de la consulta SQL para actualizar
            let updates = [];
            let values = [];

            if (turno_horario) {
                updates.push("turno_horario = ?");
                values.push(turno_horario);
            }
            if (tasa_del_dia) {
                updates.push("tasa_del_dia = ?");
                values.push(tasa_del_dia);
            }
            if (apertura) {
                updates.push("apertura = ?");
                values.push(apertura);
            }
            if (cierre) {
                updates.push("cierre = ?");
                values.push(cierre);
            }
            if (monto_inicial) {
                updates.push("monto_inicial = ?");
                values.push(monto_inicial);
            }
            if (monto_final) {
                updates.push("monto_final = ?");
                values.push(monto_final);
            }
            if (ingresos) {
                updates.push("ingresos = ?");
                values.push(ingresos);
            }
            if (egresos) {
                updates.push("egresos = ?");
                values.push(egresos);
            }

            // Comprobar si hay campos para actualizar
            if (updates.length == 0) {
                throw new Error("No se proporcionaron datos para actualizar.");
            }

            // Agregar el ID como último valor en el array de values
            values.push(id);

            // Consulta SQL para actualizar
            const query = `UPDATE submodulo_caja SET ${updates.join(', ')} WHERE id = ?`;
            const [result] = await connection.query(query, values);
            
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }


    static async delete_caja({id}) {
        try {
            // Consulta SQL para eliminar la venta por ID
            const query = "DELETE FROM submodulo_caja WHERE id = ?";
            const [result] = await connection.query(query, [id]);

            if (result.affectedRows > 0) {
                return { message: `venta con id ${id} eliminada correctamente.` };
            } else {
                throw new Error(`No se encontró ninguna venta con id ${id}.`);
            }
        } catch (error) {
            console.error('Error al eliminar la venta:', error);
            throw error;
        }
    }

}