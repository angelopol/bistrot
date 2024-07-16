const express = require('express');
const app = express();
const port = 3000;

// Importar las rutas
const routes = require('./routes');

// Usar las rutas
app.use('/', routes);

// Servir archivos estáticos
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
