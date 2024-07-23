import { verificarInventario } from '../models/verificacion.js'
const pre = '/api'

export  const createVerificarRouter = (router) => {
  // Ruta para verificar inventario
  router.get(pre+'/verificar-inventario', (req, res) => {
    verificarInventario((pedidos) => {
      res.json(pedidos);
    });
  });

  return router
}