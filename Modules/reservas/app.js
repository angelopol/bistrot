import express, { json } from 'express' // require -> commonJS
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'
import { corsMiddleware } from 'file:///C:/Users/Usuario/OneDrive/Documentos/curso-github/bistrot/global/middlewares/cors.js'
//import { routes } from './routes/routes.js' 
import { authenticated } from 'file:///C:/Users/Usuario/OneDrive/Documentos/curso-github/bistrot/global/middlewares/auth.js'
import bodyParser from 'body-parser'
import { createReservasRouter } from ''
import cookieParser from "cookie-parser"
import 'dotenv/config'

export const createApp = ({ }) => {
    const app = express()
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.set('view engine', 'ejs')
    app.use(methodOverride('_method'));
    app.use(json()) 
    app.use(cookieParser())
    app.use(corsMiddleware())
    app.use((req, res, next) => {authenticated(req, res, next)})
    app.disable('x-powered-by')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use('/', createComprasRouter({}))
    app.use(express.static(path.join(__dirname, 'routes')));
    //Vista para el modulo de compras
    app.get('/',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('reserv',{data: null})
    });
    app.get('/bar',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('bar',{data: null})
    });
    app.get('/CrearReservas',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('CrearReservas',{data: null})
    });
    app.get('/reservacion',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('reservacion',{data: null})
    });
    app.get('/mesas',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('mesas',{data: null})
    });
    app.get('/CrearEvento',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('evento',{data: null})
    });

    const PORT = process.env.PORT ?? 1234
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    }
    )
}
