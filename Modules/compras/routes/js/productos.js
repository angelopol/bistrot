//Inputs
nombre = document.getElementById('name-prov')
//Unidades de Consumo
unid_cons = document.getElementById('cons-prov')
//Unidades de Compra
unid_comp = document.getElementById('comp-prov')

//Buttos
//Boton de Agregar
registrar = document.getElementById('btn-regis')
//Boton de Modificar
modificar = document.getElementById('btn-modi')


let exit = document.getElementsByClassName('title-exit')[0]
//Boton de Exit

exit.onclick = function(){
    location.href = '../html/index.html'
}