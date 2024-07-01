const express = require('express');
const { errorMiddleware } = require('../middlewares/errores');
const createVentasRouter = require('../routes/routes')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

// Conectar a la base de datos
require('../models/conexion');

app.use(bodyParser.json());

// Rutas
app.use('/api/ventas_salon', createVentasRouter);

// Middleware de manejo de errores
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Servidor escuchando en el puerto http://127.0.0.1:${PORT}`);
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
