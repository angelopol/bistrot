
import { createLoginRouter } from '../../Modules/Login/routes/login.js'
import { createRegisterRouter } from '../../Modules/Register/routes/register.js'
import { createRRHHRouter } from '../../Modules/RRHH/routes/rrhh.js'
import { createReservasRouter } from '../../Modules/reservas/routes/reservas.js'
import { createInventarioRouter } from '../../Modules/Inventario/routes/inventario.js'
import { createVentasRouter } from '../../Modules/ventas/routes/ventas.js'
import { createComprasRouter } from '../../Modules/compras/routes/compras.js'
import { createCocinaRouter } from '../../Modules/cocina/routes/cocina.js'

export const routes = ({app}) => {
    app.use('/login', createLoginRouter())
    app.use('/register', createRegisterRouter())
    app.use('/rrhh', createRRHHRouter())
    app.use('/reservas', createReservasRouter())
    app.use('/inventario', createInventarioRouter())
    app.use('/ventas', createVentasRouter())
    app.use('/compras', createComprasRouter())
    app.use('/cocina', createCocinaRouter())
}