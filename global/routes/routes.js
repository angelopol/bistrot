import { createMovieRouter } from '../../Movies/routes/movies.js'

export const routes = ({app}) => {
    app.use('/movies', createMovieRouter())
}