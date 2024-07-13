document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.employee-registration');
    const nombreInput = document.getElementById('employee-name');
    const idInput = document.getElementById('employee-id');
    const ciInput = document.getElementById('employee-ci');
    const registrarLlegadaBtn = document.querySelector('.submit-button[onclick*="llegada"]');
    const registrarSalidaBtn = document.querySelector('.submit-button[onclick*="salida"]');
    const importarRegistrosBtn = document.querySelector('.submit-button[onclick*="importarRegistros"]');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    registrarLlegadaBtn.addEventListener('click', () => {
        if (validarFormulario()) {
            registrarHora('llegada');
        }
    });

    registrarSalidaBtn.addEventListener('click', () => {
        if (validarFormulario()) {
            registrarHora('salida');
        }
    });

    importarRegistrosBtn.addEventListener('click', () => {
        importarRegistros();
    });

    function validarFormulario() {
        let isValid = true;
        clearErrors();

        if (!nombreInput.value.trim()) {
            setError(nombreInput, 'El nombre del empleado es requerido.');
            isValid = false;
        }

        if (!idInput.value.trim()) {
            setError(idInput, 'El ID del empleado es requerido.');
            isValid = false;
        } else if (!/^\d+$/.test(idInput.value.trim())) {
            setError(idInput, 'El ID del empleado debe ser numérico.');
            isValid = false;
        }

        if (!ciInput.value.trim()) {
            setError(ciInput, 'La cédula de identidad es requerida.');
            isValid = false;
        } else if (!/^\d{7,8}$/.test(ciInput.value.trim())) {
            setError(ciInput, 'La cédula de identidad debe ser un número de 7 u 8 dígitos.');
            isValid = false;
        }

        return isValid;
    }

    function setError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        formGroup.appendChild(errorElement);
        input.classList.add('error');
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach((element) => element.remove());

        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach((element) => element.classList.remove('error'));
    }

    function registrarHora(tipo) {
        const nombre = nombreInput.value.trim();
        const id = idInput.value.trim();
        const ci = ciInput.value.trim();
        const hora = new Date().toLocaleTimeString();

        console.log(`Registro de ${tipo}:`);
        console.log(`Nombre: ${nombre}`);
        console.log(`ID: ${id}`);
        console.log(`Cédula: ${ci}`);
        console.log(`Hora: ${hora}`);
    }

    function importarRegistros() {
        console.log("Importar registro de llegadas");
        // Aquí puedes añadir la lógica para importar los registros
    }
});
