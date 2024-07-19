import express, { json } from 'express' // require -> commonJS
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'
import { corsMiddleware } from 'file:///C:/Repositorios/cont/bistrot/global/middlewares/cors.js'
import { authenticated } from 'file:///C:/Repositorios/cont/bistrot/global/middlewares/auth.js'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import 'dotenv/config'
import { InventarioMesasController } from './controllers/controlador.js';
import {ReservaController} from './controllers/reserva.js';

    const controladorInventario= new InventarioMesasController();
    const controladorReserva = new ReservaController();
    const app = express()
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use(express.static(path.join(__dirname, 'views')));
    app.set('view engine', 'ejs');
    app.use(methodOverride('_method'));
    app.use(json()) 
    app.use(cookieParser())
    app.use(corsMiddleware())
    app.use((req, res, next) => {authenticated(req, res, next)})
    app.disable('x-powered-by')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static(path.join(__dirname, 'routes')));
    //Vista para el modulo de reservas

    app.get('/',controladorInventario.mostrarReserva);

    app.get('/css/reservas.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/reservacion.css'))
    });
    app.get('/css/mesa.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/mesas.css'))
    });
    app.get('/bar',controladorInventario.mostrarBar);

    app.get('/css/bares.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/bar.css'))
    });

    app.get('/modificar/:id',controladorInventario.mostrarModificar);
    app.get('css/modificar.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/modificarReserva.css'))
    });

    app.get('/mesas',controladorInventario.mostrarMesas);
    
    app.get('/css/mesass.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/mesas.css'))
    });

    app.get('/CrearReservas',controladorInventario.mostrarCrearReservas);

    app.get('/css/crearReservas.css',(req,res)=>{
        res.sendFile(path.join(__dirname, 'views/CrearReservas.css'))
    });
    
    app.post('/mesas/CrearReservas/crear',controladorReserva.create);

    app.delete('/eliminar/:id',controladorReserva.delete);

    app.post('/modificarr/:id',controladorReserva.update);

    const PORT = process.env.PORT ?? 1234
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })



