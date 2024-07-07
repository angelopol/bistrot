let registro = document.getElementById('tabla-registro')
//Tabla Contiene un thead y un tbody, tbody vacio, rellenar
let regisbody = document.getElementById('tabla-registro-body')
//Por si es necesario, directamente el body

let saldo = document.getElementById('saldo')
//Saldo a modificar

let solicitudes = document.getElementById('tabla-soli')
//Tabla Contiene un thead y un tbody, tbody vacio, rellenar
let solibody = document.getElementById('tabla-soli-body')
//Por si es necesario, directamente el body

//Modificacion del saldo
//Dependiendo de las solicitudes que se haga el saldo van a ir disminuyendo

function disminuirSaldo(costo){
    const saldoNum = parseInt(saldo.textContent)
    const resultado = parseInt(saldoNum - costo)
    return resultado
}
let result = disminuirSaldo(1000)
//Funcionalidad del boton compra
let comprar = document.getElementById("btn-compra").addEventListener('click',() =>{
    saldo.innerHTML = result

})