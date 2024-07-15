//Estos son para hacer el cambio de div y aqui es el parte para los botones
const boton_cambiar = document.getElementById('Button_formulario_Agregar');
const boton_home = document.getElementById('Button_formulario_Volver');
const navegar_home_mantenimiento = document.getElementById('Button_formulario_Inicio');

const div1 = document.getElementById('tipo_formulario');
const div2 = document.getElementById('Agregar_mantenimiento');

boton_cambiar.addEventListener('click', function () {
  if (div1.style.display === 'block') {
    div1.style.display = 'none';
    div2.style.display = 'block';

    boton_cambiar.style.display = 'none';
    boton_home.style.display = 'inline';
    navegar_home_mantenimiento.style.display = 'none';
  }
});


boton_home.addEventListener('click', function () {
  if (div2.style.display === 'block') {
    div1.style.display = 'block'; 
    div2.style.display = 'none';
    boton_home.style.display = 'none';
    boton_cambiar.style.display = 'inline';
    navegar_home_mantenimiento.style.display = 'inline';
  }
})

//Parte de Ingresar datos por usuario, haciendo test que sirve para solamente ingresar datos por localmente a fin de cambiar la tabla
const formulario_agregar_enjs = document.getElementById('formulario_agregar_mantenimiento')
const actualizacion_tabla = document.getElementById('Actual_tabla');

formulario_agregar_enjs.addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre_nuevo = document.getElementById('mantenimiento').value;
  const servicio_nuevo = document.getElementById('responsable').value;
  const descripcion_nuevo = document.getElementById('inicio').value;
  const fecha_nuevo = document.getElementById('fin').value;

  //lo que voy escribir aqui, es para entender que estoy haciendo el formato de la hora

  // Dividir el valor en fecha y hora
  var dateTimeParts = fecha_nuevo.split("T");
  var datePart = dateTimeParts[0];
  var timePart = dateTimeParts[1];

  // Dividir la fecha en día, mes y año
  var dateParts = datePart.split("-");
  var year = dateParts[0];
  var month = dateParts[1];
  var day = dateParts[2];

  // Dividir la hora en horas y minutos
  var timeParts = timePart.split(":");
  var hour = timeParts[0];
  var minute = timeParts[1];

  // Formatear la fecha y hora
  var formattedDateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute;

  addDataToTable(nombre_nuevo, servicio_nuevo, descripcion_nuevo, formattedDateTime);

  formulario_agregar_enjs.reset();
});

function addDataToTable(mantenimiento, responsable, inicio, fin) {
  const row = actualizacion_tabla.insertRow();

  const nameCell = row.insertCell();
  nameCell.textContent = mantenimiento;

  const servicioCell = row.insertCell();
  servicioCell.textContent = responsable;

  const descripcionCell = row.insertCell();
  descripcionCell.textContent = inicio;

  const fechaCell = row.insertCell();
  fechaCell.textContent = fin;
}

//Para regresar la pagina Mantenimiento
navegar_home_mantenimiento.addEventListener('click', function () {
  window.location.href = 'Pagina_principal.html';
})






//Esta zona es para que ordenar el fecha de tiempo, de cercano a lejano

// Obtener la tabla y los datos
var table = document.getElementById("Actual_tabla");
var rows = table.getElementsByTagName("tr");

function Actualizacion_su_orden() {
  // Convertir las fechas y horas a objetos Date
  var dates = [];
  for (var i = 1; i < rows.length; i++) {
    var dateString = rows[i].getElementsByTagName("td")[3].textContent;
    var date = new Date(dateString);
    dates.push(date);
  }

  // Ordenar las fechas de menor a mayor
  dates.sort(function (a, b) {
    return a - b;
  });

  // Actualizar el orden de las filas en la tabla
  for (var i = 0; i < dates.length; i++) {
    for (var j = 1; j < rows.length; j++) {
      var dateString = rows[j].getElementsByTagName("td")[3].textContent;
      var date = new Date(dateString);
      if (date.getTime() === dates[i].getTime()) {
        table.tBodies[0].appendChild(rows[j]);
        break;
      }
    }
  }
}
setInterval(Actualizacion_su_orden, 100);
