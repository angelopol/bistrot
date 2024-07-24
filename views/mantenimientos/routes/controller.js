import { db } from './models.js'

export const getMantenimientos = async (_req, res) => {
  const query = 'SELECT * FROM mantenimientos_realizar';
    db.query(query, ({results}) => res.send(results));
}
export const getMantenimientoID = async (req, res) => {
  const query = 'SELECT * FROM mantenimientos_realizar WHERE id = ?';
  db.query(query, [req.params.id], ({results}) => {
    results 
    ? res.status(404).send('ID no existe') 
      : res.send(results);
    })
  }
export const postMantenimiento = async (req, res)=> {
  const query = 'INSERT INTO mantenimientos_realizar (descripcion_corta,responsable,fecha_inicio,fecha_final) VALUES (?,?,?,?)';
  const { mantenimiento, responsable, inicio, fin } = req.body;
  const data = [mantenimiento, responsable, inicio, fin];
  db.query(query, data, ({results}) => res.send(results));
}


export const getContactos = async (_req, res) => {
  const query = 'SELECT * FROM contactos';
  db.query(query, ({results}) => res.send(results));
}

export const getContactosID = async (req, res) => {
  const query = 'SELECT * FROM contactos WHERE id = ?';
  db.query(query, [req.params.id], ({results}) => {
        results 
        ? res.status(404).send('ID no existe') 
        : res.send(results);
      })
    }
    
export const postContactos = async (req, res)=> {
    const query = 'INSERT INTO contactos (nombre,servicio,telefono,correo) VALUES (?,?,?,?)';
    const { mantenimiento, responsable, inicio, fin } = req.body;
    const data = [mantenimiento, responsable, inicio, fin];
    db.query(query, data, ({results}) => res.send(results));
}

export const deleteMantenimiento = async (req, res)=>{
  const query = 'DELETE FROM mantenimientos_realizar WHERE id = ?';
  const { id } = req.params;
  db.query(query, [id], ({results}) => res.send(results));
}

export const deleteContactos = async (req, res)=> {
    const query = 'DELETE FROM contactos WHERE id = ?';
    const { id } = req.params;
    db.query(query, [id], ({results}) => res.send(results));
}
  const example = (req, res)=>{
    Conexion.query('DELETE FROM mantenimientos_realizar WHERE id = ?', [
        req.params.id
    ], function (error, results, fields) {
        res.send(results);
    });
  }