import express, { json } from 'express' // require -> commonJS
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'
import { corsMiddleware } from 'file:///C:/Users/Usuario/OneDrive/Documentos/modulo-compras/bistrot/global/middlewares/cors.js'
//import { routes } from './routes/routes.js' 
import { authenticated } from 'file:///C:/Users/Usuario/OneDrive/Documentos/modulo-compras/bistrot/global/middlewares/auth.js'
import bodyParser from 'body-parser'
import { createComprasRouter } from './routes/compras.js'
import cookieParser from "cookie-parser"
import 'dotenv/config'

export const createApp = ({ productoModel,historialModel,proveedoresModel,solicitudModel }) => {
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
    app.use('/', createComprasRouter({ productoModel,historialModel, proveedoresModel,solicitudModel }))
    app.use(express.static(path.join(__dirname, 'routes')));
    //Vista para el modulo de compras
    app.get('/',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('index',{data: null})
    });

    //Vista para las solicitudes en el modulo de compras
    app.get('/soli',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('solicitud',{data: null})
    });

    //Vista para los proveedores en el modulo de compras
    app.get('/prov',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('prov',{data: null})
    });

    app.get('/compra',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('compra')
    });

    app.get('/prod',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('productos',{data: null})
    });

    app.get('/compra/confirmacion',(req,res)=>{
        //res.sendFile(path.join (__dirname,'routes','html','index.html'))
        res.render('confirmacion')
    });

    //routes({ app })

    const PORT = process.env.PORT ?? 1234
    app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
    })
}