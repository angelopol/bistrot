import express, { json } from 'express' // require -> commonJS
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'
import { corsMiddleware } from 'file:///C:/Users/Usuario/OneDrive/Documentos/curso-github/bistrot/global/middlewares/cors.js'
//import { routes } from './routes/routes.js' 
import { authenticated } from 'file:///C:/Users/Usuario/OneDrive/Documentos/curso-github/bistrot/global/middlewares/auth.js'
import bodyParser from 'body-parser'
import { createComprasRouter } from './routes/compras.js'
import cookieParser from "cookie-parser"
import 'dotenv/config'