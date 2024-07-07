const express = require('express');
const router = express.Router();
const connection = require('../conexion');

// Obtener todos los elementos de general
router.get('/', (req, res) => {
    connection.query('SELECT * FROM general', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
});

// Obtener un elemento de general por su ID
router.get('/:id', (req, res) => {
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

// Agregar un nuevo elemento a general
router.post('/', (req, res) => {
    const { nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad } = req.body;
    connection.query('INSERT INTO general (nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(201).send('Elemento creado correctamente');
        }
    });
});

// Actualizar un elemento de general por su ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad } = req.body;
    connection.query('UPDATE general SET nombre = ?, tipo = ?, categoria = ?, funciona_estado = ?, fecha_mantenimiento = ?, unidad = ?, cantidad = ? WHERE id_general = ?', [nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad, id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).send('Elemento actualizado correctamente');
        }
    });
});

// Eliminar un elemento de general por su ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM general WHERE id_general = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(204).send();
        }
    });
});

module.exports = router;
