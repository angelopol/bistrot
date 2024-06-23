import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = () => {
  const moviesRouter = Router()

  const movieController = new MovieController()

  moviesRouter.get('/index', async (req, res) => {
    res.render('Movies/index')
  })

  moviesRouter.get('/assets/style.css', async (req, res) => {
    res.sendFile(process.cwd() + '/views/Movies/assets/style.css')
  })
  
  moviesRouter.get('/', movieController.getAll)
  moviesRouter.post('/', movieController.create)

  moviesRouter.get('/:id', movieController.getById)
  moviesRouter.delete('/:id', movieController.delete)
  moviesRouter.patch('/:id', movieController.update)

  return moviesRouter
}