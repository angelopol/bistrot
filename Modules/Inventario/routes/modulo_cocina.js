import connection from '../models/conexion.js'
import { verifyToken, checkPermission } from '../middlewares/authCocina.js'
const pre = '/api/modulo-cocina'

export  const createModuloCocinaRouter = (router) => {
    // Consultar un elemento por ID en cocina_bar
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

    router.get(pre+'/cocina-bar/nombre/:nombre', verifyToken, checkPermission, async (req, res) => {
        const { nombre } = req.params;
        try {
            const [results] = await connection.query('SELECT * FROM cocina_bar WHERE nombre = ?', [nombre]);
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado en cocina_bar');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    router.delete(pre+'/cocina-bar/:id', verifyToken, checkPermission, async (req, res) => {
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
                    await connection.query('UPDATE cocina_bar SET cantidad = cantidad - ? WHERE id_cocina_bar = ?', [cantidad, id]);
                    res.status(200).send('Cantidad eliminada correctamente en cocina_bar');
                } else {
                    res.status(400).send('No se puede eliminar una fracción para esta unidad en cocina_bar');
                }
            } else {
                res.status(404).send('Elemento no encontrado en cocina_bar');
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });

    // Consultar un elemento por ID en general
    router.get(pre+'/general/:id', verifyToken, checkPermission, (req, res) => {
        const { id } = req.params;

        connection.query('SELECT * FROM general WHERE id_general = ?', [id], (error, results) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                if (results.length > 0) {
                    res.status(200).json(results[0]);
                } else {
                    res.status(404).send('Elemento no encontrado en general');
                }
            }
        });
    });

    // Modificar cantidad de un elemento en general por ID
    router.put(pre+'/general/retirar/:id', verifyToken, checkPermission, (req, res) => {
        const { id } = req.params;
        let { cantidad } = req.body;

        // Verificar que la cantidad sea un número válido y positivo
        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }

        connection.query('SELECT cantidad FROM general WHERE id_general = ?', [id], (error, results) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                if (results.length > 0) {
                    const cantidadActual = results[0].cantidad;

                    if (cantidad > cantidadActual) {
                        return res.status(400).send('No se puede retirar más cantidad de la disponible');
                    }

                    connection.query('UPDATE general SET cantidad = cantidad - ? WHERE id_general = ?', [cantidad, id], (error, updateResult) => {
                        if (error) {
                            res.status(500).json({ error });
                        } else {
                            res.status(200).send('Cantidad retirada correctamente en general');
                        }
                    });
                } else {
                    res.status(404).send('Elemento no encontrado en general');
                }
            }
        });
    });




    // Agregar cantidad a un elemento en general por ID
    router.put(pre+'/general/agregar/:id', verifyToken, checkPermission, (req, res) => {
        const { id } = req.params;
        let { cantidad } = req.body;

        // Verificar que la cantidad sea un número válido y positivo
        cantidad = parseFloat(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).send('La cantidad debe ser un número positivo');
        }

        connection.query('UPDATE general SET cantidad = cantidad + ? WHERE id_general = ?', [cantidad, id], (error, updateResult) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).send('Cantidad agregada correctamente en general');
            }
        });
    });


    // Cambiar estado funcional de un elemento en general por ID
    router.put(pre+'/general/cambiar-estado/:id', verifyToken, checkPermission, (req, res) => {
        const { id } = req.params;
        const { funciona_estado } = req.body;

        // Verificar que funciona_estado sea un booleano
        if (typeof funciona_estado !== 'boolean') {
            return res.status(400).send('El estado funcional debe ser un booleano');
        }

        connection.query('UPDATE general SET funciona_estado = ? WHERE id_general = ?', [funciona_estado, id], (error, updateResult) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).send('Estado funcional cambiado correctamente en general');
            }
        });
    });

    return router
}