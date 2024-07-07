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
    location.href = '../html/index.html'
}