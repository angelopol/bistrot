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

router.put('/agregar/:id', (req, res) => {
    const { id } = req.params;
    let { cantidad, observaciones } = req.body;

    // Verificar que la cantidad sea un número válido y positivo
    cantidad = parseFloat(cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).send('La cantidad debe ser un número positivo');
    }

    // Obtener el nombre del producto correspondiente al ID en la tabla general
    connection.query('SELECT nombre FROM general WHERE id_general = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }

        if (results.length > 0) {
            const nombreProducto = results[0].nombre;

            // Actualizar la cantidad en general
            connection.query('UPDATE general SET cantidad = cantidad + ? WHERE id_general = ?', [cantidad, id], (error, updateResult) => {
                if (error) {
                    return res.status(500).json({ error });
                }

                // Registrar acción en la tabla registros
                const fecha_registro = new Date();
                const modulo = 'Inventario';
                const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
                const tipo_ajuste = 'Entrada';
                const observacion = observaciones || `Ajuste de cantidad agregada automáticamente para ${nombreProducto}`;

                connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombreProducto, tipo_ajuste, cantidad, observacion], (error, insertResult) => {
                    if (error) {
                        console.log("Error al insertar en registros: ", error);
                    }
                });

                res.status(200).send('Cantidad agregada correctamente en general');
            });
        } else {
            res.status(404).send('Producto no encontrado en la tabla general');
        }
    });
});


router.put('/retirar/:id', (req, res) => {
    const { id } = req.params;
    let { cantidad, observaciones } = req.body;

    // Verificar que la cantidad sea un número válido y positivo
    cantidad = parseFloat(cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).send('La cantidad debe ser un número positivo');
    }

    // Verificar la cantidad disponible antes de retirarla
    connection.query('SELECT nombre, cantidad FROM general WHERE id_general = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }

        if (results.length > 0) {
            const nombreProducto = results[0].nombre;
            const cantidadActual = results[0].cantidad;

            if (cantidad > cantidadActual) {
                return res.status(400).send('No se puede retirar más cantidad de la disponible');
            }

            // Actualizar la cantidad en general
            connection.query('UPDATE general SET cantidad = cantidad - ? WHERE id_general = ?', [cantidad, id], (error, updateResult) => {
                if (error) {
                    return res.status(500).json({ error });
                }

                // Registrar acción en la tabla registros
                const fecha_registro = new Date();
                const modulo = 'Inventario';
                const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
                const tipo_ajuste = 'Salida';
                const observacion = observaciones || `Ajuste de cantidad retirada automáticamente para ${nombreProducto}`;

                connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombreProducto, tipo_ajuste, cantidad, observacion], (error, insertResult) => {
                    if (error) {
                        console.log("Error al insertar en registros: ", error);
                    }
                });

                res.status(200).send('Cantidad retirada correctamente en general');
            });
        } else {
            res.status(404).send('Elemento no encontrado en general');
        }
    });
});







module.exports = router;
