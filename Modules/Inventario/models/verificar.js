// Importar la función verificarInventario
import { verificarInventario } from './verificacion.js';

// Llamar a la función verificarInventario para probarla
verificarInventario((pedidos) => {
  // Imprimir los resultados de la función verificarInventario
  console.log('Pedidos:', pedidos);
});
