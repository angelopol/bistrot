import express, { json } from 'express' // require -> commonJS
import { corsMiddleware } from 'file:///C:/Users/Usuario/OneDrive/Documentos/modulo-compras/bistrot/global/middlewares/cors.js'
//import { routes } from './routes/routes.js'
import { authenticated } from 'file:///C:/Users/Usuario/OneDrive/Documentos/modulo-compras/bistrot/global/middlewares/auth.js'
import bodyParser from 'body-parser'
import { createComprasRouter } from './routes/compras.js'
import cookieParser from "cookie-parser"
import 'dotenv/config'

export const createApp = ({ productoModel,historialModel,proveedoresModel,solicitudModel }) => {
    const app = express()
    app.set('view engine', 'ejs')
    app.use(json())
    app.use(cookieParser())
    app.use(corsMiddleware())
    app.use((req, res, next) => {authenticated(req, res, next)})
    app.disable('x-powered-by')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use('/compras', createComprasRouter({ productoModel,historialModel, proveedoresModel,solicitudModel }))
    //routes({ app })

    const PORT = process.env.PORT ?? 1234
    app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
    })
}