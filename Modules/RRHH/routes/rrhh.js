import { Router } from 'express';
import { RecursosHumanos } from '../controllers/recursoHumano.js';
import connection from '../conexion.js';

export const createRRHHRouter = () => {
  const RRHHRouter = Router();
  const controlador = new RecursosHumanos();

  // Para los HTML
  RRHHRouter.get('/rrhh', controlador.create);
  RRHHRouter.get('/horarios', controlador.horarios);
  RRHHRouter.get('/form', controlador.form);
  RRHHRouter.get('/entradas', controlador.entradas);
  RRHHRouter.get('/ausensias', controlador.ausensias);
  RRHHRouter.get('/informe', controlador.informe);
  // Para los estilos
  RRHHRouter.get('/assets/style.css', controlador.GetStyle);
  RRHHRouter.get('/assets/horarios.css', controlador.GetStyle);
  RRHHRouter.get('/assets/header.css', controlador.GetStyle);
  RRHHRouter.get('/assets/form.css', controlador.GetStyle);
  RRHHRouter.get('/assets/entradas.css', controlador.GetStyle);
  RRHHRouter.get('/assets/ausensias.css', controlador.GetStyle);

  // Para los JS
  RRHHRouter.get('/assets/formulario', controlador.formulario);

  // Para la consulta de empleados
  // Esta funcion trae todos los datos de la base de datos
  RRHHRouter.get('/empleados', async (req, res) => {
    try {
      const [results, fields] = await connection.query('SELECT id, nombre, apellido, cedula, puesto, fecha_contratacion, telefono, direccion FROM empleados');
      res.json(results);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  RRHHRouter.get('/entrada', async (req, res) => {
    try {
      const [results, fields] = await connection.query('SELECT id, cedula, hora_entrada FROM entradas');
      res.json(results);
    } catch (err) {
      res.status(500).send(err)
    }
  });

  // Ruta para registrar empleados
  RRHHRouter.post('/empleados', async (req, res) => {
    const {
      nombre,
      apellido,
      puesto,
      fecha_contratacion,
      telefono,
      direccion,
      salario,
      fecha_culminacion,
      horas,
      cedula,
      codigo_empleado,
      clave_usuario
    } = req.body;

    if (
      !nombre ||
      !apellido ||
      !puesto ||
      !fecha_contratacion ||
      !telefono ||
      !direccion ||
      !salario ||
      !horas ||
      !cedula ||
      !codigo_empleado ||
      !clave_usuario
    ) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
      const [result] = await connection.query(
        'INSERT INTO empleados (nombre, apellido, puesto, fecha_contratacion, telefono, direccion, salario, fecha_culminacion, horas, cedula, codigo_empleado, clave_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          nombre,
          apellido,
          puesto,
          fecha_contratacion,
          telefono,
          direccion,
          salario,
          fecha_culminacion,
          horas,
          cedula,
          codigo_empleado,
          clave_usuario
        ]
      );
      res.status(201).json({ message: 'Empleado registrado exitosamente', empleadoId: result.insertId });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  return RRHHRouter;
};
