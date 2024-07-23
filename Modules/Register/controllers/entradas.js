// controllers/entradas.js
import { validateEntrada } from "../schemas/entradas.js";
import { EntradasModel } from "../models/entradas.js";
import { logged } from "../../Login/middlewares/logged.js"
import { VerifyCargo } from "../../Register/middlewares/cargo.js"

export class EntradasController {
    registrarEntrada = async (req, res) => {
        const result = await validateEntrada(req.body);
        console.log(req.body);

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        try {
            await EntradasModel.registrarEntrada(req.body);
            res.status(200).json({ message: 'Entrada registrada exitosamente' });
        } catch (e) {
            console.error('Error registrando entrada:', e);
            res.status(500).json({ error: 'Error registrando entrada' });
        }
    }

    create = async (req, res) => {
        if (!await VerifyCargo(req, res, 'RRHH')) return
        if (logged(req, res, false, false)) return
        res.render('register/entradas');  // Asegúrate de que la ruta y la vista existen
    }
}

