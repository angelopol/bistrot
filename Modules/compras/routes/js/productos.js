//Inputs
nombre = document.getElementById('name-prov')
//Unidades de Consumo
unid_cons = document.getElementById('cons-prov')
//Unidades de Compra
unid_comp = document.getElementById('comp-prov')

//Buttos
//Boton de Agregar
registrar = document.getElementById('btn-regis')
//Boton de Modificar
modificar = document.getElementById('btn-modi')
//Boton de Eliminar
eliminar = document.getElementById('delete-prov-btn')

//Tabla de los Producto
//Categorias: Producto-Unidades-Cantidad-Precio
let productos = document.getElementById('tabla-comp')
//Tabla Contiene un thead y un tbody, tbody vacio, rellenar
let prodbody = document.getElementById('tabla-comp-body')
//Por si es necesario, directamente el body

//Selector de Producto
let selectprod = document.getElementById('select-prov')


let exit = document.getElementsByClassName('title-exit')[0]
//Boton de Exit

exit.onclick = function(){
    location.href = '../html/index.html'
}