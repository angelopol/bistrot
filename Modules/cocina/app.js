import express, { json } from 'express' // require -> commonJS
import {createCocinaRouter} from "./routes/cocina.js"
import {corsMiddlewares} from "./middlewares/cors.js"

const app = express()
app.use(json())
app.use(corsMiddlewares())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

const cocinaRouter = createCocinaRouter

app.use("/cocina" , cocinaRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
