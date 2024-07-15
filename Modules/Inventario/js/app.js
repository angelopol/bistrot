const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Importa rutas
const submoduloInventarioRoutes = require('./routes/submoduloInventario');
const cocinaBarRoutes = require('./routes/cocina_bar');
const generalRoutes = require('./routes/general');
const moduloCocinaRoutes = require('./routes/modulo_cocina');
const registrosRoutes = require('./routes/registros');

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(express.json());

// Ruta para autenticación y generación de token 
app.post('/api/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    // Simulacion para ver su funcionalidad
    if (usuario === 'cocina' && contrasena === 'contrasena') {
        // Autenticación exitosa, generar token
        const token = jwt.sign({ usuario: 'cocina' }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
});

// Rutas protegidas que requieren autenticación y permisos
app.use('/api/modulo-cocina', moduloCocinaRoutes);

// Rutas para la tabla de inventario
app.use('/api/submodulo-inventario', submoduloInventarioRoutes);
app.use('/api/cocina-bar', cocinaBarRoutes);
app.use('/api/general', generalRoutes);
app.use('/api/registros', registrosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
