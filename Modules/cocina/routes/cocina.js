import {Router} from "express"
import { ComidaController } from "../controllers/comidas.js"
import { PedidoController } from "../controllers/pedidos.js"
import { RenderController } from "../controllers/render.js"

export const createCocinaRouter = () => {
    const cocinaRouter = Router()
    const comidaController = new ComidaController()
    const pedidoController = new PedidoController()
    const renderController = new RenderController()

    cocinaRouter.get("/" , comidaController.getAll) 

    cocinaRouter.get("/comida/:id" , comidaController.getForId)

    cocinaRouter.post("/", comidaController.create)

    cocinaRouter.delete("/comida/:id" , comidaController.delete)

    cocinaRouter.patch("/comida/:id" , comidaController.update)


    // este endpoint lo que hace es que le pasamos el id del pedido(factura de ventas) por la url, verifica si se puede realizar el pedido, retorna este pedido y con su atributo status_pedido se verifica si se acepto (3) o si se rechazo(2)
    cocinaRouter.get("/procesar-pedido", pedidoController.orderStatus)

    // este endpoint lo que hace es retornar el objeto pedido (factura de ventas) por su id  que le pasamos por la url y retorna este pedido
    cocinaRouter.get("/mostrar-pedido", pedidoController.getOrder)

    // este endpoint lo que hace es cambiar el status a listo, del pedido por id que se pasa por la url y retornar este pedido
    cocinaRouter.get("/pedido-listo", pedidoController.orderListaStatus)

    // Renderizado de vistas??
    cocinaRouter.get("/produccion", renderController.renderProduccion)
    cocinaRouter.get("/cocinaAbiertaProduciendo", renderController.renderCocinaAbierta)
    cocinaRouter.get("/BarAbiertoProduciendo", renderController.renderBarAbierto)
    cocinaRouter.get("/instrumentos", renderController.renderInstrumentos)
    cocinaRouter.get("/menu", renderController.renderEntradas)
    cocinaRouter.get("/Entradas", renderController.renderEntradas)
    cocinaRouter.get("/PlatosFuertes", renderController.renderPlatosFuertes)
    cocinaRouter.get("/Vegetariano", renderController.renderVegetariano)
    cocinaRouter.get("/Postres", renderController.renderPostres)
    cocinaRouter.get("/infantil", renderController.renderInfantil)
    cocinaRouter.get("/Bebidas", renderController.renderBebidas)
    cocinaRouter.get("/solpersonal", renderController.renderSolpersonal)

    cocinaRouter.get("/css/Menu.css", renderController.renderCSS)

    return cocinaRouter
}