//Tabla con sus bodys
let tabla_productos = document.getElementById('tabla-prod')
let tabla_productos_body = document.getElementById('tabla-prov-body') 
let tabla_solicitud =  document.getElementById('tabla-soli')
let tabla_solicitud_body = document.getElementById('tabla-soli-body')

// Inputs and Selects
let producto =  document.getElementById('select-prod')
let cantidad =  document.getElementById('input-cant')
let departamento =  document.getElementById('select-depa')
let descripcion =  document.getElementsByClassName('input-data')[0]
let Idempleado = document.getElementById('input-id')
//Select o combobox del select de solicitud
//Poner aqui toda solicitud que se emita
let solicitud =  document.getElementById('select-soli')

// Buttons
let btnAcept = document.getElementById('btn-acept')
let btnRech = document.getElementById('btn-rech')
let btnEnviar = document.getElementById('btn-enviar')

let exit = document.getElementsByClassName('title-exit')[0]
//Boton de Exit

exit.onclick = function(){
    location.href = '/compras-index'
}
//Validaciones

//Funcion que valida si la entrada recibe un numero
function validarNumero(e){
    //Funcion isNaN verifica si es numero, si es numero retornara False
    if (isNaN(e.key)){
        if (e.key != 'Backspace'){
            e.preventDefault()
        }
    }
}
cantidad.addEventListener('keydown',event => validarNumero(event))
Idempleado.addEventListener('keydown',event => validarNumero(event))

btnEnviar.onclick = function validar(){
    if(producto.selectedIndex == 0 || cantidad.value.length == 0 || departamento.selectedIndex == 0 || 
        descripcion.value.length == 0 || Idempleado.value.length == 0){
            alert("Tiene que llenar los campos para poder mandar la solicitud")
        }
}
btnAcept.onclick = function validar(){
    if(solicitud.selectedIndex == 0){
        alert("Tiene que seleccionar el id de la requisicion")
    }
}
