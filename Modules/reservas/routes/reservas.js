import {Router} from "express"
import {ReservaController} from '../controllers/reserva.js';
import { InventarioMesasController } from '../controllers/controlador.js';

export const reservasRouter = Router()

const reserv= new ReservaController();

reservasRouter.get('/',reserv.getAll);

reservasRouter.get('/CrearReservas',reserv.create);

reservasRouter.get('/reservaciones/crear',reserv.create);

reservasRouter.get('/reservaciones/eliminar/:id',reserv.delete);

reservasRouter.get('/reservaciones/:id',reserv.getForId);

const controladorInventario= new InventarioMesasController();

reservasRouter.get('/',controladorInventario.mostrarReserva);

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

reservasRouter.get('/CrearEvento',controladorInventario.mostrarCrearEvento);

reservasRouter.get('/css/crearEventos.css',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views/CrearEvento.css'))
});

reservasRouter.get('/Reporte',controladorInventario.mostrarReporte);

reservasRouter.get('/css/reportes.css',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views/Reporte.css'))
});

reservasRouter.get('/mesas',controladorInventario.mostrarMesas);

reservasRouter.get('/css/mesass.css',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views/mesas.css'))
});

reservasRouter.get('/CrearReservas',controladorInventario.mostrarCrearReservas);

reservasRouter.get('/css/crearReservas.css',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views/CrearReservas.css'))
}
);

