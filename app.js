import express, { json } from 'express';
import { corsMiddleware } from './global/middlewares/cors.js';
import { routes } from './global/routes/routes.js';
import { authenticated } from "./global/middlewares/auth.js";
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Obtener dirname en ES6
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(dirname, 'views')); // Configurar el directorio de vistas

app.use(json());
app.use(cookieParser());
app.use(corsMiddleware());
app.use((req, res, next) => {authenticated(req, res, next)});
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(dirname, 'public')));

routes({ app });

const PORT = process.env.PORT ?? 1234;
app.listen(PORT, () => {
  console.log("server listening on port http://localhost:"+PORT);
});