import mysql from 'mysql'
import { 
    getMantenimientos,
    getMantenimientoID,
    postMantenimiento,
    getContactos,
    getContactosID,
    postContactos,
    deleteContactos,
    deleteMantenimiento,
    }
    from './controller.js'
export const createMantenimientoApi = (MantenimientoRouter) => {
    MantenimientoRouter.get('/api/mantenimientos_realizar', getMantenimientos);
    MantenimientoRouter.get('/api/mantenimientos_realizar/:id', getMantenimientoID);
    MantenimientoRouter.post('/mantenimientos_realizar', postMantenimiento)
    MantenimientoRouter.delete('/mantenimientos_realizar/:id', deleteMantenimiento)
    MantenimientoRouter.get('/contactos', getContactos)
    MantenimientoRouter.get('/contactos/:id', getContactosID)
    MantenimientoRouter.post('/contactos', postContactos)
    MantenimientoRouter.delete('/contactos/:id', deleteContactos)
    return MantenimientoRouter
}