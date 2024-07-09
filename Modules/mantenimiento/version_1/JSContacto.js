//Estos son para hacer el cambio de div y aqui es el parte para los botones
const boton_cambiar = document.getElementById('Button_formulario_Agregar');
const boton_home = document.getElementById('Button_formulario_Volver');
const navegar_home_mantenimiento = document.getElementById('Button_formulario_Inicio');

const div1 = document.getElementById('tipo_formulario');
const div2 = document.getElementById('Agregar_mas_trabajador');

boton_cambiar.addEventListener('click', function() {
      if (div1.style.display === 'block') {
        div1.style.display = 'none';
        div2.style.display = 'block';

        boton_cambiar.style.display = 'none';
        boton_home.style.display = 'inline';
        navegar_home_mantenimiento.style.display = 'none';
      }
    });


boton_home.addEventListener('click',function(){
    if(div2.style.display === 'block'){
        div1.style.display = 'block';
        div2.style.display = 'none';
        boton_home.style.display = 'none';
        boton_cambiar.style.display = 'inline';
        navegar_home_mantenimiento.style.display = 'inline';
    }
})

//Parte de Ingresar datos por usuario, haciendo test que sirve para solamente ingresar datos por localmente a fin de cambiar la tabla
const formulario_agregar_enjs = document.getElementById('formulario_agregar')
const actualizacion_tabla = document.getElementById('Actual_tabla');

formulario_agregar_enjs.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const nombre_nuevo = document.getElementById('nombre').value;
  const servicio_nuevo = document.getElementById('trabajo_servicio').value;
  const fecha_nuevo = document.getElementById('fecha').value;
  
  addDataToTable(nombre_nuevo, servicio_nuevo, fecha_nuevo);
  
  formulario_agregar_enjs.reset();
});

function addDataToTable(nombre, servicio, fecha) {
  const row = actualizacion_tabla.insertRow();
  
  const nameCell = row.insertCell();
  nameCell.textContent = nombre;
  
  const emailCell = row.insertCell();
  emailCell.textContent = servicio;
  
  const phoneCell = row.insertCell();
  phoneCell.textContent = fecha;
}

//Para regresar la pagina Mantenimiento
navegar_home_mantenimiento.addEventListener('click',function(){
  window.location.href = 'Pagina_principal.html';
})