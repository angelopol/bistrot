import { createApp } from './app.js'

import { ProductoModel } from '../Register/models/modeloCompra/Productos.js'

import { HistorialModel } from '../Register/models/modeloCompra/historial.js'

import { ProveedoresModel } from '../Register/models/modeloCompra/proveedor.js'

import { SolicitudModel } from '../Register/models/modeloCompra/solicitud.js'

createApp({ productoModel: ProductoModel, historialModel: HistorialModel, proveedoresModel: ProveedoresModel, solicitudModel: SolicitudModel })