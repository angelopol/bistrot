import connection from "../conexion.js"
import { logged } from "../../Login/middlewares/logged.js"
import { VerifyCargo } from "../../Register/middlewares/cargo.js"

export class RecursosHumanos {

    create = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'RRHH')) return
        res.render('rrhh/rrhh')
    }
    informe = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'RRHH')) return
        res.render('rrhh/informe')
    }

    horarios = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'RRHH')) return
        res.render('rrhh/horarios')
    }

    form = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'RRHH')) return
        res.render('rrhh/form')
    }
    solicitudes = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'RRHH')) return
        res.render('rrhh/solicitudes')
    }

    entradas = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'RRHH')) return
        res.render('rrhh/entradas')
    }

    ausensias = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'RRHH')) return
        res.render('rrhh/ausensias')
    }

    baja = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'RRHH')) return
        res.render('rrhh/baja')
    }

    GetStyle = async (req, res) => {
        res.sendFile(process.cwd() + '/views/rrhh/css/styles.css')
    }

    getStyle = async (req, res) => {
        res.sendFile(process.cwd() + '/views/rrhh/css/horarios.css')
    }

    GetStyles = async (req, res) => {
        res.sendFile(process.cwd() + '/views/rrhh/css/header.css')
    }

    getStyles = async (req, res) => {
        res.sendFile(process.cwd() + '/views/rrhh/css/form.css')
    }

    getStyless = async (req, res) => {
        res.sendFile(process.cwd() + '/views/rrhh/css/entradas.css')
    }

    GetStyless = async (req, res) => {
        res.sendFile(process.cwd() + '/views/rrhh/css/ausensias.css')
    }

    formulario = async (req, res) => {
        res.sendFile(process.cwd() + '/views/rrhh/form.ejs')
    }

    empleados = async (req, res) => {
        try {
            const [results, fields] = await connection.query('SELECT * FROM empleados');
            res.json(results);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    entrada = async (req, res) => {
        const { fecha } = req.query; // Extrae la fecha de los parámetros de la consulta
        try {
            // Asegúrate de que la fecha esté en el formato correcto
            const [results, fields] = await connection.query(`
                SELECT entradas.cedula, empleados.nombre , 
                    MIN(DATE_FORMAT(entradas.hora_entrada, "%H:%i:%s")) AS primer_marcaje, 
                    MAX(DATE_FORMAT(entradas.hora_entrada, "%H:%i:%s")) AS ultimo_marcaje 
                FROM entradas 
                left join empleados on entradas.cedula = empleados.cedula
                WHERE DATE(hora_entrada) = ? 
                GROUP BY cedula, nombre`, [fecha]);
            res.json(results);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    

    GetUsuario = async (req, res) => {
        var user = logged(req, res)
        if (!user) return null
        return res.json(user);
    }
}  