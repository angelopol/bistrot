// Agrega un evento de clic al botón "Ver" para cada fila de la tabla de empleados
document.querySelectorAll('.table-row').forEach(row => {
  const viewButton = row.querySelector('.action-view');
  viewButton.addEventListener('click', function() {
    const employeeId = row.dataset.employeeId; // Asigna un atributo data-employee-id a cada fila de la tabla
    const employeeData = empleados.find(employee => employee.id === employeeId);
    showModal(employeeData);
  });
});

// Función para mostrar el modal con la información del empleado
function showModal(employeeData) {
  const modal = document.querySelector('.modal');
  modal.innerHTML = `
    <header>
      <h2 class="employee-id">${employeeData.codigo}</h2>
      <h1 class="employee-name">${employeeData.nombre} ${employeeData.apellido}</h1>
    </header>
    <section class="info-row">
      <span class="info-label">Fecha de inicio</span>
      <span class="info-value">${employeeData.fecha_inicio}</span>
    </section>
    <section class="info-row">
      <span class="info-label">Fecha de culminación</span>
      <span class="info-value">${employeeData.fecha_culminacion}</span>
    </section>
    <section class="info-row">
      <span class="info-label">Horario</span>
      <span class="info-value">${employeeData.horario}</span>
    </section>
    <section class="info-row">
      <span class="info-label">Salario</span>
      <span class="info-value">${employeeData.salario}</span>
    </section>
    <section class="info-row">
      <span class="info-label">Inasistencias</span>
      <span class="info-value">${employeeData.inasistencias}</span>
    </section>
    <section class="info-row">
      <span class="info-label">Teléfono</span>
      <span class="info-value">${employeeData.telefono}</span>
    </section>
    <section class="info-row">
      <span class="info-label">Dirección</span>
      <span class="info-value">${employeeData.direccion}</span>
    </section>
    <button class="cerrar-modal">Cerrar</button>
  `;
  modal.classList.add('revelar');
}



















// const botonMostrarEmpleado = document.querySelector(".action-view")
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".cerrar-modal");





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
  const tabla = document.querySelector('.table-container');

  // Limpia la tabla antes de agregar nuevas filas
  tabla.innerHTML = `
    <div class="table-header">
      <span class="header-name">Nombre y Apellido</span>
      <div class="header-details">
        <span>Código</span>
        <span>Cargo</span>
      </div>
    </div>
    <div class="table-row" id="row-1">
      <span class="row-name"></span>
      <div class="row-details">
        <span></span>
        <span></span>
      </div>
    </div>
  `;

  // Itera sobre los empleados y agrega una fila por cada uno
  // Aqui llena la tabla del html
  empleados.forEach(empleado => {
    const fila = document.createElement('span');
    fila.innerHTML = `
      <span>${empleado.nombre}</span>
      <span>${empleado.codigo}</span>
      <span>${empleado.cargo}</span>
    `;
    tabla.appendChild(fila);
  });
}





botonMostrarEmpleado.addEventListener("click", function() {
  modal.classList.add("revelar");
});


closeModalButton.addEventListener("click", function() {
  modal.classList.remove("revelar");
});


















































const searchInput = document.getElementById('searchInput'); 
const searchButton = document.querySelector('.search-button'); 
const tableRows = document.querySelectorAll('.table-row'); 

searchButton.addEventListener('click', function(event) {
  event.preventDefault(); 
  const searchTerm = searchInput.value.toLowerCase(); 

  tableRows.forEach(row => {
    const employeeName = row.querySelector('.row-name').textContent.toLowerCase(); 
    const employeeCode = row.querySelector('.row-details span:first-child').textContent; 

    if (employeeName.includes(searchTerm) || employeeCode.includes(searchTerm)) {
      row.style.display = 'flex'; 
    } else {
      row.style.display = 'none'; 
    }
  });

});

