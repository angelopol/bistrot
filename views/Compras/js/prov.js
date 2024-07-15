// Selecciona el formulario específico por su id
var form = document.getElementById('form1');

//variable donde se guarda el id (QUE ES EL RIF) de los productos cuando se selecciona un registro en la tabla
let idd

//Eliminar proveedor
document.getElementById('delete-form').addEventListener('submit', function (e) {
    const select = document.getElementById('select-prov');
    const selectedOption = select.options[select.selectedIndex];
    const nombre = selectedOption.value;

    if (nombre) {
        this.action = `/prov/${nombre}?_method=DELETE`;
    }
});

// Agrega el evento 'submit' al formulario
form.addEventListener('submit', function(event) {
    
    // Selecciona el select dentro del formulario actual
    var select = form.querySelector('select');
    // Si el botón presionado tiene el valor "Modificar"
    if (event.submitter.value === 'Modificar') {
        // Cambia la acción del formulario para incluir el ID y usar el método PATCH
        rif.readOnly = false;
        form.action = '/prov/' + idd + '?_method=PATCH';
    } else {
        // Si el botón presionado no es "Modificar", usa la acción por defecto
        form.action = '/prov';
    }
});

//Esto lo tengo que MODIFICARRR
//Aqui tengo que hacer una peticion a la base de datos para obtener los datos y poder modificarlos
const tabla = document.getElementById('tabla-prov')
function seleccionarFila(event){
    const filaSeleccionada = event.target.closest('tbody tr')
    if (filaSeleccionada ){
        
        idd = filaSeleccionada.cells[1].textContent
        nombre_prov.value = filaSeleccionada.cells[0].textContent
        rif.value = filaSeleccionada.cells[1].textContent
        direc_fis.value = filaSeleccionada.cells[6].textContent
        correo.value = filaSeleccionada.cells[3].textContent
        nombre_res.value = filaSeleccionada.cells[4].textContent
        tlf.value = filaSeleccionada.cells[5].textContent
        producto.value = filaSeleccionada.cells[2].textContent
        precioo.value = filaSeleccionada.cells[7].textContent
        rif.readOnly = true;
    }
    
}

//Evento para poder clickear tabla
tabla.addEventListener('click',seleccionarFila)

let proveedores = document.getElementById('tabla-prov')
//Tabla Contiene un thead y un tbody, tbody vacio, rellenar
let provbody = document.getElementById('tabla-prov-body')
//Por si es necesario, directamente el body
//Las Caterogias de la tabla son Empresa-RIF-Producto

let listaproveedores = document.getElementById('select-prov')
//ComboBox-DropBox como le llamen, lista de todos proveedores, para seleccionarlo
//Validar que el value no sea Proveedor ya que es el valor predeterminado
//Cuando se seleccione uno que sus datos aparezcan en los inputs

let btn_delete = document.getElementById('delete-prov-btn')
//Boton que Elimina a un proveedor en el combobox

let btn_add = document.getElementById('data-title-btn')
let btn_modi = document.getElementById('data-title-modi')
//Botones que agrega o modifica un proveedor validado por los inputs
//Validar que si el proveedor ya existe que lo modifique

//Inputs - Datos del Proveedor
let precioo = document.getElementsByClassName('pre-prov')[0]
//Precio por unidad de compra
let nombre_prov = document.getElementsByClassName('name-prov')[0]
//Nombre Del proveedor
let rif = document.getElementsByClassName('rif-prov')[0]
//RIF Del proveedor
let direc_fis = document.getElementsByClassName('dir-prov')[0]
//Direccion Fiscal del Proveedor
let correo = document.getElementsByClassName('correo-prov')[0]
//Correo Del proveedor
let nombre_res = document.getElementsByClassName('resp-prov')[0]
//Nombre Del responsable
let tlf = document.getElementsByClassName('tlf-prov')[0]
//Telefono Del proveedor
let producto = document.getElementsByClassName('prod-prov')[0]
//Producto que vende el proveedor

let exit = document.getElementsByClassName('title-exit')[0]

exit.onclick = function(){
    location.href = '/compras-index'
}

//Validaciones

//Validacion si la entrada recibe un numero
function validarNumero(e){
    //Funcion isNaN verifica si es numero, si es numero retornara False
    if (isNaN(e.key)){
        if (e.key != 'Backspace'){
            e.preventDefault()
        }
    }
}

function validarPrecio(e) {
    let valorActual = e.target.value;

    let cantidadPuntos = (valorActual.match(/\./g) || []).length;

    if (e.key === "." && cantidadPuntos === 0) {
        return true;
    }
    if (isNaN(e.key)) {
        if (e.key != "Backspace") {
        e.preventDefault();
        }
    }
}


tlf.addEventListener('keydown', event => validarNumero(event))

precioo.addEventListener('keydown', event => validarPrecio(event))

rif.addEventListener('keydown', event => validarNumero(event))

rif.addEventListener('keydown',()=>{
    if(rif.value.match(/^\d{9}$/)){
        rif.style.border='2px solid #D9D9D9'
    }
    else{
        rif.style.border='2px solid red'
    }
})

correo.addEventListener('keydown',()=>{
    if(correo.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)){
        correo.style.border='2px solid #D9D9D9'
    }
    else{
        correo.style.border='2px solid red'
    }
})

tlf.addEventListener('keydown', () =>{
    if(tlf.value.match(/^(0414|0412|0416|0424|0426)\d{6}$/)){
        tlf.style.border = '2px solid #D9D9D9'
    }else{
        tlf.style.border = '2px solid red'
    }
})

//validacion si la entrada recibe una letra
nombre_prov.onkeypress = function(e){
    var regex = /^[a-zA-Z\s]+$/
    if (!e.key.match(regex)){
        e.preventDefault();
    }
}
nombre_res.onkeypress = function(e){
    var regex = /^[a-zA-Z\s]+$/
    if(!e.key.match(regex)){
        e.preventDefault()
    }
}
producto.onkeypress = function(e){
    var regex = /^[a-zA-Z\s]+$/
    if(!e.key.match(regex)){
        e.preventDefault()
    }
}
// Validacion de los campos
btn_add.onclick = function validar(event){
    if(nombre_prov.value.length == 0 || rif.value.length == 0 || direc_fis.value.length == 0 || correo.value.length == 0
        || nombre_res.value.length == 0 || tlf.value.length == 0 || producto.value.length == 0 || !correo.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/) || !tlf.value.match(/^04(14|12|24|26)[0-9]{7}$/)){
            alert("Tiene que llenar los campos primeros para poder agregar al proveedor")
    }
}