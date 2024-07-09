//Inputs
nombre = document.getElementById('name-prov')
//Unidades de Consumo
unid_cons = document.getElementById('cons-prov')
//Unidades de Compra
unid_comp = document.getElementById('comp-prov')
//Select de Los proveedores
proveedor = document.getElementById('select-prov')

//Buttos
//Boton de Agregar o modificar producto
registrar = document.getElementById('btn-regis')


let exit = document.getElementsByClassName('title-exit')[0]
//Boton de Exit

exit.onclick = function(){
    location.href = '../html/index.html'
}