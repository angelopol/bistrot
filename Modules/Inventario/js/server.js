const express = require('express');
const verificarInventarioRouter = require('./routes/verificar-inventario'); // Ajusta la ruta a tu archivo verificar-inventario.js

const app = express();
const port = 3000;

// Usar la ruta para verificar inventario
app.use('/api', verificarInventarioRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
