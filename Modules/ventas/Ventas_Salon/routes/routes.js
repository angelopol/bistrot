const express = require('express');
const ControllerVentasSalon = require('../controllers/ventas_salon');


const createVentasSalon = () => {

    const router = express.Router();
    const controllerVentasSalon = new ControllerVentasSalon()

    // Rutas de Caja
    router.get('/caja', controllerVentasSalon.getAll_c);
    router.get('/caja/:id', controllerVentasSalon.getById_c);
    router.post('/caja', controllerVentasSalon.create_c);
    router.put('/:id', controllerVentasSalon.update_c);
    router.delete('/caja/:id', controllerVentasSalon.delete_c);

    // Rutas de Salón
    router.get('/salon', controllerVentasSalon.getAll_s);
    router.get('/salon/:id', controllerVentasSalon.getById_s);
    router.post('/salon', controllerVentasSalon.create_s);
    router.put('/salon/:id', controllerVentasSalon.update_s);
    router.delete('/salon/:id', controllerVentasSalon.delete_s);

    // Rutas de Cliente
    router.get('/cliente', controllerVentasSalon.getAll_cl);
    router.get('/cliente/:id', controllerVentasSalon.getById_cl);
    router.post('/cliente', controllerVentasSalon.create_cl);
    router.put('/cliente/:id', controllerVentasSalon.update_cl);
    router.delete('/cliente/:id', controllerVentasSalon.delete_cl);

    // Rutas de Factura
    router.get('/factura', controllerVentasSalon.getAll_f);
    router.get('/factura/:id', controllerVentasSalon.getById_f);
    router.post('/factura', controllerVentasSalon.create_f);
    router.put('/factura/:id', controllerVentasSalon.update_f);
    router.delete('/factura/:id', controllerVentasSalon.delete_f);

    return controllerVentasSalon;

}

module.exports = createVentasSalon;
