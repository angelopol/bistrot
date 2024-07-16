document.querySelector('submit-button').addEventListener('click', function(event) {
    event.preventDefault();
  
    const validateForm = () => {
      const cedula = document.getElementById('id-number').value;
      const codigoEmpleado = document.getElementById('employee-code').value;
      const nombre = document.getElementById('first-name').value;
      const apellido = document.getElementById('last-name').value;
      const direccion = document.getElementById('address').value;
      const cargo = document.getElementById('cargo').value;
      const fecha_contratacion = document.getElementById('start-date').value;
      const fecha_culminacion = document.getElementById('end-date').value;
      const salario = document.getElementById('salary').value;
      const horas = document.getElementById('hours').value;
      const telefono = document.getElementById('phone').value;
      const clave_usuario = document.getElementById('user-password').value;
  
      if (!cedula || !codigoEmpleado || !nombre || !apellido || !direccion || !cargo || !fecha_contratacion || !fecha_culminacion || !salario || !horas || !telefono || !clave_usuario) {
        alert('Por favor, complete todos los campos');
        return false;
      }
  
      return true;
    };
  
    if (!validateForm()) return;
  
    const data = {
      nombre,
      apellido,
      puesto: cargo,
      fecha_contratacion,
      telefono,
      direccion,
      salario,
      fecha_culminacion,
      horas,
      cedula,
      codigo_empleado: codigoEmpleado,
      clave_usuario
    };
  
    console.log('Datos a enviar:', data);
  
    fetch('http://localhost:1234/rrhh/empleados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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