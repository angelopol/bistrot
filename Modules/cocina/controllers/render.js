export class RenderController{
    // Renderizado de views??
    renderProduccion = async (req, res) => {
        res.render("cocina/produccion");
    }
    renderCocinaAbierta = async (req, res) => {
        res.render("cocina/cocinaAbiertaProduciendo");
    }
    renderBarAbierto = async (req, res) => {
        res.render("cocina/BarAbiertoProduciendo")
    }
    renderInstrumentos = async (req, res) => {
        res.render("cocina/instrumentos");
    }
    renderEntradas = async (req, res) => {
        res.render("cocina/Entradas");
    }
    renderPlatosFuertes = async (req, res) => {
        res.render("cocina/PlatosFuertes");
    }
    renderVegetariano = async (req, res) => {
        res.render("cocina/Vegetariano");
    }
    renderPostres = async (req, res) => {
        res.render("cocina/Postres");
    }
    renderInfantil = async (req, res) => {
        res.render("cocina/infantil");
    }
    renderBebidas = async (req, res) => {
        res.render("cocina/Bebidas");
    }

    renderCSS = async (req, res) => {
        res.sendFile(process.cwd() + '/views/cocina/css/Menu.css');
    }
}