
function cambiar(IDdestino){
    alert('dsdads')
    let destino = document.getElementById(IDdestino)
    let origen = document.querySelectorAll('.visible')
    origen.forEach(div => {
        div.classList.remove('visible');
        alert('se oculto')
    });
    alert('se muestra')
    destino.classList.add('visible')
}