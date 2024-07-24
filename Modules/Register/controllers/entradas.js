// controllers/entradas.js
import { EntradasModel } from "../models/entradas.js";
import { logged } from "../../Login/middlewares/logged.js"
import { VerifyCargo } from "../../Register/middlewares/cargo.js"
import { EmpleadosModel } from "../models/empleados.js";

export class EntradasController {
    registrarEntrada = async (req, res) => {
        const { cedula } = req.body;
        const result = await EmpleadosModel.unique(cedula);

        if (!result) {
            return res.status(400).json({ error: "No se encontro el usuario" });
        }

        try {
            await EntradasModel.registrarEntrada(req, res, { cedula });
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
    update = async (req, res) => {
        if (logged(req, res, false, false)) return
        try {
            await EmpleadosModel.update(req.body);
            res.status(200).json({ message: 'Entrada registrada exitosamente' });
        } catch (e) {
            console.error('Error registrando entrada:', e);
            res.status(500).json({ error: 'Error registrando entrada' });
        }

    }
}