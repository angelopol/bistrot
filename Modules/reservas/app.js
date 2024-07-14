import express, { json } from 'express' // require -> commonJS
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'
import { corsMiddleware } from 'file:///C:/Users/Usuario/OneDrive/Documentos/curso-github/bistrot/global/middlewares/cors.js'
import { authenticated } from 'file:///C:/Users/Usuario/OneDrive/Documentos/curso-github/bistrot/global/middlewares/auth.js'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import 'dotenv/config'
import { InventarioMesasController } from './controllers/controlador.js';
    const controladorInventario= new InventarioMesasController();
    const app = express()
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use(express.static(path.join(__dirname, 'views')));
    app.set('view engine', 'ejs')
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

    
    app.get('/bar',(req,res)=>{
        res.render('bar',{data: null})
    });
    app.get('/CrearReservas',(req,res)=>{
        
        res.render('CrearReservas',{data: null})
    });
    app.get('/reservacion',(req,res)=>{
        
        res.render('reservacion',{data: null})
    });
    app.get('/mesas',(req,res)=>{
        
        res.render('mesas',{data: null})
    });
    app.get('/CrearEvento',(req,res)=>{
        res.render('evento',{data: null})
    });

    const PORT = process.env.PORT ?? 1234
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    }
    )



