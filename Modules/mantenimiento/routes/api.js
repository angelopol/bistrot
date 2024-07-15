import mysql from 'mysql2/promise'
import 'dotenv/config'

const DBConfig = {
    host: '127.0.0.1' || process.env.DB_HOST,
    user: 'root' || process.env.DB_USERNAME,
    port: 3306 || process.env.DB_PORT,
    password: '' || process.env.DB_PASSWORD,
    database: 'bistrot' || process.env.DB_DATABASE,
  }
  
const Conexion = await mysql.createConnection(DBConfig)
  
export const createMantenimientoApi = (MantenimientoRouter) => {
    MantenimientoRouter.get('/api/mantenimientos_realizar', (req, res)=>{
        Conexion.query('SELECT * FROM mantenimientos_realizar', function (error, results, fields) {
            res.send(results);
        });
    });
  
    MantenimientoRouter.get('/api/mantenimientos_realizar/:id', (req, res)=>{
        Conexion.query('SELECT * FROM mantenimientos_realizar WHERE id = ?', [req.params.id],  function (error, results, fields) {
            if (results.length == 0) {
                res.status(404).send('ID no existe');
            } else {
                res.send(results);
            }
        });      
    });
  
    MantenimientoRouter.post('/api/mantenimientos_realizar', async (req, res)=>{
        Conexion.query('INSERT INTO mantenimientos_realizar (descripcion_corta,responsable,fecha_inicio,fecha_final) VALUES (?,?,?,?)', [
            req.body.mantenimiento,
            req.body.responsable,
            req.body.fecha_inicio,
            req.body.fecha_fin,
        ], function (error, results, fields) {
            res.send(results);
        });
    });
  
    MantenimientoRouter.delete('/api/mantenimientos_realizar/:id', (req, res)=>{
        Conexion.query('DELETE FROM mantenimientos_realizar WHERE id = ?', [
            req.params.id
        ], function (error, results, fields) {
            res.send(results);
        });   
    });
  
    MantenimientoRouter.get('/api/contactos', (req, res)=>{
        Conexion.query('SELECT * FROM contactos', function (error, results, fields) {
            res.send(results);
        });
    });
  
    MantenimientoRouter.get('/api/contactos/:id', (req, res)=>{
        Conexion.query('SELECT * FROM contactos WHERE id = ?', [req.params.id],  function (error, results, fields) {
            if (results.length == 0) {
                res.status(404).send('ID no existe');
            } else {
                res.send(results);
            }
        });      
    });
  
    MantenimientoRouter.post('/api/contactos', (req, res)=>{
        Conexion.query('INSERT INTO contactos (nombre,servicio,telefono,correo) VALUES (?,?,?,?)', [
            req.body.nombre,
            req.body.servicio,
            req.body.telefono,
            req.body.correo,
        ], function (error, results, fields) {
            res.send(results);
        });   
    });
  
    MantenimientoRouter.delete('/api/contactos/:id', (req, res)=>{
        Conexion.query('DELETE FROM contactos WHERE id = ?', [
            req.params.id
        ], function (error, results, fields) {
            res.send(results);
        });   
    });
  
    return MantenimientoRouter;
}