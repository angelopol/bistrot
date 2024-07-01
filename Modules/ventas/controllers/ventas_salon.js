const pool = require('../models/conexion');

//const {VentasSalon_caja, VentasSalon_salon, VentasSalon_cliente, VentasSalon_factura} = require('../models/ventas_salon');

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

//initializeData(); // esto es para inicializar datos abitrarios a las tablas


class ControllerVentasSalon {

  // Caja
  getAll_c = async (req, res) => {
    pool.query('SELECT * FROM submodulo_caja', (error, results) => {
      if (error) {
          res.status(500).json({ error });
      } else {
          res.status(200).json(results);
      }
    });
  }

  getById_c = async (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM submodulo_caja WHERE id_empleado = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado');
            }
        }
    });
  }

  
  create_c = async (req, res) => {
    const { turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos } = req.body;
    pool.query('INSERT INTO submodulo_caja (turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        } else {
            return res.status(201).send('Elemento creado correctamente');
        }
    });
  };
  

  update_c = async (req, res) => {
    const { id } = req.params;
    const { turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos } = req.body;
    pool.query('UPDATE submodulo_caja SET turno_horario = ?, tasa_del_dia = ?, apertura = ?, cierra = ?, monto_inicial = ?, monto_final = ?, ingresos = ?, egresos = ? WHERE id_empleado = ?', [turno_horario, tasa_del_dia, apertura, cierra, monto_inicial, monto_final, ingresos, egresos, id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).send('Elemento actualizado correctamente');
        }
    });
  }

  delete_c = async (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM submodulo_caja WHERE id_empleado = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(204).send('Elemento eliminado correctamente');
        }
    });
  }



  // Salon
  getAll_s = async (req, res) => {
    pool.query('SELECT * FROM submodulo_salon', (error, results) => {
      if (error) {
          res.status(500).json({ error });
      } else {
          res.status(200).json(results);
      }
    });
  }

  getById_s = async (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM submodulo_salon WHERE id_cliente = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado');
            }
        }
    });
  }

  
  create_s = async (req, res) => {
    const { presupuesto, inicio_evento, final_evento, pago_inicial, pago_final } = req.body;
    pool.query('INSERT INTO submodulo_salon (presupuesto, inicio_evento, final_evento, pago_inicial, pago_final) VALUES (?, ?, ?, ?, ?)', [presupuesto, inicio_evento, final_evento, pago_inicial, pago_final], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        } else {
            return res.status(201).send('Elemento creado correctamente');
        }
    });
  };
  

  update_s = async (req, res) => {
    const { id } = req.params;
    const { presupuesto, inicio_evento, final_evento, pago_inicial, pago_final } = req.body;
    pool.query('UPDATE submodulo_salon SET presupuesto = ?, inicio_evento = ?, final_evento = ?, pago_inicial = ?, pago_final = ? WHERE id_cliente = ?', [presupuesto, inicio_evento, final_evento, pago_inicial, pago_final, id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).send('Elemento actualizado correctamente');
        }
    });
  }

  delete_s = async (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM submodulo_salon WHERE id_cliente = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(204).send('Elemento eliminado correctamente');
        }
    });
  }



  // Cliente
  getAll_cl = async (req, res) => {
    pool.query('SELECT * FROM submodulo_registro_cliente', (error, results) => {
      if (error) {
          res.status(500).json({ error });
      } else {
          res.status(200).json(results);
      }
    });
  }

  getById_cl = async (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM submodulo_registro_cliente WHERE id_cliente = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado');
            }
        }
    });
  }

  
  create_cl = async (req, res) => {
    const { nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico } = req.body;
    pool.query('INSERT INTO submodulo_registro_cliente (nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico) VALUES (?, ?, ?, ?, ?, ?)', [nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        } else {
            return res.status(201).send('Elemento creado correctamente');
        }
    });
  };
  

  update_cl = async (req, res) => {
    const { id } = req.params;
    const { nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico } = req.body;
    pool.query('UPDATE submodulo_registro_cliente SET nombre_cliente_empresa = ?, rif_cedula = ?, direccion = ?, tipo_estado = ?, telefono = ?, correo_electronico = ? WHERE id_cliente = ?', [nombre_cliente_empresa, rif_cedula, direccion, tipo_estado, telefono, correo_electronico, id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).send('Elemento actualizado correctamente');
        }
    });
  }

  delete_cl = async (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM submodulo_registro_cliente WHERE id_cliente = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(204).send('Elemento eliminado correctamente');
        }
    });
  }



  // Factura
  getAll_f = async (req, res) => {
    pool.query('SELECT * FROM submodulo_factura', (error, results) => {
      if (error) {
          res.status(500).json({ error });
      } else {
          res.status(200).json(results);
      }
    });
  }

  getById_f = async (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM submodulo_factura WHERE id_cliente = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado');
            }
        }
    });
  }

  
  create_f = async (req, res) => {
    const { monto, iva, consumo } = req.body;
    pool.query('INSERT INTO submodulo_factura (monto, iva, consumo) VALUES (?, ?, ?)', [monto, iva, JSON.stringify(consumo)], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        } else {
            return res.status(201).send('Elemento creado correctamente');
        }
    });
  };
  

  update_f = async (req, res) => {
    const { id } = req.params;
    const { monto, iva, consumo } = req.body;
    pool.query('UPDATE submodulo_factura SET monto = ?, iva = ?, consumo = ? WHERE id_cliente = ?', [monto, iva, consumo, id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).send('Elemento actualizado correctamente');
        }
    });
  }

  delete_f = async (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM submodulo_factura WHERE id_cliente = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(204).send('Elemento eliminado correctamente');
        }
    });
  }

}

module.exports = ControllerVentasSalon;
