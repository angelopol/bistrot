import express, { json } from 'express' // require -> commonJS
import { corsMiddleware } from './global/middlewares/cors.js'
import { routes } from './global/routes/routes.js'
import { authenticated } from "./global/middlewares/auth.js"
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import 'dotenv/config'
import path from 'path'

const app = express()

// Calculate __dirname equivalent in ES module scope
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Correct for Windows paths starting with a "/"
if (process.platform === "win32") __dirname = __dirname.substring(1);

app.set('view engine', 'ejs')

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

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