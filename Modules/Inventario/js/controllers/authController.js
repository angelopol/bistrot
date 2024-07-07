const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    //Simulacion para ver su funcionalidad

    if (usuario === 'cocina' && contrasena === 'contrasena') {
        // Usuario valido simulación
        const token = jwt.sign({ usuario: 'cocina' }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        // Credenciales inválidas
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
});

module.exports = router;
