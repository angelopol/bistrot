//Inputs
nombre = document.getElementsByClassName('name-prov')[0]
//Unidades de Consumo
unid_cons = document.getElementsByClassName('cons-prov')[0]
//Unidades de Compra
unid_comp = document.getElementsByClassName('comp-prov')[0]

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
    window.location.href = '/'
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
    }
}

//valdiacion para la entrada de palabras
function validLetra(e){
    var key = e.keyCode || e.which,
      tecla = String.fromCharCode(key).toLowerCase(),
      letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
      especiales = [8, 37, 39, 46],
      tecla_especial = false;

    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
}
