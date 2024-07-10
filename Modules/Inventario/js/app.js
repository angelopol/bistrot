const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Importa rutas
const submoduloInventarioRoutes = require('./routes/submoduloInventario');
const cocinaBarRoutes = require('./routes/cocina_bar');
const generalRoutes = require('./routes/general');
const moduloCocinaRoutes = require('./routes/modulo_cocina');
const moduloMantenimientoRoutes = require('./routes/modulo_mantenimiento');
const authController = require('./controllers/authController');

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(express.json());

// Ruta para autenticación y generación de token 
app.use('/api', authController);

// Rutas protegidas que requieren autenticación y permisos
app.use('/api/modulo-cocina', moduloCocinaRoutes);
app.use('/api/modulo-mantenimiento', moduloMantenimientoRoutes);

// Rutas para la tabla de inventario
app.use('/api/submodulo-inventario', submoduloInventarioRoutes);
app.use('/api/cocina-bar', cocinaBarRoutes);
app.use('/api/general', generalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
