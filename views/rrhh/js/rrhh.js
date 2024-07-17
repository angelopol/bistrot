

const botonMostrarEmpleado = document.querySelector(".action-view")
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".cerrar-modal");





// async function ObtenerEmpleados() {
//   try {
//   const response = await fetch('http://localhost:1234/rrhh/empleados');
//   if (!response.ok) {
//       throw new Error('Network response was not ok');
//   }
//   const empleados = await response.json();
//   console.log(empleados)

//   llenarTabla(empleados);
//   } catch (error) {
//   console.error('Error fetching empleados:', error);
//   }
// }
// function llenarTabla(empleados) {
//   const tabla = document.querySelector('.table tbody');
// }






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

