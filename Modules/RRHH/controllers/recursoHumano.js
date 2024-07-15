
export class RecursosHumanos {

    create = async (req, res) => {
        res.render('rrhh/rrhh')
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


}  