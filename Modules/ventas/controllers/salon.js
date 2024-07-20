import {VentasModel} from '../models/ventas_salon.js';
import {validateSalon, validatePartialSalon} from '../schemas/salon.js';
import { logged } from "../../Login/middlewares/logged.js"

export class ControllerSalon {

    // SALON


    // obtener todo los registros de la tabla de salon
    getAll_s = async (req, res) => {
      if (logged(req, res, false, false)) return
        const registro_salon = await VentasModel.getAll_salon({})
        if (registro_salon) return res.json(registro_salon)
        res.status(404).json({ message: 'registros de salon not found' })
    }



    // obtiene un registro de la tabla de salon, por id
    getById_s = async (req, res) => {
      if (logged(req, res, false, false)) return
        const { id } = req.params
        const salon = await VentasModel.getForId_salon({ id })
        if (salon) return res.json(salon)
        res.status(404).json({ message: 'salon not found' })
    }

    

    // crea un registro de salon
    create_s = async (req, res) => {
      if (logged(req, res, false, false)) return
        const result = validateSalon(req.body)

        if (result.error){
        return res.status(400).json({error : JSON.parse(result.error.message)})
        }

        const new_registro_salon = await VentasModel.create_salon({ input: req.body })

        res.status(201).json(new_registro_salon)
    };
    


    // actualiza los registros de la tabla de salon por id
    update_s = async (req, res) => {
      if (logged(req, res, false, false)) return
        const result = validatePartialSalon(req.body)

        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updated_salon = await VentasModel.update_salon({ id, input: result.data })

        return res.json(updated_salon)
    }



    // elimina un registro de la tabla de salon, por id
    delete_s = async (req, res) => {
      if (logged(req, res, false, false)) return
        const { id } = req.params

        const result = await VentasModel.delete_salon({ id })

        if (result === false) {
        return res.status(404).json({ message: 'salon not found' })
        }

        return res.json({ message: 'salon deleted' })
    }

}




/*
async function initializeData() {
  try {
    // Datos para la tabla VentasSalon_caja
    await pool.query(`
      INSERT INTO submodulo_caja (turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos)
      VALUES 
      ('mañana', 5.75, '2023-06-30 08:00:00', '2023-06-30 18:00:00', 1000.00, 1500.00, 600.00, 100.00),
      ('tarde', 5.85, '2023-06-30 12:00:00', '2023-06-30 20:00:00', 1500.00, 1800.00, 500.00, 200.00)
    `);

    // Datos para la tabla VentasSalon_salon
    await pool.query(`
      INSERT INTO submodulo_salon (presupuesto, inicio_evento, final_evento, pago_inicial, pago_final)
      VALUES 
      (5000.00, '2023-07-01 10:00:00', '2023-07-01 22:00:00', 1000.00, 4000.00),
      (3000.00, '2023-07-02 14:00:00', '2023-07-02 20:00:00', 500.00, 2500.00)
    `);

    // Datos para la tabla VentasSalon_cliente
    await pool.query(`
      INSERT INTO submodulo_registro_cliente (nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico)
      VALUES 
      ('Empresa A', 'J-12345678-9', 'Calle 1, Ciudad', 'Activo', '1234567890', 'contacto@empresaa.com'),
      ('Cliente B', 'V-98765432-1', 'Calle 2, Ciudad', 'Activo', '0987654321', 'cliente_b@example.com')
    `);

    // Datos para la tabla VentasSalon_factura
    await pool.query(`
      INSERT INTO submodulo_factura (monto, iva, consumo)
      VALUES 
      (1500.00, 12.00, '{"items":[{"nombre":"Plato A","precio":500},{"nombre":"Plato B","precio":1000}]}'),
      (2500.00, 15.00, '{"items":[{"nombre":"Plato C","precio":1500},{"nombre":"Plato D","precio":1000}]}')
    `);

    console.log('Datos inicializados correctamente');
  } catch (error) {
    console.error('Error al inicializar datos:', error);
  } finally {
    pool.end();
  }
}
*/
//initializeData(); // esto es para inicializar datos abitrarios a las tablas