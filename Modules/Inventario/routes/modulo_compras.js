import connection from '../models/conexion.js'

const pre = '/api/modulo-compras'

export const createModuloComprasRouter = (router) => {

    // Obtener un elemento en la tabla general por ID
    router.get(pre + '/general/:id', async (req, res) => {
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

    // Crear un nuevo elemento en la tabla general
    router.post(pre + '/general/nuevo', async (req, res) => {
        const { nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad, observaciones } = req.body

        try {
            // Insertar el nuevo producto en la tabla general
            await connection.query('INSERT INTO general (nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad]);

            // Registrar acción en la tabla registros
            const fecha_registro = new Date();
            const modulo = 'Compras';
            const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
            const tipo_ajuste = 'Entrada';
            const observacion = observaciones || `Entrada de nuevo producto: ${nombre}`;

            await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombre, tipo_ajuste, cantidad, observacion]);

            res.status(201).send('Elemento creado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    });


    // Actualizar cantidad en la tabla general
    router.put(pre + '/general/agregar/:nombre', async (req, res) => {
        const { nombre } = req.params;
        let { cantidad, observaciones } = req.body;

        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }

        try {
            const [results] = await connection.query('SELECT id_general, nombre FROM general WHERE nombre = ?', [nombre]);
            if (results.length > 0) {
                const id = results[0].id_general;
                const nombreProducto = results[0].nombre;

                await connection.query('UPDATE general SET cantidad = cantidad + ? WHERE id_general = ?', [cantidad, id]);

                const fecha_registro = new Date();
                const modulo = 'Compras';
                const usuario = 'Gerente0000';
                const tipo_ajuste = 'Entrada';
                const observacion = observaciones || `Compra debido a falta de stock`;

                await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombreProducto, tipo_ajuste, cantidad, observacion]);

                res.status(200).send('Cantidad agregada correctamente en general');
            } else {
                res.status(404).send('Producto no encontrado en la tabla general');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.post(pre + '/cocina-general/agregar', async (req, res) => {
        const { nombre, cantidad, observaciones } = req.body;

        try {
            // Primero, intenta actualizar el producto en cocina_bar
            let [results] = await connection.query('SELECT id_cocina_bar, unidad FROM cocina_bar WHERE nombre = ?', [nombre]);

            if (results.length > 0) {
                // Producto encontrado en cocina_bar
                const id = results[0].id_cocina_bar;
                const unidad = results[0].unidad.toLowerCase();

                if (unidad === 'kg' || unidad === 'litros' || Number.isInteger(cantidad)) {
                    await connection.query('UPDATE cocina_bar SET cantidad = cantidad + ? WHERE id_cocina_bar = ?', [cantidad, id]);

                    // Registrar la acción
                    const fecha_registro = new Date();
                    const modulo = 'Compras';
                    const usuario = 'Gerente0000';
                    const tipo_ajuste = 'Entrada';
                    const observacion = observaciones || `Compra debido a falta de stock`;

                    await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombre, tipo_ajuste, cantidad, observacion]);

                    res.status(200).send('Cantidad agregada correctamente en cocina_bar');
                } else {
                    res.status(400).send('No se puede agregar una fracción para esta unidad en cocina_bar');
                }
            } else {
                // Producto no encontrado en cocina_bar, intenta en general
                [results] = await connection.query('SELECT id_general FROM general WHERE nombre = ?', [nombre]);

                if (results.length > 0) {
                    // Producto encontrado en general
                    const id = results[0].id_general;

                    await connection.query('UPDATE general SET cantidad = cantidad + ? WHERE id_general = ?', [cantidad, id]);

                    // Registrar la acción
                    const fecha_registro = new Date();
                    const modulo = 'Compras';
                    const usuario = 'Gerente0000';
                    const tipo_ajuste = 'Entrada';
                    const observacion = observaciones || `Compra debido a falta de stock`;

                    await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombre, tipo_ajuste, cantidad, observacion]);

                    res.status(200).send('Cantidad agregada correctamente en general');
                } else {
                    // Producto no encontrado en ninguna tabla, crea un nuevo producto
                    // Determina en qué tabla crear el nuevo producto (ejemplo: cocina_bar)
                    await connection.query('INSERT INTO cocina_bar (nombre, categoria, cantidad, area, unidad, fecha_caducidad) VALUES (?, ?, ?, ?, ?, ?)', [nombre, 'CategoríaEjemplo', cantidad, 'ÁreaEjemplo', 'UnidadEjemplo', new Date()]);

                    // Registrar la acción
                    const fecha_registro = new Date();
                    const modulo = 'Compras';
                    const usuario = 'Gerente0000';
                    const tipo_ajuste = 'Entrada';
                    const observacion = observaciones || `Entrada de nuevo producto: ${nombre}`;

                    await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombre, tipo_ajuste, cantidad, observacion]);

                    res.status(201).send('Nuevo producto creado y cantidad agregada en cocina_bar');
                }
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    // Obtener un elemento en la tabla cocina_bar por ID
    router.get(pre + '/cocina-bar/:id', async (req, res) => {
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

    // Crear un nuevo elemento en la tabla cocina_bar
    router.post(pre + '/cocina-bar/nuevo', async (req, res) => {
        const { nombre, categoria, cantidad, area, unidad, fecha_caducidad, observaciones } = req.body;

        try {
            await connection.query('INSERT INTO cocina_bar (nombre, categoria, cantidad, area, unidad, fecha_caducidad) VALUES (?, ?, ?, ?, ?, ?)', [nombre, categoria, cantidad, area, unidad, fecha_caducidad]);

            const fecha_registro = new Date();
            const modulo = 'Compras';
            const usuario = 'Gerente0000';
            const tipo_ajuste = 'Entrada';
            const observacion = observaciones || `Entrada de nuevo producto: ${nombre}`;

            await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombre, tipo_ajuste, cantidad, observacion]);

            res.status(201).send('Elemento creado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    });


    // Actualizar cantidad en la tabla cocina_bar
    router.put(pre + '/cocina-bar/agregar/:nombre', async (req, res) => {
        const { nombre } = req.params;
        let { cantidad, observaciones } = req.body;

        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }

        try {
            const [results] = await connection.query('SELECT id_cocina_bar, nombre, unidad FROM cocina_bar WHERE nombre = ?', [nombre]);
            if (results.length > 0) {
                const id = results[0].id_cocina_bar;
                const unidad = results[0].unidad.toLowerCase();
                if (unidad === 'kg' || unidad === 'litros' || Number.isInteger(cantidad)) {
                    await connection.query('UPDATE cocina_bar SET cantidad = cantidad + ? WHERE id_cocina_bar = ?', [cantidad, id]);

                    const fecha_registro = new Date();
                    const modulo = 'Compras';
                    const usuario = 'Gerente0000';
                    const tipo_ajuste = 'Entrada';
                    const observacion = observaciones || `Compra debido a falta de stock`;

                    await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombre, tipo_ajuste, cantidad, observacion]);

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
