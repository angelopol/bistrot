import { db } from './models.js'

export const getMantenimientos = async (_req, res) => {
  const query = 'SELECT * FROM mantenimientos_realizar';
    db.query(query, (error, results, fields) => {
      console.log({results})
      res.send(results)
    });
}
export const getMantenimientoID = async (req, res) => {
  const query = 'SELECT * FROM mantenimientos_realizar WHERE id_mantenimiento = ?';
  db.query(query, [req.params.id], (error, results, fields) => {
    if(!results) {
      res.status(404).send('ID no existe')
      return;
    }
    res.send(results)
    })
  }
export const postMantenimiento = async (req, res)=> {
  const query = 'INSERT INTO mantenimientos_realizar (descripcion_corta,responsable,fecha_inicio,fecha_final) VALUES (?,?,?,?)';
  const { descripcion, responsable, inicio_mantenimiento, final_mantenimiento } = req.body;
  const data = [descripcion, responsable, inicio_mantenimiento, final_mantenimiento];
  db.query(query, data, (error, results, fields) => {
    res.send(results);
  });
}


export const getContactos = async (_req, res) => {
  const query = 'SELECT * FROM contactos';
  db.query(query, (error, results, fields) => res.send(results));
}

export const getContactoID = async (req, res) => {
  const query = 'SELECT * FROM contactos WHERE id = ?';
  db.query(query, [req.params.id], (error, results, fields) => {
        results 
        ? res.status(404).send('ID no existe') 
        : res.send(results);
      })
    }

export const postContacto = async (req, res)=> {
    const query = 'INSERT INTO contactos (nombre,servicio,telefono,correo) VALUES (?,?,?,?)';
    const { mantenimiento, responsable, inicio, fin } = req.body;
    const data = [mantenimiento, responsable, inicio, fin];
    db.query(query, data, (error, results, fields) => res.send(results));
}

export const deleteMantenimiento = async (req, res)=>{
  const query = 'DELETE FROM mantenimientos_realizar WHERE id = ?';
  const { id } = req.params;
  db.query(query, [id], (error, results, fields) => res.send(results));
}

export const deleteContacto = async (req, res)=> {
    const query = 'DELETE FROM contactos WHERE id = ?';
    const { id } = req.params;
    db.query(query, [id], (error, results, fields) => res.send(results));
}