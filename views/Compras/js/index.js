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
    window.location.href = 'compras-index/prov'
}

let btn_compra = document.getElementById('btn-compra')
//Boton de View Realizar Compra

btn_compra.onclick = function(){
    window.location.href = 'compras-index/compra'
}

let btn_prod = document.getElementById('btn-prod')

btn_prod.onclick = function(){
    window.location.href = 'compras-index/compras-prod'
}

let btn_soli = document.getElementById('btn-soli')

btn_soli.onclick = function(){
    window.location.href = 'compras-index/soli'
}
