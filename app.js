import express, { json } from 'express' // require -> commonJS
import { corsMiddleware } from './global/middlewares/cors.js'
import { routes } from './global/routes/routes.js'
import { authenticated } from "./global/middlewares/auth.js"
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import 'dotenv/config'

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

const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})