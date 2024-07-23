import connection from '../models/conexion.js'
const pre = '/api/registros'

export  const createRegistrosRouter = (router) => {
    // Obtener todos los elementos de registros
    router.get(pre+'/', async (req, res) => {
        try {
            const [results] = await connection.query('SELECT * FROM registros');
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.get(pre+'/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await connection.query('SELECT * FROM registros WHERE id = ?', [id]);
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.post(pre+'/', async (req, res) => {
        const { fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones } = req.body;
        try {
            const [results] = await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones]);
            res.status(201).send('Elemento creado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.put(pre+'/:id', async (req, res) => {
        const { id } = req.params;
        const { fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones } = req.body;
        try {
            const [results] = await connection.query('UPDATE registros SET fecha_registro = ?, modulo = ?, usuario = ?, producto = ?, tipo_ajuste = ?, cantidad = ?, observaciones = ? WHERE id = ?', [fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones, id]);
            if (results.affectedRows === 0) {
                return res.status(404).send('Elemento no encontrado');
            }
            res.status(200).send('Elemento actualizado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.delete(pre+'/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await connection.query('DELETE FROM registros WHERE id = ?', [id]);
            if (results.affectedRows === 0) {
                return res.status(404).send('Elemento no encontrado');
            }
            res.status(200).send('Elemento eliminado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    return router
}