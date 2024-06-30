// routes/submoduloInventario.js
const express = require('express');
const router = express.Router();
const connection = require('../conexion');

// Ruta de prueba
router.get('/test', (req, res) => {
    res.json({ message: 'Ruta de prueba en submodulo-inventario' });
});

//NO CREE NINGUNA TABLA :p

// Crear un nuevo inventario
router.post('/', (req, res) => {
    const { nombre, tipo, descripcion } = req.body;
    const query = 'INSERT INTO submodulo_inventario (nombre, tipo, descripcion) VALUES (?, ?, ?)';
    connection.query(query, [nombre, tipo, descripcion], (error, results) => {
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(201).json({ id: results.insertId, nombre, tipo, descripcion });
    });
});

// Obtener todos los inventarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM submodulo_inventario';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json(results);
    });
});

// Actualizar un inventario por su ID
router.put('/:id', (req, res) => {
    const { nombre, tipo, descripcion } = req.body;
    const { id } = req.params;
    const query = 'UPDATE submodulo_inventario SET nombre = ?, tipo = ?, descripcion = ? WHERE id_inventario = ?';
    connection.query(query, [nombre, tipo, descripcion, id], (error, results) => {
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }
        res.status(200).json({ id, nombre, tipo, descripcion });
    });
});

// Eliminar un inventario por su ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM submodulo_inventario WHERE id_inventario = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }
        res.status(204).json();
    });
});

module.exports = router;
