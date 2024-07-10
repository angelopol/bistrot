const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    // Simulación para ver su funcionalidad
    if (usuario === 'cocina' && contrasena === 'contrasena') {
        // Usuario válido simulación
        const token = jwt.sign({ usuario: 'cocina' }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else if (usuario === 'mantenimiento' && contrasena === 'contrasena') {
        // Usuario válido simulación
        const token = jwt.sign({ usuario: 'mantenimiento' }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else if (usuario === 'compras' && contrasena === 'contrasena') {
        // Usuario válido simulación
        const token = jwt.sign({ usuario: 'compras' }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        // Credenciales inválidas
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
});

module.exports = router;
