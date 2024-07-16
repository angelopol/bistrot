import connection from '../models/conexion.js'
import { verifyToken, checkMantenimientoPermission, checkPermission } from '../middlewares/authCompras.js'
const pre = '/api/modulo-compras'

export  const createModuloComprasRouter = (router) => {

    router.get(pre+'/general/:id', verifyToken, checkPermission, async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await connection.query('SELECT * FROM general WHERE id_general = ?', [id]);
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.post(pre+'/general/nuevo', verifyToken, checkPermission, async (req, res) => {
        const { nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad } = req.body;
        try {
            await connection.query('INSERT INTO general (nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad]);
            res.status(201).send('Elemento creado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.put(pre+'/general/agregar/:id', verifyToken, checkMantenimientoPermission, async (req, res) => {
        const { id } = req.params;
        let { cantidad } = req.body;
        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }

        try {
            await connection.query('UPDATE general SET cantidad = cantidad + ? WHERE id_general = ?', [cantidad, id]);
            res.status(200).send('Cantidad agregada correctamente en general');
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.get(pre+'/cocina-bar/:id', verifyToken, checkPermission, async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await connection.query('SELECT * FROM cocina_bar WHERE id_cocina_bar = ?', [id]);
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado en cocina_bar');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.post(pre+'/cocina-bar/nuevo', verifyToken, checkPermission, async (req, res) => {
        const { nombre, categoria, cantidad, area, unidad, fecha_caducidad } = req.body;
        try {
            await connection.query('INSERT INTO cocina_bar (nombre, categoria, cantidad, area, unidad, fecha_caducidad) VALUES (?, ?, ?, ?, ?, ?)', [nombre, categoria, cantidad, area, unidad, fecha_caducidad]);
            res.status(201).send('Elemento creado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.put(pre+'/cocina-bar/agregar/:id', verifyToken, checkPermission, async (req, res) => {
        const { id } = req.params;
        let { cantidad } = req.body;
        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }

        try {
            const [results] = await connection.query('SELECT unidad FROM cocina_bar WHERE id_cocina_bar = ?', [id]);
            if (results.length > 0) {
                const unidad = results[0].unidad.toLowerCase();
                if (unidad === 'kg' || unidad === 'litros' || Number.isInteger(cantidad)) {
                    await connection.query('UPDATE cocina_bar SET cantidad = cantidad + ? WHERE id_cocina_bar = ?', [cantidad, id]);
                    res.status(200).send('Cantidad agregada correctamente en cocina_bar');
                } else {
                    res.status(400).send('No se puede agregar una fracción para esta unidad en cocina_bar');
                }
            } else {
                res.status(404).send('Elemento no encontrado en cocina_bar');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    return router
}