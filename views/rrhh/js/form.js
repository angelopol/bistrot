// validacion de que la fecha de inicio pueda ser la fecha actual o una fecha futura
// no se permite ingresar una fecha pasada
document.getElementById("start-date").addEventListener("input", function () {
  var today = new Date().toISOString().split('T')[0];
  if (this.value < today) {
      alert("La fecha de inicio no puede ser una fecha pasada");
      this.value = "";
  }
});

// fecha de culminacion no puede ser menor a la fecha de inicio
document.getElementById("end-date").addEventListener("input", function () {
  var startDate = document.getElementById("start-date").value;
  if (this.value < startDate) {
      alert("La fecha de culminación no puede ser menor a la fecha de inicio");
      this.value = "";
  }
});

// si el usuario intenta meter primero la fecha de culminacion y luego la fecha de inicio, si la fecha de inicio es mayor a la fecha de culminacion, la fecha de culminacion se resetea
document.getElementById("start-date").addEventListener("input", function () {
  var endDate = document.getElementById("end-date").value;
  if (this.value > endDate) {
      document.getElementById("end-date").value = "";
  }
});

// validacion salario no puede ser negativo
// no permite ingresar nada que no sea numeros, puntos y comas
// permite ingresar varios puntos
document.getElementById("salary").addEventListener("input", function () {
  var salary = this.value;
  var salaryPattern = /^[0-9.,]*$/;
  if (!salaryPattern.test(salary)) {
      this.value = salary.slice(0, -1);
  }
  if (this.value < 0) {
      alert("El salario no puede ser negativo");
      this.value = "";
  }
});

//validar que el nombre y apellido no contengan números
// que si el usuario ingrese un numero, no se refleje en el input
// solo se permite ingresar letras y espacios
document.getElementById("first-name").addEventListener("input", function () {
  var name = this.value;
  var namePattern = /^[a-zA-Z\s]*$/;
  if (!namePattern.test(name)) {
      this.value = name.slice(0, -1);
  }
});

document.getElementById("last-name").addEventListener("input", function () {
  var name = this.value;
  var namePattern = /^[a-zA-Z\s]*$/;
  if (!namePattern.test(name)) {
      this.value = name.slice(0, -1);
  }
});

// validacion cedula, solo permite ingresar numeros, sin espacios
// permite ingresar maximo 8 digitos
document.getElementById("id-number").addEventListener("input", function () {
  var idNumber = this.value;
  var idNumberPattern = /^[0-9]*$/;
  if (!idNumberPattern.test(idNumber)) {
      this.value = idNumber.slice(0, -1);
  }
  if (this.value.length > 8) {
      this.value = idNumber.slice(0, 8);
  }
});

// validacion telefono, solo permite ingresar numeros, sin espacios
// permite ingresar maximo 11 digitos
document.getElementById("phone").addEventListener("input", function () {
  var phone = this.value;
  var phonePattern = /^[0-9]*$/;
  if (!phonePattern.test(phone)) {
      this.value = phone.slice(0, -1);
  }
  if (this.value.length > 11) {
      this.value = phone.slice(0, 11);
  }
});

// validar la direccion de residencia
// no me permita ingresar caracteres especiales, solamente la , y el espacio
document.getElementById("address").addEventListener("input", function () {
  var address = this.value;
  var addressPattern = /^[a-zA-Z0-9\s,ñÑ]*$/;
  if (!addressPattern.test(address)) {
      this.value = address.slice(0, -1);
  }
});

// validacion de codigo de empleado
// primero se ingresa una letra (representa el cargo) y luego numeros
// document.getElementById("employee-code").addEventListener("input", function () {
//   var employeeCode = this.value;
//   var employeeCodePattern = /^[a-zA-Z][0-9]*$/;
//   if (!employeeCodePattern.test(employeeCode)) {
//       this.value = employeeCode.slice(0, -1);
//   }
//   if (this.value.length > 5) {
//       this.value = employeeCode.slice(0, 5);
//   }
// });

// validacion de la clave de usuario, maximo 8 caracteres
// solo numeros, no permite ni espacios ni otros caracteres
document.getElementById("user-password").addEventListener("input", function () {
  var password = this.value;
  var passwordPattern = /^[0-9]*$/;
  if (!passwordPattern.test(password)) {
      this.value = password.slice(0, -1);
  }
  if (this.value.length > 8) {
      this.value = password.slice(0, 8);
  }
});

const generateRandomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

document.getElementById('submit-button').addEventListener('click', function(event) {
    event.preventDefault();

    const formData = {
      cedula: document.getElementById('id-number').value,
      codigo_empleado: generateRandomCode(),
      nombre: document.getElementById('first-name').value,
      apellido: document.getElementById('last-name').value,
      direccion: document.getElementById('address').value,
      cargo: document.getElementById('cargo').value,
      fecha_contratacion: document.getElementById('start-date').value,
      fecha_culminacion: document.getElementById('end-date').value,
      salario: document.getElementById('salary').value,
      horas: document.getElementById('hours').value,
      telefono: document.getElementById('phone').value,
      clave_usuario: document.getElementById('user-password').value,
      experiencia_laboral: document.getElementById('experiencia_laboral').value

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
      codigo_empleado: formData.codigo_empleado,
      clave_usuario: formData.clave_usuario,
      experiencia_laboral: formData.experiencia_laboral
    };

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(`Error al registrar empleado: ${data.error.nombre}`);
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
  