//Textos donde Ingresar los datos
producto = document.getElementById('producto')
fecha = document.getElementById('fecha')
cantidad = document.getElementById('cantidad')
precio = document.getElementById('precio')
//Saldos Previo - Actual
previo = document.getElementById('previo')
actual = document.getElementById('actual')
//numero de Orden
orden = document.getElementById('orden')


let exit = document.getElementsByClassName('title-exit')[0]
//Boton de Exit

exit.onclick = function(){
    location.href = '/compra'
}


//Boton de Regresar
let btn_exit = document.getElementById('btn-regis')

btn_exit.onclick = function(){
    location.href = '/compra'
}