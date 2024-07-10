const express = require('express');
const router = express.Router();
const connection = require('../conexion');
const { verifyToken, checkMantenimientoPermission, checkPermission } = require('../Middleware/authCompras');

router.get('/general/:id', verifyToken, checkPermission, (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM general WHERE id_general = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).send('Elemento no encontrado');
            }
        }
    });
});

// Nuevo elemento a general
router.post('/general/nuevo', verifyToken, checkPermission, (req, res) => {
    const { nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad } = req.body;
    connection.query('INSERT INTO general (nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(201).send('Elemento creado correctamente');
        }
    });
});

// Agregar cantidad a un elemento en general por ID
router.put('/general/agregar/:id', verifyToken, checkMantenimientoPermission, (req, res) => {
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

// Nuevo elemento a cocina_bar
router.post('/cocina-bar/nuevo', verifyToken, checkPermission, (req, res) => {
    const { nombre, categoria, cantidad, area, unidad, fecha_caducidad } = req.body;
    connection.query('INSERT INTO cocina_bar (nombre, categoria, cantidad, area, unidad, fecha_caducidad) VALUES (?, ?, ?, ?, ?, ?)', [nombre, categoria, cantidad, area, unidad, fecha_caducidad], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(201).send('Elemento creado correctamente');
        }
    });
});

// Agregar una cantidad específica a un elemento en cocina_bar por ID
router.put('/cocina-bar/agregar/:id', verifyToken, checkPermission, (req, res) => {
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
                    connection.query('UPDATE cocina_bar SET cantidad = cantidad + ? WHERE id_cocina_bar = ?', [cantidad, id], (error, updateResult) => {
                        if (error) {
                            res.status(500).json({ error });
                        } else {
                            res.status(200).send('Cantidad agregada correctamente en cocina_bar');
                        }
                    });
                } else {
                    // No permitir decimales para otras unidades
                    if (Number.isInteger(cantidad)) {
                        connection.query('UPDATE cocina_bar SET cantidad = cantidad + ? WHERE id_cocina_bar = ?', [cantidad, id], (error, updateResult) => {
                            if (error) {
                                res.status(500).json({ error });
                            } else {
                                res.status(200).send('Cantidad agregada correctamente en cocina_bar');
                            }
                        });
                    } else {
                        res.status(400).send('No se puede agregar una fracción para esta unidad en cocina_bar');
                    }
                }
            } else {
                res.status(404).send('Elemento no encontrado en cocina_bar');
            }
        }
    });
});

module.exports = router;
