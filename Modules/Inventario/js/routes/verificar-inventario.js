const express = require('express');
const verificarInventario = require('../verificacion'); // Importar la función correcta
const router = express.Router();

// Ruta para verificar inventario
router.get('/verificar-inventario', (req, res) => {
  verificarInventario((pedidos) => {
    res.json(pedidos);
  });
});

module.exports = router;
