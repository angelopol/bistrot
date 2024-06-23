export class LoginController {
  show = async (req, res) => {
    res.render('Login/login')
  }

  GetStyle = async (req, res) => {
    res.sendFile(process.cwd() + '/views/Login/assets/style.css')
  }
}
