// Importar la función verificarInventario
const verificarInventario = require('./verificacion');

// Llamar a la función verificarInventario para probarla
verificarInventario((pedidos) => {
  // Imprimir los resultados de la función verificarInventario
  console.log('Pedidos:', pedidos);
});
