import { validateInstrumento, validatePartialInstrumento } from './schemas/instrumentos.js'
import { InstrumentoModel } from '../models/local-file-system.js/instrumento.js'

export class InstrumentoController {
    static async getAll (req, res) {
        const { funciona } = req.query
        const instrumentos = await InstrumentoModel.getAll({ funciona })
        res.json(instrumentos)
    }

    static async getById (req, res) {
        const { id } = req.params
        const instrumento = await InstrumentoModel.getById({ id })
        if (instrumento) return res.json(instrumento)
        res.status(404).json({ message: 'instrumento not found' })
      }

    static async create (req, res) {
        const result = validateInstrumento(req.body)
      
        if (!result.success) {
          // 422 Unprocessable Entity
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        
        const newinstrumento = await InstrumentoModel.create({input: result.data})
      
        res.status(201).json(newinstrumento)
      }

    static async delete (req, res) {
        const { id } = req.params
        
        const result = await InstrumentoModel.delete({ id })
        if (result === false) {
          return res.status(404).json({ message: 'instrumento not found' })
          }
        
        return res.json({ message: 'instrumento deleted' })
      }
    
      static async update (req, res) {
        const result = validatePartialInstrumento(req.body)
      
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
      
        const { id } = req.params
    
        const updatedInstrumento = await InstrumentoModel.update({ id })
        return res.json(updatedInstrumento)
      }
}