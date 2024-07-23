document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const tableBody = document.querySelector('#employeeTable tbody');
  const modal = document.getElementById('employeeModal');
  const modalContent = document.getElementById('modalContent');
  const employeeImage = document.getElementById('employeeImage');
  const editButton = document.getElementById('editButton');
  const saveButton = document.getElementById('saveButton');
  let currentEmployee = null;
  const closeModal = document.getElementById('closeModal');
  let employees = [];  // Array para almacenar los datos de los empleados

  // Función para cargar los datos de los empleados
  const loadEmployees = () => {
      fetch('/rrhh/empleados')
          .then(response => response.json())
          .then(data => {
              employees = data;
              renderTable(employees);
          })
          .catch(error => console.error('Error fetching employee data:', error));
  };

  const eliminar = (id) =>{
    fetch('/register/eliminar', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
      }) 
      .then(data => {
        if (data.error) {
          alert(`Error al eliminar empleado: ${data.error.nombre}`);
        } else {
          alert('Empleado eliminado exitosamente');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al elimiar el empleado');
      });
  }

  // Función para renderizar la tabla
  const renderTable = (data) => {
      tableBody.innerHTML = '';  // Limpiar el contenido actual de la tabla
      data.forEach(employee => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${employee.Nombre} ${employee.Apellido}</td>
              <td>${employee.cedula}</td>
              <td>${employee.Puesto}</td>
              <td>
                <button class="button is-info show-details" data-id="${employee.cedula}">Ver Detalles</button>
                <button class="button is-info delete-emp" data-id="${employee.user}">Despedir</button>
              </td>
          `;
          tableBody.appendChild(row);
      });

      // Añadir evento a los botones de detalles
      document.querySelectorAll('.show-details').forEach(button => {
          button.addEventListener('click', function() {
              const employeeId = this.getAttribute('data-id');
              showEmployeeDetails(employeeId);
          });
      });
      document.querySelectorAll('.delete-emp').forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-id');
            if(employeeId != 'admin'){
                eliminar({id : employeeId});
                loadEmployees();
            }else alert("Accion no permitida")
        });
    });
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  };
  
  const formatDateForSubmission = (dateString) => {
    const parts = dateString.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // Asumiendo que el formato es DD/MM/YYYY
  };


  // Función para mostrar detalles del empleado
  const showEmployeeDetails = (id) => {
    currentEmployee = employees.find(emp => emp.cedula === id);
    if (currentEmployee) {
        employeeImage.src = currentEmployee.image || './css/img/employee.png'; // Ruta de la imagen del empleado o imagen por defecto
        modalContent.innerHTML = `
            <h2>${currentEmployee.Nombre} ${currentEmployee.Apellido}</h2>
            <div class="">
                <label class="label">Cedula:</label>
                <div class="control">
                    <input class="input" type="text" value="${currentEmployee.cedula}" disabled>
                </div>
            </div>
            <div class="field">
                <label class="label">Cargo:</label>
                <div class="control">
                    <input class="input" type="text" value="${currentEmployee.Puesto}" disabled>
                </div>
            </div>
            <div class="field">
                <label class="label">Telefono:</label>
                <div class="control">
                    <input class="input" type="text" value="${currentEmployee.Telefono}" disabled>
                </div>
            </div>
            <div class="field">
                <label class="label">Direccion:</label>
                <div class="control">
                    <input class="input" type="text" value="${currentEmployee.Direccion}" disabled>
                </div>
            </div>
            <div class="field">
                <label class="label">Fecha de Contratacion:</label>
                <div class="control">
                    <input class="input" type="text" value="${formatDate(currentEmployee.fecha_contratacion)}" disabled>
                </div>
            </div>
            <div class="field">
                <label class="label">Fecha de Culminacion:</label>
                <div class="control">
                    <input class="input" type="text" value="${formatDate(currentEmployee.fecha_culminacion)}" disabled>
                </div>
            </div>
            <div class="field">
                <label class="label">Salario:</label>
                <div class="control">
                    <input class="input" type="text" value="${currentEmployee.Salario}" disabled>
                </div>
            </div>
            </div>
        `;
        modal.classList.add('is-active');
    }
  };

  // Enable editing of fields
  editButton.addEventListener('click', () => {
    const inputs = modalContent.querySelectorAll('input');
    inputs.forEach(input => input.disabled = false);
    saveButton.style.display = 'inline-block';
    editButton.style.display = 'none';
  });

  // Save changes
  saveButton.addEventListener('click', () => {
    const inputs = modalContent.querySelectorAll('input');
    const updatedEmployee = { ...currentEmployee };
    
    inputs.forEach(input => {
        const label = input.closest('.field').querySelector('label').textContent.replace(':', '').trim().toLowerCase().replace(/ /g, '_');
        const key = label === 'fecha_de_contratacion' || label === 'fecha_de_culminacion' ? label.replace('de_', '') : label;
        if (key === 'fecha_contratacion' || key === 'fecha_culminacion') {
            updatedEmployee[key] = formatDateForSubmission(input.value);
        } else {
            updatedEmployee[key] = input.value;
        }
    });

    // Save the updated employee data (here you should send it to the server)
    fetch(`/register/modificar`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEmployee)
    })
    .then(response => response.json())
    .then(data => {
        // Update local data
        const index = employees.findIndex(emp => emp.cedula === currentEmployee.cedula);
        employees[index] = updatedEmployee;
        modal.classList.remove('is-active');
        loadEmployees();
    })
    .catch(error => console.error('Error updating employee data:', error));
    saveButton.style.display = 'none';
    editButton.style.display = 'inline-block';
  });

  // Función para filtrar los datos
  const filterTable = () => {
      const searchText = searchInput.value.toLowerCase();
      const filteredEmployees = employees.filter(employee => {
          const fullName = `${employee.Nombre.toLowerCase()} ${employee.Apellido.toLowerCase()}`;
          return fullName.includes(searchText) || 
                 employee.cedula.toLowerCase().includes(searchText) || 
                 employee.Puesto.toLowerCase().includes(searchText);
      });
      renderTable(filteredEmployees);
  };

  // Cargar los empleados al inicio
  loadEmployees();

  // Agregar un evento para filtrar la tabla al escribir en el campo de búsqueda
  searchInput.addEventListener('input', filterTable);

  // Cerrar el modal
  closeModal.addEventListener('click', () => {
        saveButton.style.display = 'none';
        editButton.style.display = 'inline-block';
      modal.classList.remove('is-active');
      modal.classList.add('fade-out'); // Añadir clase de salida para animación
      setTimeout(() => {
          modal.classList.remove('fade-out');
      }, 300); // Tiempo de duración de la animación de salida
  });
  document.querySelector('.delete').addEventListener('click', () => {
        saveButton.style.display = 'none';
        editButton.style.display = 'inline-block';
        modal.classList.remove('is-active');
  });

  document.querySelector('.modal-background').addEventListener('click', () => {
        saveButton.style.display = 'none';
        editButton.style.display = 'inline-block';
        modal.classList.remove('is-active');
  });
});
