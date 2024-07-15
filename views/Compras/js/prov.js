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
//Boton que agrega o modifica un proveedor validado por los inputs
//Validar que si el proveedor ya existe que lo modifique
//Y si no existe que lo agregue

//Inputs - Datos del Proveedor
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
rif.addEventListener('keydown', () =>{
    if(rif.value.match(/^j-[0-9]{9}$/)){
        rif.style.border= '2px solid #02676F'
    }else{
        rif.style.border= '2px solid red'
    }
})
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
tlf.addEventListener('keydown', event => validarNumero(event))

//validacion si la entrada recibe una letra
nombre_prov.onkeypress = function(e){
    var regex = /^[a-zA-Z\s]+$/
    if (!e.key.match(regex)){
        e.preventDefault();
    }
}
//Validacion para el numero de telefono

// Validacion de los campos
btn_add.onclick = function validar(event){
    if(nombre_prov.value.length == 0 || rif.value.length == 0 || direc_fis.value.length == 0 || correo.value.length == 0
        || nombre_res.value.length == 0 || tlf.value.length == 0 || producto.value.length == 0){
            alert("Tiene que llenar los campos primeros para poder agregar al proveedor")
        }
}
btn_delete.onclick = function validar(event){
    if(nombre_prov.value.length == 0 || rif.value.length == 0 || direc_fis.value.length == 0 || correo.value.length == 0
        || nombre_res.value.length == 0 || tlf.value.length == 0 || producto.value.length == 0){
            alert("Se tiene que pasar los datos para poder eliminar al provvedor")
    }
}