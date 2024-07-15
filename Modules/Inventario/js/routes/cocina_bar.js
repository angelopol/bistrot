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

router.put('/agregar/:id', (req, res) => {
    const { id } = req.params;
    let { cantidad, observaciones } = req.body;

    // Verificar que la cantidad sea un número válido y positivo
    cantidad = parseFloat(cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).send('La cantidad debe ser un número positivo');
    }

    // Verificar la unidad del elemento y permitir decimales solo para unidades específicas
    connection.query('SELECT nombre, unidad FROM cocina_bar WHERE id_cocina_bar = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }

        if (results.length > 0) {
            const nombreProducto = results[0].nombre;
            const unidad = results[0].unidad.toLowerCase();

            if ((unidad === 'kg' || unidad === 'litros') && !Number.isInteger(cantidad)) {
                return res.status(400).send('No se puede agregar una fracción para esta unidad en cocina_bar');
            }

            // Actualizar la cantidad en cocina_bar
            connection.query('UPDATE cocina_bar SET cantidad = cantidad + ? WHERE id_cocina_bar = ?', [cantidad, id], (error, updateResult) => {
                if (error) {
                    return res.status(500).json({ error });
                }

                // Registrar acción en la tabla registros
                const fecha_registro = new Date();
                const modulo = 'Inventario';
                const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
                const tipo_ajuste = 'Entrada';
                const observacion = observaciones || `Ajuste de cantidad agregada automáticamente en ${unidad}`;

                connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombreProducto, tipo_ajuste, cantidad, observacion], (error, insertResult) => {
                    if (error) {
                        console.log("Error al insertar en registros: ", error);
                    }
                });

                res.status(200).send('Cantidad agregada correctamente en cocina_bar');
            });
        } else {
            res.status(404).send('Elemento no encontrado en cocina_bar');
        }
    });
});



router.put('/retirar/:id', (req, res) => {
    const { id } = req.params;
    let { cantidad, observaciones } = req.body;

    // Verificar que la cantidad sea un número positivo
    cantidad = parseFloat(cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).send('La cantidad debe ser un número positivo');
    }

    // Verificar la unidad del elemento y permitir decimales solo para unidades específicas
    connection.query('SELECT nombre, unidad FROM cocina_bar WHERE id_cocina_bar = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }

        if (results.length > 0) {
            const nombreProducto = results[0].nombre;
            const unidad = results[0].unidad.toLowerCase();

            if ((unidad === 'kg' || unidad === 'litros') && !Number.isInteger(cantidad)) {
                return res.status(400).send('No se puede eliminar una fracción para esta unidad en cocina_bar');
            }

            // Verificar la cantidad disponible antes de retirarla
            connection.query('SELECT cantidad FROM cocina_bar WHERE id_cocina_bar = ?', [id], (error, results) => {
                if (error) {
                    return res.status(500).json({ error });
                }

                if (results.length > 0) {
                    const cantidadActual = results[0].cantidad;

                    if (cantidad > cantidadActual) {
                        return res.status(400).send('No se puede retirar más cantidad de la disponible');
                    }

                    // Actualizar la cantidad en cocina_bar
                    connection.query('UPDATE cocina_bar SET cantidad = cantidad - ? WHERE id_cocina_bar = ?', [cantidad, id], (error, updateResult) => {
                        if (error) {
                            return res.status(500).json({ error });
                        }

                        // Registrar acción en la tabla registros
                        const fecha_registro = new Date();
                        const modulo = 'Inventario';
                        const usuario = 'Gerente0000'; // Cambiar por el usuario correspondiente
                        const tipo_ajuste = 'Salida';
                        const observacion = observaciones || `Ajuste de cantidad retirada automáticamente en ${unidad}`;

                        connection.query('INSERT INTO registros (fecha_registro, modulo, usuario, producto, tipo_ajuste, cantidad, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha_registro, modulo, usuario, nombreProducto, tipo_ajuste, cantidad, observacion], (error, insertResult) => {
                            if (error) {
                                console.log("Error al insertar en registros: ", error);
                            }
                        });

                        res.status(200).send('Cantidad eliminada correctamente en cocina_bar');
                    });
                } else {
                    res.status(404).send('Elemento no encontrado en cocina_bar');
                }
            });
        } else {
            res.status(404).send('Elemento no encontrado en cocina_bar');
        }
    });
});



module.exports = router;
