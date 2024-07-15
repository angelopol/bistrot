import { ComidaModel } from '../models/mysql/comida.js'
//import { ComidaModel } from "../models/local-file-system/comida.js"
import { validateComida, validatePartialComida } from '../schemas/comidas.js'

export class ComidaController{
    static async getAll (req, res) {
        const { tipo_comida } = req.query
        const {tipo_bebida} = req.query
        const comidas = await ComidaModel.getAll({tipo_comida , tipo_bebida})
        // que es lo que renderiza
        res.json(comidas)
    }

    static async getForId (req, res) {
        const { id } = req.params
        const comida = await ComidaModel.getForId({id})
        if (comida) return res.json(comida)
        res.status(404).json({ message: 'Comida not found' })
    }

    static async create (req, res) {
        const result = validateComida(req.body)
  
        if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const input = result.data
        const newComida = await ComidaModel.create({input})
        res.status(201).json(newComida)
    }
        
    static async delete (req, res) {
        const { id } = req.params
        const condicion = await ComidaModel.delete({id})
      
        if (!condicion) {
          return res.status(404).json({ message: 'Comida not found' })
        }
      
        return res.json({ message: 'Comida deleted' })
    }    

    static async update (req, res) {
        const result = validatePartialComida(req.body)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
  
        const { id } = req.params
        const input = result.data
        const condicion = await ComidaModel.update({id,input})
        if (condicion == false) {
            res.status(404).json({ message: 'Comida not found' })
        }
        return res.json(condicion)  
    }
}

export class RenderController{
    // Renderizado de views??
    renderProduccion = async (req, res) => {
        res.render("/cocina/produccion")
    }
    renderCocinaAbierta = async (req, res) => {
        res.render("/cocina/cocinaAbiertaProduciendo")
    }
    renderInstrumentos = async (req, res) => {
        res.render("/cocina/instumentos")
    }
    renderEntradas = async (req, res) => {
        res.render("/cocina/Entradas")
    }
    renderPlatosFuertes = async (req, res) => {
        res.render("/cocina/PlatosFuertes")
    }
    renderVegetariano = async (req, res) => {
        res.render("/cocina/Vegetariano")
    }
    renderPostres = async (req, res) => {
        res.render("/cocina/Postres")
    }
    renderInfantil = async (req, res) => {
        res.render("/cocina/infantil")
    }
    renderBebidas = async (req, res) => {
        res.render("/cocina/Bebidas")
    }

    renderCSS = async (req, res) => {
        res.sendFile(process.cwd() + '/views/cocina/css/Menu.css')
    }
}
