// Selecciona el formulario específico por su id
var form = document.getElementById('form1');

//variable donde se guarda el id de los productos cuando se selecciona un registro en la tabla
let idd

// Agrega el evento 'submit' al formulario
form.addEventListener('submit', function(event) {
    
    // Selecciona el select dentro del formulario actual
    var select = form.querySelector('select');
    // Si el botón presionado tiene el valor "Modificar"
    if (event.submitter.value === 'Modificar') {
        
        // Cambia la acción del formulario para incluir el ID y usar el método PATCH
        form.action = '/compras-index/compras-prod/' + idd + '?_method=PATCH';
    } else {
        // Si el botón presionado no es "Modificar", usa la acción por defecto
        form.action = '/compras-index/compras-prod'; 
    }
});
//Evento para agregar dinamicamente el nombre para poder utilizar la ruta /prod/:
document.getElementById('delete-form').addEventListener('submit', function (e) {
    const select = document.getElementById('select-prod');
    const selectedOption = select.options[select.selectedIndex];
    const nombre = selectedOption.value;

    if (nombre) {
        this.action = `/compras-index/compras-prod/${nombre}?_method=DELETE`;
    }
});

//Buttos
//Boton de Agregar
registrar = document.getElementById('btn-regis')
//Boton de Modificar
modificar = document.getElementById('btn-modi')
modificar.disabled = true
//Boton de Eliminar
eliminar = document.getElementById('delete-prov-btn')

//variable donde se guarda el id de los productos cuando se selecciona un registro en la tabla


//Inputs
nombre = document.getElementsByClassName('name-prov')[0]
//Unidades de Consumo
unid_cons = document.getElementsByClassName('cons-prov')[0]
//Unidades de Compra
unid_comp = document.getElementsByClassName('comp-prov')[0]
//Tabla de producto
const tabla = document.getElementById('tabla-comp')
function seleccionarFila(event){
    const filaSeleccionada = event.target.closest('tbody tr')
    if (filaSeleccionada ){
        idd = filaSeleccionada.cells[0].textContent
        const product = filaSeleccionada.cells[1].textContent
        const udsComp = filaSeleccionada.cells[2].textContent
        const udsCons = filaSeleccionada.cells[3].textContent
        
        modificar.disabled = false
        nombre.value = product
        unid_cons.value = udsCons
        unid_comp.value = udsComp
    }
    
}

//Evento para poder clickear tabla
tabla.addEventListener('click',seleccionarFila)




//Boton de Limpiar
//AQUIIII
//Cuando le apliques el evento de seleccionar la fila
//Usas registrar.style.display = 'none'
//Para que se ponga invisible
limpiar = document.getElementById('btn-clear')

limpiar.onclick = function(){
    idd = null
    console.log(idd)
    nombre.value = ''
    unid_cons.value = ''
    unid_comp.value = ''
    registrar.style.display = 'flex'
    modificar.disabled = true
}

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
  window.location.href = '/compras-index'
}
// Validaciones
registrar.onclick = function ocupar(event){
    if(nombre.value.length == 0 || unid_cons.value.length == 0 || unid_comp.value.length == 0){
        alert("Tiene que llenar los campos de texto para poder registrar producto")
    }
}
modificar.onclick = function ocupar(event){
    if(nombre.value.length == 0 || unid_cons.value.length == 0 || unid_comp.value.length == 0){
        alert("Tiene que llenar los campos de texto para poder modificar un producto")
    }else{
        console.log("Modificando producto")
    }
}

//valdiacion para la entrada de palabras
nombre.onkeypress = function(e){
    var regex = /^[a-zA-Z\s]+$/
    if(!e.key.match(regex)){
        e.preventDefault()
    }
}
unid_comp.onkeypress = function(e){
    var regex = /^[a-zA-Z\s]+$/
    if(!e.key.match(regex)){
        e.preventDefault()
    }
}
unid_cons.onkeypress = function(e){
    var regex = /^[a-zA-Z\s]+$/
    if(!e.key.match(regex)){
        e.preventDefault()
    }
}