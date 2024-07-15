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
    location.href = '/compras-index'
}
//Validaciones
function validarNumero(e){
    //Funcion isNaN verifica si es numero, si es numero retornara False
    if (isNaN(e.key)){
        if (e.key != 'Backspace'){
            e.preventDefault()
        }
    }
    
}
cantidad.addEventListener("keydown",event => validarNumero(event))

// validacion al boton confirmar
btn_confirmar.onclick = function validar(){
    if(selectproducto.selectedIndex == 0 || cantidad.value.length == 0 || selectproveedor.selectedIndex == 0){
        alert("Se tien que llenar los campos para poder confirmar la compra")
    }
}