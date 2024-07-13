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



