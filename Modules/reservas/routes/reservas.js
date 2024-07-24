import {Router} from "express"
import {ReservaController} from '../controllers/reserva.js';
import { InventarioMesasController } from '../controllers/controlador.js';

export const createReservasRouter = () => {
    const reservasRouter = Router()
    const controladorReserva= new ReservaController();
    const controladorInventario= new InventarioMesasController();

    reservasRouter.get('/',controladorInventario.mostrarReserva);

    reservasRouter.get('/obtener-reservas', controladorReserva.getAll)

    reservasRouter.get('/css/reservas.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/reservacion.css'))
    });
    reservasRouter.get('/css/mesa.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/mesas.css'))
    });
    reservasRouter.get('/bar',controladorInventario.mostrarBar);

    reservasRouter.get('/css/bares.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/bar.css'))
    });

    reservasRouter.get('/modificar/:id',controladorInventario.mostrarModificar);
    reservasRouter.get('css/modificar.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/modificarReserva.css'))
    });

    reservasRouter.get('/mesas',controladorInventario.mostrarMesas);
    
    reservasRouter.get('/css/mesass.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/mesas.css'))
    });

    reservasRouter.get('/reportes',controladorInventario.mostrarReporte);

    reservasRouter.get('/CrearReservas',controladorInventario.mostrarCrearReservas);

    reservasRouter.get('/css/crearReservas.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/CrearReservas.css'))
    });

    reservasRouter.get('/reportesCocina',controladorInventario.mostrarReporteCocina);
    
    reservasRouter.post('/mesas/CrearReservas/crear',controladorReserva.create);

    reservasRouter.post('/reservas/reportesCocina/:id',controladorReserva.update);


    return reservasRouter
}