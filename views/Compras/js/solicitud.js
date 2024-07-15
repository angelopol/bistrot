//Tabla con sus bodys
tabla_productos = document.getElementById('tabla-prod')
tabla_productos_body = document.getElementById('tabla-prov-body') 
tabla_solicitud =  document.getElementById('tabla-soli')
tabla_solicitud_body = document.getElementById('tabla-soli-body')
// Inputs and Selects
producto =  document.getElementById('select-prod')
cantidad =  document.getElementById('input-cant')
departamento =  document.getElementById('select-depa')
descripcion =  document.querySelector('.input-data.desc')
idEmpleado = document.getElementById('input-id')
//Select o combobox del select de solicitud
//Poner aqui toda solicitud que se emita
solicitud =  document.getElementById('select-soli')
// Buttons
btnAcept = document.getElementById('btn-acept')
btnRech = document.getElementById('btn-rech')
btnEnviar = document.getElementById('btn-enviar')
let exit = document.getElementsByClassName('title-exit')[0]
//Boton de Exit
exit.onclick = function(){
    location.href = '/compras-index'
}

//Evento para agregar dinamicamente el id para poder utilizar la ruta /soli/:
document.getElementById('update-form').addEventListener('submit', function (e) {
    const select = document.getElementById('select-soli');
    const selectedOption = select.options[select.selectedIndex];
    const id = selectedOption.value;
    if (id) {
        this.action = `/soli/${id}?_method=PATCH`;
    }
});

// Validaciones
btnEnviar.onclick = function validar(event){
    if(producto.selectedIndex == 0 || cantidad.value.length == 0 || idEmpleado.value.length == 0 || 
    departamento.selectedIndex == 0 || descripcion.value.length == 0){
        alert("Se requiere rellenar los campos para poder enviar la solicitud")
    }
}