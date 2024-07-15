// document.addEventListener('DOMContentLoaded', (event) => {
//   changeTab('empleados'); 
// });



// function changeTab(tab) {
//   document.querySelectorAll('.tab').forEach(button => {
//     button.classList.remove('active');
//     button.classList.add('tab-inactive')
//   });

//   const activeButton = document.getElementById(`btn${capitalizerFirstLetter(tab)}`);
//   activeButton.classList.remove('tab-inactive');
//   activeButton.classList.add('active');

//   updateTableContent(tab);

//   showEditForm(tab);

//   showAddForm(tab);

// }

// function 

const botonMostrarEmpleado = document.querySelector(".action-view")
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".cerrar-modal");


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

