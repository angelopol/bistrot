const express = require('express');
const router = express.Router();
const connection = require('../conexion');
const { verifyToken, checkMantenimientoPermission } = require('../Middleware/authMantenimiento');

// Consultar un elemento por ID en general
router.get('/:id', verifyToken, checkMantenimientoPermission, (req, res) => {
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
router.put('/retirar/:id', verifyToken, checkMantenimientoPermission, (req, res) => {
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
router.put('/agregar/:id', verifyToken, checkMantenimientoPermission, (req, res) => {
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
router.put('/cambiar-estado/:id', verifyToken, checkMantenimientoPermission, (req, res) => {
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

// Cambiar fecha de mantenimiento de un elemento en general por ID
router.put('/cambiar-fecha-mantenimiento/:id', verifyToken, checkMantenimientoPermission, (req, res) => {
    const { id } = req.params;
    const { fecha_mantenimiento } = req.body;

    connection.query('UPDATE general SET fecha_mantenimiento = ? WHERE id_general = ?', [fecha_mantenimiento, id], (error, updateResult) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).send('Fecha de mantenimiento cambiada correctamente en general');
        }
    });
});

module.exports = router;
