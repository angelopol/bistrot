import mysql from 'mysql2/promise';
import 'dotenv/config'
//import {promisify} from 'util';

const db = {
    host: 'localhost' || process.env.DB_HOST,
    user: 'root' || process.env.DB_USER,
    port: 3306 || process.env.DB_PORT,
    password: '1234' || process.env.DB_PASSWORD,
    database: 'bistrot' || process.env.DB_DATABASE, 
};


// Crear la conexión
const connection = await mysql.createConnection(db)
// try {
//     const connection = await mysql.createConnection(db);
//     // Realizar operaciones con la conexión
// } catch (error) {
//     console.error('Error:', error);
// }

export class VentasModel {


    // CAJA
    

    static async getAll_caja() {
        try {
            const [registro_ventas] = await connection.query("SELECT * FROM submodulo_caja");
            return registro_ventas;
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            throw error; // O maneja el error como prefieras
        }
    }



    static async getForId_caja({id}) {
        try {
            const [ventas] = await connection.query(
                "SELECT * FROM submodulo_caja WHERE id_empleado = ?;" , [id]
            )
            return ventas
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
                "INSERT INTO submodulo_caja (turno_horario, tasa_del_dia, apertura, cierre, monto_inicial, monto_final, ingresos, egresos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [turno_horario, tasa_del_dia, apertura, cierre, monto_inicial, monto_final, ingresos, egresos]
            )
        } catch (error) {
            throw new Error("Error creando una venta")
        }
        
    }



    static async update_caja({id , input}) {
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
            const query = `UPDATE submodulo_caja SET ${updates.join(', ')} WHERE id_empleado = ?`;
            const [result] = await connection.query(query, values);
            
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
            throw error;
        } 
    }



    static async delete_caja({id}) {
        try {
            // Consulta SQL para eliminar la venta por ID
            const query = "DELETE FROM submodulo_caja WHERE id_empleado = ?";
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



    // SALON


    static async getAll_salon({}) {
        try {
        const [registro_salon] = await connection.query("SELECT * FROM submodulo_salon")
            return registro_salon
        } catch {
            throw new Error("Error obteniendo el registro de los salones")
        }
    }



    static async getForId_salon({id}) {
        try {
            const [salon] = await connection.query(
                "SELECT * FROM submodulo_salon WHERE id_cliente = ?;" , [id]
            )
            return salon
        } catch {
            throw new Error("Error obteniendo el registro del salon")
        }
    }



    static async create_salon({input}) {
        const {
            presupuesto, inicio_evento, final_evento, pago_inicial, pago_final
        } = input

        try {
            await connection.query(
                "INSERT INTO submodulo_salon (presupuesto, inicio_evento, final_evento, pago_inicial, pago_final) VALUES (?, ?, ?, ?, ?)", [presupuesto, inicio_evento, final_evento, pago_inicial, pago_final]
            )
        } catch (error) {
            throw new Error("Error creando un registro de salon")
        }
        
    }



    static async update_salon({id , input}) {
        const {
            presupuesto, inicio_evento, final_evento, pago_inicial, pago_final
        } = input;

        try {
            // Construir la parte de la consulta SQL para actualizar
            let updates = [];
            let values = [];

            if (presupuesto) {
                updates.push("presupuesto = ?");
                values.push(presupuesto);
            }
            if (inicio_evento) {
                updates.push("inicio_evento = ?");
                values.push(inicio_evento);
            }
            if (final_evento) {
                updates.push("final_evento = ?");
                values.push(final_evento);
            }
            if (pago_inicial) {
                updates.push("pago_inicial = ?");
                values.push(pago_inicial);
            }
            if (pago_final) {
                updates.push("pago_final = ?");
                values.push(pago_final);
            }

            // Comprobar si hay campos para actualizar
            if (updates.length == 0) {
                throw new Error("No se proporcionaron datos para actualizar.");
            }

            // Agregar el ID como último valor en el array de values
            values.push(id);

            // Consulta SQL para actualizar
            const query = `UPDATE submodulo_salon SET ${updates.join(', ')} WHERE id_cliente = ?`;
            const [result] = await connection.query(query, values);
            
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
            throw error;
        } 
    }



    static async delete_salon({id}) {
        try {
            // Consulta SQL para eliminar la venta por ID
            const query = "DELETE FROM submodulo_salon WHERE id_cliente = ?";
            const [result] = await connection.query(query, [id]);

            if (result.affectedRows > 0) {
                return { message: `salon con id ${id} eliminado correctamente.` };
            } else {
                throw new Error(`No se encontró ningun salon con id ${id}.`);
            }
        } catch (error) {
            console.error('Error al eliminar el registro del salon:', error);
            throw error;
        }
    }


    // CLIENTE

    static async getAll_cliente({}) {
        try {
        const [registro_clientes] = await connection.query("SELECT * FROM submodulo_registro_cliente")
            return registro_clientes
        } catch {
            throw new Error("Error obteniendo el registro de los clientes")
        }
    }



    static async getForId_cliente({id}) {
        try {
            const [cliente] = await connection.query(
                "SELECT * FROM submodulo_registro_cliente WHERE id_cliente = ?;" , [id]
            )
            return cliente
        } catch {
            throw new Error("Error obteniendo el registro del cliente")
        }
    }



    static async create_cliente({input}) {
        const {
            nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico
        } = input

        console.log(input)

        
            await connection.query(
                "INSERT INTO submodulo_registro_cliente (nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico) VALUES (?, ?, ?, ?, ?, ?)", [nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico]
            )
        
        
    }



    static async update_cliente({id , input}) {
        const {
            nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico
        } = input;

        try {
            // Construir la parte de la consulta SQL para actualizar
            let updates = [];
            let values = [];

            if (nombre_cliente_empresa) {
                updates.push("nombre_cliente_empresa = ?");
                values.push(nombre_cliente_empresa);
            }
            if (rif_cedula) {
                updates.push("rif_cedula = ?");
                values.push(rif_cedula);
            }
            if (direccion) {
                updates.push("direccion = ?");
                values.push(direccion);
            }
            if (tipo_estado) {
                updates.push("tipo_estado = ?");
                values.push(tipo_estado);
            }
            if (telefono) {
                updates.push("telefono = ?");
                values.push(telefono);
            }
            if (correo_electronico) {
                updates.push("correo_electronico = ?");
                values.push(correo_electronico);
            }

            // Comprobar si hay campos para actualizar
            if (updates.length == 0) {
                throw new Error("No se proporcionaron datos para actualizar.");
            }

            // Agregar el ID como último valor en el array de values
            values.push(id);

            // Consulta SQL para actualizar
            const query = `UPDATE submodulo_registro_cliente SET ${updates.join(', ')} WHERE id_cliente = ?`;
            const [result] = await connection.query(query, values);
            
        } catch (error) {
            console.error('Error al actualizar el registro del cliente:', error);
            throw error;
        } 
    }



    static async delete_cliente({id}) {
        try {
            // Consulta SQL para eliminar el registro de un cliente por ID
            const query = "DELETE FROM submodulo_registro_cliente WHERE id_cliente = ?";
            const [result] = await connection.query(query, [id]);

            if (result.affectedRows > 0) {
                return { message: `cliente con id ${id} eliminado correctamente.` };
            } else {
                throw new Error(`No se encontró ningun cliente con id ${id}.`);
            }
        } catch (error) {
            console.error('Error al eliminar el registro del cliente:', error);
            throw error;
        }
    }



    // FACTURA

    static async getAll_factura({}) {
        try {
        const [registro_facturas] = await connection.query("SELECT * FROM submodulo_factura")
            return registro_facturas
        } catch {
            throw new Error("Error obteniendo el registro de las facturas")
        }
    }



    static async getForId_factura({id}) {

        try {
            const [factura] = await connection.query(
                "SELECT * FROM submodulo_factura WHERE id_cliente = ?;" , [id]
            )
            return factura
        } catch {
            throw new Error("Error obteniendo el registro da la factura")
        }
    }



    static async create_factura({input}) {

        const {
            monto, iva, consumo, status_pedido, mesa, zona
        } = input

        try {
            await connection.query(
                "INSERT INTO submodulo_factura (monto, iva, consumo,status_pedido, mesa, zona) VALUES (?, ?, ?, ?, ?, ?)", [monto, iva, consumo, status_pedido, mesa, zona]
            )
            console.log('SE HA CONECTADO A LA BASE DE DATOS!!!')
        } catch (error) {
            throw new Error("Error creando un registro de factura")
        }
        
    }



    static async update_factura({id , input}) {
        const {
            monto, iva, consumo, status_pedido, mesa, zona
        } = input;

        try {
            // Construir la parte de la consulta SQL para actualizar
            let updates = [];
            let values = [];

            if (monto) {
                updates.push("monto = ?");
                values.push(monto);
            }
            if (iva) {
                updates.push("iva = ?");
                values.push(iva);
            }
            if (consumo) {
                updates.push("consumo = ?");
                values.push(consumo);
            }
            if (status_pedido) {
                updates.push("status_pedido = ?");
                values.push(status_pedido);
            }
            if (mesa) {
                updates.push("mesa = ?");
                values.push(mesa);
            }
            if (zona) {
                updates.push("zona = ?");
                values.push(zona);
            }

            // Comprobar si hay campos para actualizar
            if (updates.length == 0) {
                throw new Error("No se proporcionaron datos para actualizar.");
            }

            // Agregar el ID como último valor en el array de values
            values.push(id);

            // Consulta SQL para actualizar
            const query = `UPDATE submodulo_factura SET ${updates.join(', ')} WHERE id_cliente = ?`;
            const [result] = await connection.query(query, values);
            
        } catch (error) {
            console.error('Error al actualizar el registro de la factura:', error);
            throw error;
        } 
    }



    static async delete_factura({id}) {
        try {
            // Consulta SQL para eliminar el registro de un cliente por ID
            const query = "DELETE FROM submodulo_factura WHERE id_cliente = ?";
            const [result] = await connection.query(query, [id]);

            if (result.affectedRows > 0) {
                return { message: `factura con id ${id} eliminado correctamente.` };
            } else {
                throw new Error(`No se encontró ninguna factura con id ${id}.`);
            }
        } catch (error) {
            console.error('Error al eliminar el registro de la factura:', error);
            throw error;
        }
    }

}