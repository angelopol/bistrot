const express = require('express');
const router = express.Router();
const connection = require('../conexion');

// Obtener todos los elementos de registros
router.get('/', (req, res) => {
    connection.query('SELECT * FROM registros', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
});

// Obtener un elemento de registros por su ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM registros WHERE id = ?', [id], (error, results) => {
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

// Agregar un nuevo elemento a registros
router.post('/', (req, res) => {
    const { fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones } = req.body;
    connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(201).send('Elemento creado correctamente');
        }
    });
});

// Actualizar un elemento de registros por su ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones } = req.body;
    connection.query('UPDATE registros SET fecha_registro = ?, modulo = ?, usuario = ?, producto = ?, tipo_ajuste = ?, cantidad = ?, observaciones = ? WHERE id = ?', [fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones, id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).send('Elemento actualizado correctamente');
        }
    });
});

// Eliminar un elemento de registros por su ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM registros WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).send('Elemento eliminado correctamente');
        }
    });
});

module.exports = router;
