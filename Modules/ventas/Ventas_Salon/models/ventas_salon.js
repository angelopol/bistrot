/*
const pool = require('./conexion');


class ModelsVentasSalon_caja {

  // Cajas
  static async getAll() {
    return await pool.query('SELECT * FROM submodulo_caja');
  }

  static async getById(id) {
    return await pool.query('SELECT * FROM submodulo_caja WHERE id_empleado = ?', [id]);
  }

  static async create(data) {
    const { turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos } = data;
    return await pool.query('INSERT INTO submodulo_caja (turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos]);
  }

  static async update(id, data) {
    const { turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos } = data;
    return await pool.query('UPDATE submodulo_caja SET turno_horario = ?, tasa_del_dia = ?, apertura = ?, cierra = ?, monto_inicial = ?, monto_final = ?, ingresos = ?, egresos = ? WHERE id_empleado = ?', [turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos, id]);
  }

  static async delete(id) {
    return await pool.query('DELETE FROM submodulo_caja WHERE id_empleado = ?', [id]);
  }

}


class ModelsVentasSalon_salon {

  // Salon
  static async getAll() {
    return await pool.query('SELECT * FROM submodulo_salon');
  }

  static async getById(id) {
    return await pool.query('SELECT * FROM submodulo_salon WHERE id = ?', [id]);
  }

  static async create(data) {
    const { presupuesto, plan_evento, inicio_evento, final_evento, pago_inicial, pago_final } = data;
    return await pool.query('INSERT INTO submodulo_salon (presupuesto, plan_evento, inicio_evento, final_evento, pago_inicial, pago_final) VALUES (?, ?, ?, ?, ?, ?)', [presupuesto, plan_evento, inicio_evento, final_evento, pago_inicial, pago_final]);
  }

  static async update(id, data) {
    const { presupuesto, plan_evento, inicio_evento, final_evento, pago_inicial, pago_final } = data;
    return await pool.query('UPDATE submodulo_salon SET presupuesto = ?, plan_evento = ?, inicio_evento = ?, final_evento = ?, pago_inicial = ?, pago_final = ? WHERE id = ?', [presupuesto, plan_evento, inicio_evento, final_evento, pago_inicial, pago_final, id]);
  }

  static async delete(id) {
    return await pool.query('DELETE FROM submodulo_salon WHERE id = ?', [id]);
  }

  }


class ModelsVentasSalon_cliente {

  // Cliente
  static async getAll() {
    return await pool.query('SELECT * FROM submodulo_registro_cliente');
  }

  static async getById(id) {
    return await pool.query('SELECT * FROM submodulo_registro_cliente WHERE id = ?', [id]);
  }

  static async create(data) {
    const { nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico } = data;
    return await pool.query('INSERT INTO submodulo_registro_cliente (nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico) VALUES (?, ?, ?, ?, ?, ?)', [nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico]);
  }

  static async update(id, data) {
    const { nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico } = data;
    return await pool.query('UPDATE submodulo_registro_cliente SET nombre_cliente_empresa = ?, rif_cedula = ?, direccion = ?, tipo_estado = ?, telefono = ?, correo_electronico = ? WHERE id = ?', [nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico, id]);
  }

  static async delete(id) {
    return await pool.query('DELETE FROM submodulo_registro_cliente WHERE id = ?', [id]);
  }

}

class ModelsVentasSalon_factura {

  // Factura
  static async getAll() {
    return await pool.query('SELECT * FROM submodulo_factura');
  }

  static async getById(id) {
    return await pool.query('SELECT * FROM submodulo_factura WHERE id_cliente = ?', [id]);
  }

  static async create(data) {
    const { id_cliente, monto, iva, consumo } = data;
    return await pool.query('INSERT INTO submodulo_factura (id_cliente, monto, iva, consumo) VALUES (?, ?, ?, ?)', [id_cliente, monto, iva, JSON.stringify(consumo)]);
  }

  static async update(id, data) {
    const { monto, iva, consumo } = data;
    return await pool.query('UPDATE submodulo_factura SET monto = ?, iva = ?, consumo = ? WHERE id_cliente = ?', [monto, iva, JSON.stringify(consumo), id]);
  }

  static async delete(id) {
    return await pool.query('DELETE FROM submodulo_factura WHERE id_cliente = ?', [id]);
  }
}

module.exports = ModelsVentasSalon_caja;
module.exports = ModelsVentasSalon_salon;
module.exports = ModelsVentasSalon_cliente;
module.exports = ModelsVentasSalon_factura;
*/