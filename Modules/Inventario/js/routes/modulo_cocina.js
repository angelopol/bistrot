const express = require('express');
const router = express.Router();
const connection = require('../conexion');
const { verifyToken, checkPermission } = require('../Middleware/authCocina');

// Consultar un elemento por ID en cocina_bar
router.get('/cocina-bar/:id', verifyToken, checkPermission, (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM cocina_bar WHERE id_cocina_bar = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado en cocina_bar');
            }
        }
    });
});

// Consultar un elemento por nombre en cocina_bar
router.get('/cocina-bar/nombre/:nombre', verifyToken, checkPermission, (req, res) => {
    const { nombre } = req.params;

    connection.query('SELECT * FROM cocina_bar WHERE nombre = ?', [nombre], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado en cocina_bar');
            }
        }
    });
});

// Eliminar una cantidad específica de un elemento en cocina_bar por ID
router.delete('/cocina-bar/:id', verifyToken, checkPermission, (req, res) => {
    const { id } = req.params;
    let { cantidad } = req.body;

    // Verificar que la cantidad sea un número positivo
    cantidad = parseFloat(cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).send('La cantidad debe ser un número positivo');
    }

    // Verificar la unidad del elemento
    connection.query('SELECT unidad FROM cocina_bar WHERE id_cocina_bar = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            if (results.length > 0) {
                const unidad = results[0].unidad.toLowerCase();

                // Permitir decimales solo para unidades específicas
                if (unidad === 'kg' || unidad === 'litros') {
                    connection.query('UPDATE cocina_bar SET cantidad = cantidad - ? WHERE id_cocina_bar = ?', [cantidad, id], (error, updateResult) => {
                        if (error) {
                            res.status(500).json({ error });
                        } else {
                            res.status(200).send('Cantidad eliminada correctamente en cocina_bar');
                        }
                    });
                } else {
                    // No permitir decimales para otras unidades
                    if (Number.isInteger(cantidad)) {
                        connection.query('UPDATE cocina_bar SET cantidad = cantidad - ? WHERE id_cocina_bar = ?', [cantidad, id], (error, updateResult) => {
                            if (error) {
                                res.status(500).json({ error });
                            } else {
                                res.status(200).send('Cantidad eliminada correctamente en cocina_bar');
                            }
                        });
                    } else {
                        res.status(400).send('No se puede eliminar una fracción para esta unidad en cocina_bar');
                    }
                }
            } else {
                res.status(404).send('Elemento no encontrado en cocina_bar');
            }
        }
    });
});

// Consultar un elemento por ID en general
router.get('/general/:id', verifyToken, checkPermission, (req, res) => {
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
router.put('/general/retirar/:id', verifyToken, checkPermission, (req, res) => {
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
router.put('/general/agregar/:id', verifyToken, checkPermission, (req, res) => {
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
router.put('/general/cambiar-estado/:id', verifyToken, checkPermission, (req, res) => {
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

module.exports = router;
