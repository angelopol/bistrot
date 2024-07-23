import { logged } from "../../Login/middlewares/logged.js"
import { VerifyCargo } from "../../Register/middlewares/cargo.js"

export class InventarioController {
    index = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Inventario')) return
        res.render('inventario/index')
    }
}  