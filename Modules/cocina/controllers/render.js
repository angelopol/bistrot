import { logged } from "../../Login/middlewares/logged.js"
import { VerifyCargo } from "../../Register/middlewares/cargo.js"

export class RenderController{
    // Renderizado de views??
    renderProduccion = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Cocinero')) return
        res.render("cocina/produccion");
    }
    renderCocinaAbierta = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Cocinero')) return
        res.render("cocina/cocinaAbiertaProduciendo");
    }
    renderBarAbierto = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Cocinero')) return
        res.render("cocina/BarAbiertoProduciendo")
    }
    renderInstrumentos = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Cocinero')) return
        res.render("cocina/instrumentos");
    }
    renderEntradas = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Cocinero')) return
        res.render("cocina/Entradas");
    }
    renderPlatosFuertes = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Cocinero')) return
        res.render("cocina/PlatosFuertes");
    }
    renderVegetariano = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Cocinero')) return
        res.render("cocina/Vegetariano");
    }
    renderPostres = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Cocinero')) return
        res.render("cocina/Postres");
    }
    renderInfantil = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Cocinero')) return
        res.render("cocina/infantil");
    }
    renderBebidas = async (req, res) => {
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Cocinero')) return
        res.render("cocina/Bebidas");
    }

    renderCSS = async (req, res) => {
        res.sendFile(process.cwd() + '/views/cocina/css/Menu.css');
    }
}