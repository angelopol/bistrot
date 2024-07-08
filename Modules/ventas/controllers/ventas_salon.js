import {validateCaja, validatePartialCaja} from '../schemas/caja.js';
import {validateCliente, validatePartialCliente} from '../schemas/cliente.js';
import {validateFactura, validatePartialFactura} from '../schemas/factura.js';
import {validateSalon, validatePartialSalon} from '../schemas/salon.js';

import {VentasModel} from '../models/ventas_salon';

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


export class ControllerVentasSalon {


  // CAJA

  // obtener todo los registros de la tabla de caja
  getAll_c = async (req, res) => {

    const registro_ventas = await VentasModel.getAll_caja({})
    if (registro_ventas) return res.json(registro_ventas)
      res.status(404).json({ message: 'registro de ventas not found' })
  }


  // obtiene un registro especifico de la caja, buscandolo por id
  getById_c = async (req, res) => {
    const { id } = req.params
    const ventas = await VentasModel.getForId_caja({ id })
    if (ventas) return res.json(ventas)
    res.status(404).json({ message: 'ventas not found' })
  }

  

  // crea un registro de caja
  create_c = async (req, res) => {
    const result = validateCaja(req.body)

    if (result.error){
      return res.status(400).json({error : JSON.parse(result.error.message)})
    }

    const new_Venta = await VentasModel.create_caja({ input: result.data })

    res.status(201).json(new_Venta)
  };
  


  // actualiza el registro de caja, buscandolo por id
  update_c = async (req, res) => {
    const result = validatePartialCaja(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updated_Ventas = await VentasModel.update_caja({ id, input: result.data })

    return res.json(updated_Ventas)
  }



  // elimina el registro de caja, buscandolo por id
  delete_c = async (req, res) => {
    const { id } = req.params

    const result = await VentasModel.delete_caja({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Venta not found' })
    }

    return res.json({ message: 'Venta deleted' })
  }


  // SALON


  // obtener todo los registros de la tabla de salon
  getAll_s = async (req, res) => {
    const registro_salon = await VentasModel.getAll_salon({})
    if (registro_salon) return res.json(registro_salon)
      res.status(404).json({ message: 'registros de salon not found' })
  }



  // obtiene un registro de la tabla de salon, por id
  getById_s = async (req, res) => {
    const { id } = req.params
    const salon = await VentasModel.getForId_salon({ id })
    if (salon) return res.json(salon)
    res.status(404).json({ message: 'salon not found' })
  }

  

  // crea un registro de salon
  create_s = async (req, res) => {
    const result = validateSalon(req.body)

    if (result.error){
      return res.status(400).json({error : JSON.parse(result.error.message)})
    }

    const new_registro_salon = await VentasModel.create_salon({ input: result.data })

    res.status(201).json(new_registro_salon)
  };
  


  // actualiza los registros de la tabla de salon por id
  update_s = async (req, res) => {
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
    const { id } = req.params

    const result = await VentasModel.delete_salon({ id })

    if (result === false) {
      return res.status(404).json({ message: 'salon not found' })
    }

    return res.json({ message: 'salon deleted' })
  }



  // CLIENTE


  // obtener todo los registros de la tabla de cliente
  getAll_cl = async (req, res) => {
    const registros_clientes = await VentasModel.getAll_cliente({})
    if (registros_clientes) return res.json(registros_clientes)
      res.status(404).json({ message: 'registros de los clientes  not found' })
  }



  // obtener un registro de la tabla de cliente por id
  getById_cl = async (req, res) => {
    const { id } = req.params
    const registro_cliente = await VentasModel.getForId_cliente({ id })
    if (registro_cliente) return res.json(registro_cliente)
    res.status(404).json({ message: 'cliente not found' })
  }


  
  // crearun registro la tabla de cliente
  create_cl = async (req, res) => {
    const result = validateCliente(req.body)

    if (result.error){
      return res.status(400).json({error : JSON.parse(result.error.message)})
    }

    const new_registro_cliente = await VentasModel.create_cliente({ input: result.data })

    res.status(201).json(new_registro_cliente)
  };
  


  // actualiza un registro de la tabla cliente por id
  update_cl = async (req, res) => {
    const result = validatePartialCliente(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updated_cliente = await VentasModel.update_cliente({ id, input: result.data })

    return res.json(updated_cliente)
  }



  // elimina un registro de la tabla de cliente por id
  delete_cl = async (req, res) => {
    const { id } = req.params

    const result = await VentasModel.delete_cliente({ id })

    if (result === false) {
      return res.status(404).json({ message: 'cliente not found' })
    }

    return res.json({ message: 'cliente deleted' })
  }



  // FACTURA



  // obtener todo los registros de la tabla de factura
  getAll_f = async (req, res) => {
    const registros_facturas = await VentasModel.getAll_factura({})
    if (registros_facturas) return res.json(registros_facturas)
      res.status(404).json({ message: 'registros de los facturas  not found' })
  }



  // obtener un registro de la tabla de factura por id
  getById_f = async (req, res) => {
    const { id } = req.params
    const registro_factura = await VentasModel.getForId_factura({ id })
    if (registro_factura) return res.json(registro_factura)
    res.status(404).json({ message: 'registro de factura not found' })
  }

  

  // crea un registros de la tabla de factura
  create_f = async (req, res) => {
    const result = validateFactura(req.body)

    if (result.error){
      return res.status(400).json({error : JSON.parse(result.error.message)})
    }

    const new_registro_factura = await VentasModel.create_factura({ input: result.data })

    res.status(201).json(new_registro_factura)
  };
  


  // actualiza un registro de la tabla de factura por id
  update_f = async (req, res) => {
    const result = validatePartialFactura(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updated_factura = await VentasModel.update_factura({ id, input: result.data })

    return res.json(updated_factura)
  }



  // elimina un registro de la tabla de factura por id
  delete_f = async (req, res) => {
    const { id } = req.params

    const result = await VentasModel.delete_factura({ id })

    if (result === false) {
      return res.status(404).json({ message: 'factura not found' })
    }

    return res.json({ message: 'factura deleted' })
  }

}