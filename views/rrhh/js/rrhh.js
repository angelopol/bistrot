

const botonMostrarEmpleado = document.querySelector(".action-view")
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

