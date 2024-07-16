import connection from '../models/conexion.js'
const pre = '/api/cocina-bar'

export  const createCocinaBarRouter = (router) => {

    router.get(pre+'/', async (req, res) => {
        try {
            const [results] = await connection.query('SELECT * FROM cocina_bar');
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error });
        }
    });
    
    router.get(pre+'/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await connection.query('SELECT * FROM cocina_bar WHERE id_cocina_bar = ?', [id]);
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
        const { nombre, categoria, cantidad, area, unidad, fecha_caducidad } = req.body;
        try {
            const [results] = await connection.query('INSERT INTO cocina_bar (nombre, categoria, cantidad, area, unidad, fecha_caducidad) VALUES (?, ?, ?, ?, ?, ?)', [nombre, categoria, cantidad, area, unidad, fecha_caducidad]);
            res.status(200).json({ id: results.insertId });
        } catch (error) {
            res.status(500).json({ error });
        }
    });
    
    router.put(pre+'/:id', async (req, res) => {
        const { id } = req.params;
        const { nombre, categoria, cantidad, area, unidad, fecha_caducidad } = req.body;
        try {
            const [results] = await connection.query('UPDATE cocina_bar SET nombre = ?, categoria = ?, cantidad = ?, area = ?, unidad = ?, fecha_caducidad = ? WHERE id_cocina_bar = ?', [nombre, categoria, cantidad, area, unidad, fecha_caducidad, id]);
            if (results.affectedRows > 0) {
                res.status(200).send('Elemento actualizado correctamente');
            } else {
                res.status(404).send('Elemento no encontrado');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });
    
    router.delete(pre+'/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await connection.query('DELETE FROM cocina_bar WHERE id_cocina_bar = ?', [id]);
            if (results.affectedRows > 0) {
                res.status(200).send('Elemento eliminado correctamente');
            } else {
                res.status(404).send('Elemento no encontrado');
            }
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
            const [results] = await connection.query('SELECT nombre, unidad FROM cocina_bar WHERE id_cocina_bar = ?', [id]);
            if (results.length > 0) {
                const nombreProducto = results[0].nombre;
                const unidad = results[0].unidad.toLowerCase();
    
                if ((unidad === 'kg' || unidad === 'litros') && !Number.isInteger(cantidad)) {
                    return res.status(400).send('No se puede agregar una fracción para esta unidad en cocina_bar');
                }
    
                // Actualizar la cantidad en cocina_bar
                const [updateResult] = await connection.query('UPDATE cocina_bar SET cantidad = cantidad + ? WHERE id_cocina_bar = ?', [cantidad, id]);
                
                // Registrar acción en la tabla registros
                const fecha_registro = new Date();
                const modulo = 'Inventario';
                const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
                const tipo_ajuste = 'Entrada';
                const observacion = observaciones || `Ajuste de cantidad agregada automáticamente en ${unidad}`;
    
                await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombreProducto, tipo_ajuste, cantidad, observacion]);
    
                res.status(200).send('Cantidad agregada correctamente en cocina_bar');
            } else {
                res.status(404).send('Elemento no encontrado en cocina_bar');
            }
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ error });
        }
    });
    
    router.put(pre+'/retirar/:id', async (req, res) => {
        const { id } = req.params;
        let { cantidad, observaciones } = req.body;
    
        // Verificar que la cantidad sea un número positivo
        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }
    
        try {
            const [producto] = await connection.query('SELECT nombre, unidad, cantidad FROM cocina_bar WHERE id_cocina_bar = ?', [id]);
            if (producto.length === 0) {
                return res.status(404).send('Elemento no encontrado en cocina_bar');
            }
    
            const { nombre, unidad, cantidadActual } = producto[0];
    
            if ((unidad.toLowerCase() === 'kg' || unidad.toLowerCase() === 'litros') && !Number.isInteger(cantidad)) {
                return res.status(400).send('No se puede eliminar una fracción para esta unidad en cocina_bar');
            }
    
            if (cantidad > cantidadActual) {
                return res.status(400).send('No se puede retirar más cantidad de la disponible');
            }
    
            await connection.query('UPDATE cocina_bar SET cantidad = cantidad - ? WHERE id_cocina_bar = ?', [cantidad, id]);
    
            // Registrar acción en la tabla registros
            const fecha_registro = new Date();
            const modulo = 'Inventario';
            const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
            const tipo_ajuste = 'Salida';
            const observacion = observaciones || `Ajuste de cantidad retirada automáticamente en ${unidad}`;
    
            await connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombre, tipo_ajuste, cantidad, observacion]);
    
            res.status(200).send('Cantidad eliminada correctamente en cocina_bar');
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ error });
        }
    });
  
    return router
}