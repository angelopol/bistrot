// Agregando la conexion a la base de datos
import mysql from 'mysql2/promise'
import 'dotenv/config'

const DBConfig = {
  host: '127.0.0.1' || process.env.DB_HOST,
  user: 'root' || process.env.DB_USERNAME,
  port: 3306 || process.env.DB_PORT,
  password: '' || process.env.DB_PASSWORD,
  database: 'bistrot' || process.env.DB_DATABASE,
}

const connection = await mysql.createConnection(DBConfig)

//Crud de la tabla de los productos de compra

export class InstrumentoModel{

    static async getAll ({ funciona }) {
        const [instrumentos] = await connection.query(
          'SELECT * FROM instrumento WHERE funciona = ?;',
          [funciona]
        )
        return instrumentos

    }

    static async getForId({id}) {
        const [instrumentos] = await connection.query(
          'SELECT * FROM instrumento WHERE id = ?;',
          [id]
        )
        return instrumentos
    }

    static async create({input}) {
        const {
            nombre,
            funciona,
        } = input
        try {
            await connection.query(
                "INSERT INTO instrumento (nombre, funciona) VALUES (?,?);", [nombre , funciona]
            )
            const [instrumento] = await connection.query("SELECT * FROM instrumento WHERE id = LAST_INSERT_ID()");
            return instrumento
        } catch (error) {
            console.error('Error al crear el instrumento:', error);
            throw error;
        }
        
    }

    static async delete({id}) {
        const connection = await mysql.createConnection(config);
        try {
            const query = "DELETE FROM instrumento WHERE id = ?";
            const [result] = await connection.query(query, [id]);

            if (result.affectedRows > 0) {
                return { message: `Instrumento con id ${id} eliminado correctamente.` };
            } else {
                throw new Error(`No se encontró ningún instrumento con id ${id}.`);
            }
        } catch (error) {
            console.error('Error al eliminar el instrumento:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

    static async update({id , input}) {
        const {
            nombre,
            funciona
        } = input;

        const connection = await mysql.createConnection(config);

        try {
            let updates = [];
            let values = [];

            if (nombre) {
                updates.push("nombre = ?");
                values.push(nombre);
            }
            if (funciona) {
                updates.push("funciona = ?");
                values.push(funciona);
            }

            // Comprobar si hay campos para actualizar
            if (updates.length == 0) {
                throw new Error("No se proporcionaron datos para actualizar.");
            }

            // Agregar el ID como último valor en el array de values
            values.push(id);

            // Consulta SQL para actualizar
            const query = `UPDATE instrumento SET ${updates.join(', ')} WHERE id = ?`;
            const [result] = await connection.query(query, values);
            
            
            if (result.affectedRows > 0) {
                // Consulta para obtener la comida actualizada
                const selectQuery = "SELECT * FROM instrumento WHERE id = ?";
                const [updatedInstrumento] = await connection.query(selectQuery, [id]);
                if (updatedInstrumento.length === 0) {
                    throw new Error(`No se encontró instrumento con id ${id} después de la actualización.`);
                }
                return updatedInstrumento[0];
            } else {
                return false
            }
        } catch (error) {
            console.error('Error al actualizar el instrumento:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }
}
