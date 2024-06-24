import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const authenticated = (req, res, next) => {
    const token = req.cookies.access_token
    req.session = {user:null}

    try {
        var data = jwt.verify(token, process.env.JWT_SECRET)
        req.session.user = data
    } catch {}

    next()
}