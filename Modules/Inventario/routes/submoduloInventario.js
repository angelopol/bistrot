import connection from '../models/conexion.js'
const pre = '/api/submodulo-inventario'

export  const createSubmoduloRouter = (router) => {
    // Ruta de prueba
    router.get(pre+'/test', (req, res) => {
        res.json({ message: 'Ruta de prueba en submodulo-inventario' });
    });

    //NO CREE NINGUNA TABLA :p

    // Crear un nuevo inventario
    router.post(pre+'/', async (req, res) => {
        const { nombre, tipo, descripcion } = req.body;
        const query = 'INSERT INTO submodulo_inventario (nombre, tipo, descripcion) VALUES (?, ?, ?)';
        try {
            const [results] = await connection.query(query, [nombre, tipo, descripcion]);
            res.status(201).json({ id: results.insertId, nombre, tipo, descripcion });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    router.get(pre+'/', async (req, res) => {
        const query = 'SELECT * FROM submodulo_inventario';
        try {
            const [results] = await connection.query(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    router.put(pre+'/:id', async (req, res) => {
        const { nombre, tipo, descripcion } = req.body;
        const { id } = req.params;
        const query = 'UPDATE submodulo_inventario SET nombre = ?, tipo = ?, descripcion = ? WHERE id_inventario = ?';
        try {
            const [results] = await connection.query(query, [nombre, tipo, descripcion, id]);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Inventario no encontrado' });
            }
            res.status(200).json({ id, nombre, tipo, descripcion });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    router.delete(pre+'/:id', async (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM submodulo_inventario WHERE id_inventario = ?';
        try {
            const [results] = await connection.query(query, [id]);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Inventario no encontrado' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    return router
}