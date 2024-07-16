import connection from '../models/conexion.js'
const pre = '/api/general'

export  const createGeneralRouter = (router) => {
    // Obtener todos los elementos de general
    router.get(pre+'/', async (req, res) => {
        try {
            const [results] = await connection.query('SELECT * FROM general');
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    // Obtener un elemento de general por su ID
    router.get(pre+'/:id', async (req, res) => {
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

    // Agregar un nuevo elemento a general
    router.post(pre+'/', async (req, res) => {
        const { nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad } = req.body;
        try {
            await connection.query('INSERT INTO general (nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad]);
            res.status(201).send('Elemento creado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    // Actualizar un elemento de general por su ID
    router.put(pre+'/:id', async (req, res) => {
        const { id } = req.params;
        const { nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad } = req.body;
        try {
            await connection.query('UPDATE general SET nombre = ?, tipo = ?, categoria = ?, funciona_estado = ?, fecha_mantenimiento = ?, unidad = ?, cantidad = ? WHERE id_general = ?', [nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad, id]);
            res.status(200).send('Elemento actualizado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    // Eliminar un elemento de general por su ID
    router.delete(pre+'/:id', async (req, res) => {
        const { id } = req.params;
        try {
            await connection.query('DELETE FROM general WHERE id_general = ?', [id]);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.put(pre+'/agregar/:id', async (req, res) => {
        const { id } = req.params;
        let { cantidad, observaciones } = req.body;

        // Verificar que la cantidad sea un número válido y positivo
        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }

        try {
            const [results] = await connection.query('SELECT nombre FROM general WHERE id_general = ?', [id]);
            if (results.length > 0) {
                const nombreProducto = results[0].nombre;

                // Actualizar la cantidad en general
                await connection.query('UPDATE general SET cantidad = cantidad + ? WHERE id_general = ?', [cantidad, id]);

                // Registrar acción en la tabla registros
                const fecha_registro = new Date();
                const modulo = 'Inventario';
                const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
                const tipo_ajuste = 'Entrada';
                const observacion = observaciones || `Ajuste de cantidad agregada automáticamente para ${nombreProducto}`;

                await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombreProducto, tipo_ajuste, cantidad, observacion]);

                res.status(200).send('Cantidad agregada correctamente en general');
            } else {
                res.status(404).send('Producto no encontrado en la tabla general');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });


    router.put(pre+'/retirar/:id', async (req, res) => {
        const { id } = req.params;
        let { cantidad, observaciones } = req.body;

        // Verificar que la cantidad sea un número válido y positivo
        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }

        try {
            const [results] = await connection.query('SELECT nombre, cantidad FROM general WHERE id_general = ?', [id]);
            if (results.length > 0) {
                const nombreProducto = results[0].nombre;
                const cantidadActual = results[0].cantidad;

                if (cantidad > cantidadActual) {
                    return res.status(400).send('No se puede retirar más cantidad de la disponible');
                }

                // Actualizar la cantidad en general
                await connection.query('UPDATE general SET cantidad = cantidad - ? WHERE id_general = ?', [cantidad, id]);

                // Registrar acción en la tabla registros
                const fecha_registro = new Date();
                const modulo = 'Inventario';
                const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
                const tipo_ajuste = 'Salida';
                const observacion = observaciones || `Ajuste de cantidad retirada automáticamente para ${nombreProducto}`;

                await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombreProducto, tipo_ajuste, cantidad, observacion]);

                res.status(200).send('Cantidad retirada correctamente en general');
            } else {
                res.status(404).send('Elemento no encontrado en general');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    return router
}