import { ComidaModel } from '../models/mysql/comida.js'
//import { ComidaModel } from "../models/local-file-system/comida.js"
import { validateComida, validatePartialComida } from '../schemas/comidas.js'
import { logged } from "../../Login/middlewares/logged.js"

export class ComidaController{
    getAll = async (req, res) => {
        if (logged(req, res, false, false)) return
        const { tipo_comida } = req.query
        const {tipo_bebida} = req.query
        const comidas = await ComidaModel.getAll({tipo_comida , tipo_bebida})
        // que es lo que renderiza
        res.json(comidas)
    }

    getForId = async (req, res) => {
        if (logged(req, res, false, false)) return
        const { id } = req.params
        const comida = await ComidaModel.getForId({id})
        if (comida) return res.json(comida)
        res.status(404).json({ message: 'Comida not found' })
    }

    create = async (req, res) => {
        if (logged(req, res, false, false)) return
        const result = validateComida(req.body)
  
        if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const input = result.data
        const newComida = await ComidaModel.create({input})
        res.status(201).json(newComida)
    }
        
    delete = async (req, res) => {
        if (logged(req, res, false, false)) return
        const { id } = req.params
        const condicion = await ComidaModel.delete({id})
      
        if (!condicion) {
          return res.status(404).json({ message: 'Comida not found' })
        }
      
        return res.json({ message: 'Comida deleted' })
    }    

    update = async (req, res) => {
        if (logged(req, res, false, false)) return
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
