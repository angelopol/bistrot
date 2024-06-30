const express = require('express');
const router = express.Router();
const connection = require('../conexion');

// Obtener todos los elementos de cocina_bar
router.get('/', (req, res) => {
    connection.query('SELECT * FROM cocina_bar', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
});

// Obtener un elemento de cocina_bar por su ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM cocina_bar WHERE id_cocina_bar = ?', [id], (error, results) => {
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

// Agregar un nuevo elemento a cocina_bar
router.post('/', (req, res) => {
    const { nombre, categoria, cantidad, area, unidad, fecha_caducidad } = req.body;
    connection.query('INSERT INTO cocina_bar (nombre, categoria, cantidad, area, unidad, fecha_caducidad) VALUES (?, ?, ?, ?, ?, ?)', [nombre, categoria, cantidad, area, unidad, fecha_caducidad], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(201).send('Elemento creado correctamente');
        }
    });
});

// Actualizar un elemento de cocina_bar por su ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, cantidad, area, unidad, fecha_caducidad } = req.body;
    connection.query('UPDATE cocina_bar SET nombre = ?, categoria = ?, cantidad = ?, area = ?, unidad = ?, fecha_caducidad = ? WHERE id_cocina_bar = ?', [nombre, categoria, cantidad, area, unidad, fecha_caducidad, id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).send('Elemento actualizado correctamente');
        }
    });
});

// Eliminar un elemento de cocina_bar por su ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM cocina_bar WHERE id_cocina_bar = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).send('Elemento eliminado correctamente');
        }
    });
});

module.exports = router;
