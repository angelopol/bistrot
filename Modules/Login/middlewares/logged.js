export const logged = (req, res, home = false) => {
    const {user} = req.session
    if (!user){
        if(!home){
            res.redirect('/login')
            return false
        }
        return true
    }
    if (home) {
        res.redirect('/login/home')
        return false
    }
    return user
}