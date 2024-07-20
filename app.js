import express, { json } from 'express'
import { corsMiddleware } from './global/middlewares/cors.js'
import { routes } from './global/routes/routes.js'
import { authenticated } from "./global/middlewares/auth.js"
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import 'dotenv/config'
import path from 'path' 
import { fileURLToPath } from 'url'

const app = express()
app.set('view engine', 'ejs')
app.use(json())
app.use(cookieParser())
app.use(corsMiddleware())
app.use((req, res, next) => {authenticated(req, res, next)})
app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes({ app })

const PORT = process.env.PORT ?? 3306
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

app.get('/mantenimientos', (req, res) => {
  res.render('mantenimientos/Pagina_principal.ejs', { title: 'Acerca de', message: 'Esta es la página Acerca de.' });
});

app.get('/mantenimientos/Pagina_contacto', (req, res) => {
  res.render('mantenimientos/Pagina_contacto.ejs', { title: 'Acerca de', message: 'Esta es la página Acerca de.' });
});
app.get('/mantenimientos/Pagina_agregarMantenimiento', (req, res) => {
  res.render('mantenimientos/Pagina_agregarMantenimiento.ejs', { title: 'Acerca de', message: 'Esta es la página Acerca de.' });
});

app.get('/mantenimientos/Pagina_reportes', (req, res) => {
  res.render('mantenimientos/Pagina_reportes.ejs', { title: 'Acerca de', message: 'Esta es la página Acerca de.' });
});

//app.use('/mantenimientos/static', express.static(('.', 'views', 'mantenimientos', 'public')))

app.use(express.static('views'))