//Textos donde Ingresar los datos
producto = document.getElementById('producto')
fecha = document.getElementById('fecha')
cantidad = document.getElementById('cantidad')
precio = document.getElementById('precio')
//Saldos Previo - Actual
previo = document.getElementById('previo')
actual = document.getElementById('actual')
//numero de Orden
orden = document.getElementById('orden')


let exit = document.getElementsByClassName('title-exit')[0]
//Boton de Exit

/*exit.onclick = function(){
    location.href = '/compra'
}*/


//Boton de Regresar
let btn_exit = document.getElementById('btn-regis')


var form = document.getElementById('form1');
        
        
        
// Agrega el evento 'submit' al formulario
form.addEventListener('submit', function(event) {
    let idd = document.getElementById('id-solicitud').value;
    
    if (event.submitter.value === 'Confirmar') {
        
        // Cambia la acción del formulario para incluir el ID y usar el método PATCH
        form.action = '/compras-index/compra/confirmacion/' + idd + '?_method=PATCH';
    } else {
        // Si el botón presionado no es "Modificar", usa la acción por defecto
        form.action = '/compras-index/compra/confirmacion' + '?_method=DELETE';
    }
});
//Textos donde Ingresar los datos
producto = document.getElementById('producto')
fecha = document.getElementById('fecha')
cantidad = document.getElementById('cantidad')
total = document.getElementById('total')
//Saldos Previo - Actual
previo = document.getElementById('previo')
actual = document.getElementById('actual')
//numero de Orden
orden = document.getElementById('orden')
//Boton de Confirmacion
let btn_confirm = document.getElementById('btn-regis')
//Boton de Cancelar
let btn_cancel = document.getElementById('btn-cancel')