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

let btn_prov = document.getElementById('btn-prov')
//Boton de View Proveedores

btn_prov.onclick = function(){
    location.href = '../views/prov.ejs'
}

let btn_compra = document.getElementById('btn-compra')
//Boton de View Realizar Compra

btn_compra.onclick = function(){
    location.href = '../views/compra.ejs'
}

let btn_prod = document.getElementById('btn-prod')

btn_prod.onclick = function(){
    location.href = '../html/productos.html'
}

let btn_soli = document.getElementById('btn-soli')

btn_soli.onclick = function(){
    location.href = '../html/solicitud.html'
}

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