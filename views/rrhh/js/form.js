document.getElementById('submit-button').addEventListener('click', function(event) {
    event.preventDefault();

    const formData = {
      cedula: document.getElementById('id-number').value,
      codigoEmpleado: document.getElementById('employee-code').value,
      nombre: document.getElementById('first-name').value,
      apellido: document.getElementById('last-name').value,
      direccion: document.getElementById('address').value,
      cargo: document.getElementById('cargo').value,
      fecha_contratacion: document.getElementById('start-date').value,
      fecha_culminacion: document.getElementById('end-date').value,
      salario: document.getElementById('salary').value,
      horas: document.getElementById('hours').value,
      telefono: document.getElementById('phone').value,
      clave_usuario: document.getElementById('user-password').value
    };

    const validateForm = (data) => {
      for (const key in data) {
        if (!data[key]) {
          alert('Por favor, complete todos los campos');
          return false;
        }
      }
      return true;
    };

    if (!validateForm(formData)) return;

    const dataToSend = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      puesto: formData.cargo,
      fecha_contratacion: formData.fecha_contratacion,
      telefono: formData.telefono,
      direccion: formData.direccion,
      salario: formData.salario,
      fecha_culminacion: formData.fecha_culminacion,
      horas: formData.horas,
      cedula: formData.cedula,
      codigo_empleado: formData.codigoEmpleado,
      clave_usuario: formData.clave_usuario
    };

    console.log('Datos a enviar:', dataToSend);

    fetch('http://localhost:1234/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert('Empleado registrado exitosamente');
        // Limpiar el formulario
        document.getElementById('employee-form').reset();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al registrar el empleado');
    });
  });