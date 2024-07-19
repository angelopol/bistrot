document.getElementById('submit-button').addEventListener('click', function(event) {
    event.preventDefault();

    const formData = {
        cedula: document.getElementById('employee-ci').value,
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
        cedula: formData.cedula,
    };

    console.log('Datos a enviar:', dataToSend);

    fetch('/register/entradas', { 
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
            alert('Entrada registrada exitosamente');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al registrar la entrada');
    });
});
