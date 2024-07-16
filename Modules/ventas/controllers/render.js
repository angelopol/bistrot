//Renderizado de Vistas
export class RenderController{

    //Paginas 
    renderGerente= async(req,res)=>{
        res.render('ventas/gerente')
    }

    renderMeserosGeneral= async(req,res)=>{
        res.render('ventas/meserosgeneral')
    }

    renderMeserosTerraza= async(req,res)=>{
        res.render('ventas/meserosterraza')
    }
 
    renderCaja= async(req,res)=>{
        res.render('ventas/caja')
    }

    renderPedidos= async(req,res)=>{
        res.render('ventas/pedidos')
    }

    //Estilos

    stylesGerente = async (req, res) => {
        res.sendFile(process.cwd() + '/views/ventas/Vista_Gerente/styles_Gerente.css')
    }
    
    stylesMeserosGeneral = async (req, res) => {
        res.sendFile(process.cwd() + '/views/ventas/Vista Meseros/Zona_General.css')
    }

    stylesMeserosTerraza = async (req, res) => {
        res.sendFile(process.cwd() + '/views/ventas/Vista Meseros/Terraza_styles.css')
    }

    stylesCaja = async (req, res) => {
        res.sendFile(process.cwd() + '/views/ventas/Vista_Caja/Caja_Styles.css')
    }
    
    stylesPedidos = async (req, res) => {
        res.sendFile(process.cwd() + '/views/ventas/Vista_Pedidos/pedidos_styles.css')
    }

}