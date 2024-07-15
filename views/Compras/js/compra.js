let campoId = document.getElementById('id-solicitud')
const tabla = document.getElementById('tabla-comp')
function seleccionarFila(event){
    const filaSeleccionada = event.target.closest('tbody tr')
    if (filaSeleccionada ){
        idd = filaSeleccionada.cells[0].textContent
        const product = filaSeleccionada.cells[1].textContent
        const cant = filaSeleccionada.cells[2].textContent
        
        
        //modificar.disabled = false
        campoId.value = idd
        selectproducto.value = product
        cantidad.value = cant
        
    }
    
}
//Evento para poder clickear tabla
tabla.addEventListener('click',seleccionarFila)
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
cantidad.onkeypress = function(e) {
    var regex = /^[0-9]+$/;
    if (!e.key.match(regex)){
        e.preventDefault();
    }
};
//AQUIIII
btn_filtro = document.getElementById('btn-filtrar')
let selectproveedor = document.getElementById('select-prov')
//Combobox del Proveedor del producto
//Validar si el proveedor tiene ese producto
let btn_confirmar = document.getElementById('confirm-compra-btn')
//Boton que redirigira a la de Compra Exitosa
//Validando boton click todos los campos llenos
btn_confirmar.onclick = function(){
    if(selectproducto.value == 'Producto' || cantidad.value == '' || selectproveedor.value == 'Proveedor'){
        alert('Por favor, llene todos los campos')
    }else{
        document.getElementById('principal').style.display = 'none'
        document.getElementById('main').style.display = 'flex'
    }
}
let exit = document.getElementsByClassName('title-exit')[0]
//Boton de Exit
exit.onclick = function(){
    location.href = '/compras-index'
}