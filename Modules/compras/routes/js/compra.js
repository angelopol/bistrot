//Tabla de los Producto
//Categorias: Producto-Unidades-Cantidad-Precio
let productos = document.getElementById('tabla-comp')
//Tabla Contiene un thead y un tbody, tbody vacio, rellenar
let prodbody = document.getElementById('tabla-comp-body')
//Por si es necesario, directamente el body

let selectproducto = document.getElementById('select-prod')
//ComboBox del Producto seleccionado
let cantidad = document.getElementById('input-cant')
//Input de la cantidad del producto segun la unidad
let selectproveedor = document.getElementById('select-prov')
//Combobox del Proveedor del producto
//Validar si el proveedor tiene ese producto
let btn_confirmar = document.getElementById('confirm-compra-btn')
//Boton que redirigira a la de Compra Exitosa

let exit = document.getElementsByClassName('title-exit')[0]
//Boton de Exit

exit.onclick = function(){
    location.href = '../html/index.html'
}