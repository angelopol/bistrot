import express, { json } from 'express';
import { corsMiddleware } from './global/middlewares/cors.js';
import { routes } from './global/routes/routes.js';
import { authenticated } from "./global/middlewares/auth.js";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url'; // Para convertir la URL a una ruta de archivo
import { createRRHHRouter } from './Modules/RRHH/routes/rrhh.js'; // Importar el router de RRHH

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.use(json());
app.use(cookieParser());
app.use(corsMiddleware());
app.use((req, res, next) => { authenticated(req, res, next) });
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Usar las rutas definidas en rrhh.js
app.use('/', createRRHHRouter());

routes({ app });

const PORT = process.env.PORT ?? 1234;
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
