import connection from '../models/conexion.js'
import { verifyToken, checkMantenimientoPermission } from '../middlewares/authMantenimiento.js'
const pre = '/api/modulo-mantenimiento'

export const createModuloMantenimientoRouter = (router) => {
    // Consultar un elemento por ID en general
    router.get(pre + '/:id', verifyToken, checkMantenimientoPermission, async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await connection.query('SELECT * FROM general WHERE id_general = ?', [id]);
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado en general');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.put(pre + '/retirar/:id', verifyToken, checkMantenimientoPermission, async (req, res) => {
        const { id } = req.params;
        let { cantidad } = req.body;

        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }

        try {
            const [results] = await connection.query('SELECT nombre, cantidad FROM general WHERE id_general = ?', [id]);
            if (results.length > 0) {
                const cantidadActual = results[0].cantidad;
                const nombreProducto = results[0].nombre;

                if (cantidad > cantidadActual) {
                    return res.status(400).send('No se puede retirar más cantidad de la disponible');
                }

                await connection.query('UPDATE general SET cantidad = cantidad - ? WHERE id_general = ?', [cantidad, id]);

                // Registrar acción en la tabla registros
                const fecha_registro = new Date();
                const modulo = 'Mantenimiento';
                const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
                const tipo_ajuste = 'Salida';
                const observacion = `Uso de equipo terminado`;

                await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombreProducto, tipo_ajuste, cantidad, observacion]);

                res.status(200).send('Cantidad retirada correctamente en general');
            } else {
                res.status(404).send('Elemento no encontrado en general');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.put(pre + '/agregar/:id', verifyToken, checkMantenimientoPermission, async (req, res) => {
        const { id } = req.params;
        let { cantidad } = req.body;

        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }

        try {
            const [results] = await connection.query('SELECT nombre FROM general WHERE id_general = ?', [id]);
            if (results.length > 0) {
                const nombreProducto = results[0].nombre;

                await connection.query('UPDATE general SET cantidad = cantidad + ? WHERE id_general = ?', [cantidad, id]);

                // Registrar acción en la tabla registros
                const fecha_registro = new Date();
                const modulo = 'Mantenimiento';
                const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
                const tipo_ajuste = 'Entrada';
                const observacion = `Uso de equipo`;

                await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombreProducto, tipo_ajuste, cantidad, observacion]);

                res.status(200).send('Cantidad agregada correctamente en general');
            } else {
                res.status(404).send('Elemento no encontrado en general');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });


    router.put(pre + '/cambiar-estado/:id', verifyToken, checkMantenimientoPermission, async (req, res) => {
        const { id } = req.params;
        const { funciona_estado } = req.body;

        if (typeof funciona_estado !== 'boolean') {
            return res.status(400).send('El estado funcional debe ser un booleano');
        }

        try {
            await connection.query('UPDATE general SET funciona_estado = ? WHERE id_general = ?', [funciona_estado, id]);
            res.status(200).send('Estado funcional cambiado correctamente en general');
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    // Cambiar fecha de mantenimiento de un elemento en general por ID
    router.put(pre + '/cambiar-fecha-mantenimiento/:id', verifyToken, checkMantenimientoPermission, async (req, res) => {
        const { id } = req.params;
        const { fecha_mantenimiento } = req.body;

        try {
            await connection.query('UPDATE general SET fecha_mantenimiento = ? WHERE id_general = ?', [fecha_mantenimiento, id]);
            res.status(200).send('Fecha de mantenimiento cambiada correctamente en general');
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    return router
}