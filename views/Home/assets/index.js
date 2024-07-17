btn = document.querySelectorAll('.img-btn')


for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('mouseover', function() {
        let green = this.querySelector('.green')
        let white = this.querySelector('.white')
        green.style.display = 'none'
        white.style.display = 'flex'
    })
    btn[i].addEventListener('mouseout', function() {
        let green = this.querySelector('.green')
        let white = this.querySelector('.white')
        green.style.display = 'flex'
        white.style.display = 'none'
    })
}