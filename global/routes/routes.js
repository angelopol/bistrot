import { createMovieRouter } from '../../Modules/Movies/routes/movies.js'
import { createLoginRouter } from '../../Modules/Login/routes/login.js'
import { createRegisterRouter } from '../../Modules/Register/routes/register.js'

export const routes = ({app}) => {
    app.use('/movies', createMovieRouter())
    app.use('/login', createLoginRouter())
    app.use('/register', createRegisterRouter())
}