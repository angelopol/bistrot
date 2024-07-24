import { EmpleadosModel } from '../models/empleados.js';

export const VerifyCargo = async (req, res, cargo) => {
    const {user} = req.session
    if (user == null) {
        res.redirect('/login/home')
        return false
    }
    const DbUser = await EmpleadosModel.findUser({ user: user.user })
    if (DbUser.Puesto == cargo || DbUser.Puesto == 'Gerente') {
        return true
    } else {
        res.redirect('/login/home')
        return false
    }
}