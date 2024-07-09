import express, { json } from 'express' // require -> commonJS
import crypto from 'node:crypto'
import {comidasRouter} from "./routes/comidas.js"
import {corsMiddlewares} from "./middlewares/cors.js"

// import comidas from './comidas.json' --> no podemos importar un json directamente con ES modules

//importamos el json simulando un require, ver el archivo utils





const app = express()
app.use(json())
app.use(corsMiddlewares())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express


app.use("/comidas" , comidasRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
