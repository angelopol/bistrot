// Validacion de formulario, en el input de la fecha de inicio no se puede seleccionar una antes de la actual
document.getElementById("start-date").addEventListener("change", function () {
    var fechaInicio = new Date(this.value);
    var fechaActual = new Date();
    if (fechaInicio < fechaActual) {
        alert("No se puede seleccionar una fecha antes de la actual");
        this.value = "";
    }
});



// Validacion fecha de culminacion no puede ser antes de la fecha de inicio
document.getElementById("end-date").addEventListener("change", function () {
    var fechaInicio = new Date(document.getElementById("start-date").value);
    var fechaCulminacion = new Date(this.value);
    if (fechaCulminacion < fechaInicio) {
        alert("No se puede seleccionar una fecha antes de la de inicio");
        this.value = "";
    }
});


// El user no puede ingresar un salario negativo
document.getElementById("salary").addEventListener("input", function () {
    if (this.value < 0) {
        alert("No se puede ingresar un salario negativo");
        this.value = "";
    }
});


// El user no puede ingresar letras ni caracteres especiales, solo numeros, varios puntos y comas
document.getElementById("salary").addEventListener("input", function () {
    var value = this.value;
    var regex = /^[0-9.,]*$/;

    if (!regex.test(value)) {
        this.value = value.slice(0, -1);
    }
});



// Validacion de formulario, en el input del nombre no se pueden ingresar numeros ni caracteres especiales
const firstNameInput = document.getElementById('first-name');

firstNameInput.addEventListener('input', (event) => {
  const value = event.target.value;
  const regex = /^[a-zA-Z\s]*$/;

  if (!regex.test(value)) {
    event.target.value = value.slice(0, -1);
  }
});





// Validacion de formulario, en el input del apellido no se pueden ingresar numeros ni caracteres especiales
              
const lastNameInput = document.getElementById('last-name');

lastNameInput.addEventListener('input', (event) => {
  const value = event.target.value;
  const regex = /^[a-zA-Z\s]*$/;

  if (!regex.test(value)) {
    event.target.value = value.slice(0, -1);
  }
});





// Validacion de input de cedula, permite solo numeros y un maximo de 8 caracteres
// que no me deje escribir mas numeros de los que se permiten, solo 8
const idNumberInput = document.getElementById('id-number');

idNumberInput.addEventListener('input', (event) => {
    const value = event.target.value;
    const regex = /^[0-9]*$/;

    if (!regex.test(value)) {
        event.target.value = value.slice(0, -1);
    }

    else if (value.length > 8) {
        event.target.value = value.slice(0, 8);
    }
});





// Validacion de input de telefono, permite solo numeros y un maximo de 11 caracteres
// No permitir un formato incorrecto
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (event) => {
    const value = event.target.value;
    const regex = /^[0-9]*$/;

    if (!regex.test(value)) {
        event.target.value = value.slice(0, -1);
    }

    else if (value.length > 11) {
        event.target.value = value.slice(0, 11);
    }
});






// validar la direccion de residencia 
// que me permita ingresar la ñ y la Ñ
// no me permita ingresar caracteres especiales, solamente la , y el espacio
document.getElementById("address").addEventListener("input", function () {
    var address = this.value;
    var addressPattern = /^[a-zA-Z0-9\s,ñÑ]*$/;
    if (!addressPattern.test(address)) {
        this.value = address.slice(0, -1);
    }
});







// Codigo de empleado no puede tener mas de 5 caracteres
// El primer caracter debe ser una letra, el resto numeros
document.getElementById("employee-code").addEventListener("input", function () {
    var code = this.value;
    var codePattern = /^[a-zA-Z][0-9]*$/;
    if (!codePattern.test(code)) {
        this.value = code.slice(0, -1);
    }
    else if (code.length > 5) {
        this.value = code.slice(0, 5);
    }
});





// Validación de contraseña, si el usuario le da al boton de registrar y la contraseña no tiene al menos 4 caracteres, se le mostrara un mensaje de error

document.querySelector('.submit-button').addEventListener('click', function (event) {
    const password = document.getElementById('user-password').value;

    if (password.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres');
      event.preventDefault();
    }
});

// Si el usuario le da al boton de registrar y el numero telefonifco tiene menos de 11 caracteres, se le mostrara un mensaje de error

document.querySelector('.submit-button').addEventListener('click', function (event) {
    const phone = document.getElementById('phone').value;

    if (phone.length < 11) {
      alert('El numero telefonico debe tener al menos 11 caracteres');
      event.preventDefault();
    }
});

// Si el usuario no completo el formulario completo le saldra un mensaje de que lo complete
document.querySelector('.submit-button').addEventListener('click', function (event){
    const cedula = document.getElementById('id-number').value;
    const codigoEmpleado = document.getElementById('employee-code').value;
    const nombre = document.getElementById('first-name').value;
    const apellido = document.getElementById('last-name').value;
    const email = document.getElementById('address').value;
    const cargo = document.getElementById('cargo').value;
    const inicio = document.getElementById('start-date').value;
    const culminacion = document.getElementById('end-date').value;
    const salary = document.getElementById('salary').value;
    const horas = document.getElementById('hours').value;
    const diaSemana = document.getElementById('weekday').value;
    const tlf = document.getElementById('phone').value;
    const clave = document.getElementById('user-password').value;

    var campos = [
        cedula,
        codigoEmpleado,
        nombre,
        apellido,
        email,
        cargo,
        inicio,
        culminacion,
        salary,
        horas,
        diaSemana,
        tlf,
        clave
    ];
      
    for (var i = 0; i < campos.length; i++) {
        if (campos[i] === "") {
          event.preventDefault(); 
          alert("Por favor, complete todos los campos");
          return;
        }
    }
});


