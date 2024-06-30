const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
// Importar rutas
const submoduloInventarioRoutes = require('./routes/submoduloInventario');
const cocinaBarRoutes = require('./routes/cocina_bar');
const generalRoutes = require('./routes/general');

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Rutas API
app.use('/api/submodulo-inventario', submoduloInventarioRoutes);
app.use('/api/cocina-bar', cocinaBarRoutes);
app.use('/api/general', generalRoutes);

//127.0.0.1 => es lo mismo que localhost
const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});


