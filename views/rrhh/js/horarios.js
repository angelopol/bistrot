// Función para generar una hora exacta aleatoria entre 15:00 y 20:00
function generateRandomHour() {
  const hours = [15, 16, 17, 18, 19, 20];
  const randomHour = hours[Math.floor(Math.random() * hours.length)];
  return `${randomHour}:00`;
}

document.addEventListener('DOMContentLoaded', async (event) => {
  await ObtenerEmpleados();
});


//Esta funcion la puedes usar en cualquier archivo y te trae la lista de empleados
async function ObtenerEmpleados() {
  try {
  const response = await fetch('http://localhost:1234/rrhh/empleados');
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const empleados = await response.json();
  console.log(empleados)

  llenarTabla(empleados);
  } catch (error) {
  console.error('Error fetching empleados:', error);
  }
}

function llenarTabla(empleados) {
  const tabla = document.querySelector('.table tbody');

  // Limpia la tabla antes de agregar nuevas filas
  tabla.innerHTML = `
    <tr>
      <th scope="col" class="encabezado">Nombre</th>
      <th scope="col" class="encabezado">Cargo</th>
      <th scope="col" class="encabezado">Hora de Entrada</th>
      <th scope="col" class="encabezado" style="width: 200px;">Hora Salida</th>
    </tr>
    <tr>
      <th scope="col" class="info"></th>
      <th scope="col" class="info"></th>
      <th scope="col" class="info"></th>
      <th scope="col" class="info"></th>
    </tr>
  `;

  // Itera sobre los empleados y agrega una fila por cada uno
  // Aqui llena la tabla del html
  empleados.forEach(empleado => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${empleado.nombre}</td>
      <td>${empleado.cargo}</td>
      <td>${empleado.horaEntrada}</td>
      <td>${empleado.horaSalida}</td>
    `;
    tabla.appendChild(fila);
  });
}
