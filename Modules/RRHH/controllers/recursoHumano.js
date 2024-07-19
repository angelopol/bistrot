import connection from "../conexion.js"


export class RecursosHumanos {

    create = async (req, res) => {
        res.render('rrhh/rrhh')
    }
    informe = async (req, res) => {
        res.render('rrhh/informe')
    }

    horarios = async (req, res) => {
        res.render('rrhh/horarios')
    }

    form = async (req, res) => {
        res.render('rrhh/form')
    }

    entradas = async (req, res) => {
        res.render('rrhh/entradas')
    }

    ausensias = async (req, res) => {
        res.render('rrhh/ausensias')
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


    Registrar = async (req, res) => {
        Conexion.query('Inser into empleados value(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            req.body.cargo, 
            req.body.FechaInicio,
            req.body.FechaCulminacion,
            req.body.salario,
            req.body.horas,
            req.body.semana,
            req.body.nombre,
            req.body.apellido,
            req.body.cedula,
            req.body.tlf,
            req.body.direccion,
            req.body.codigo,
            req.body.clave,
        ], function (error, results, fields) {
            res.send(results);
        });
    }

    formulario = async (req, res) => {
        res.sendFile(process.cwd() + '/views/rrhh/form.ejs')
    }
}  