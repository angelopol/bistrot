//Renderizado de Vistas
export class RenderController{

    //Paginas 
    renderGerente= async(req,res)=>{
        res.render('ventas/Vista_Gerente/Ventas_Gerente')
    }

    renderMeserosGeneral= async(req,res)=>{
        res.render('ventas/Vista_Meseros/Mesero_Zona_General')
    }

    renderMeserosTerraza= async(req,res)=>{
        res.render('ventas/Vista_Meseros/Mesero_Terraza')
    }
    renderCaja= async(req,res)=>{
        res.render('ventas/Vista_Caja/Caja')
    }

    renderPedidos= async(req,res)=>{
        res.render('ventas/Vista_Pedidos/pedidos')
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