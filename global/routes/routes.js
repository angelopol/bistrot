import { createMovieRouter } from '../../Movies/routes/movies.js'
import { createLoginRouter } from '../../Login/routes/login.js'

export const routes = ({app}) => {
    app.use('/movies', createMovieRouter())
    app.use('/login', createLoginRouter())
}