document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const usuario = event.target.elements['usuario'].value; //Para obtener usuario
        const contrasena = event.target.elements['contrasena'].value; //Para obtener contrasena 


        fetch('http://localhost:3000/api/login', { // Realiza una solicitud fetch a la URL del endpoint de login
            method: 'POST', // Define el método HTTP
            headers: {
                'Content-Type': 'application/json' // Especifica que el contenido de la solicitud es JSON
            },
            body: JSON.stringify({ usuario, contrasena }) // Convierte el usuario y contrasena en un string JSON y lo adjunta al body
        })
            .then(response => response.json()) // Convierte la respuesta a un objeto JSON
            .then(data => {
                // Verifica si la respuesta contiene un token
                if (data.token) {
                    localStorage.setItem('token', data.token); // Almacena el token en el almacenamiento local 
                    loginMessage.textContent = 'Conexión exitosa. Redirigiendo...'; // Muestra un mensaje de éxito

                    // Redirige a la página 'modulo_cocina.html'
                    setTimeout(() => {
                        window.location.href = 'modulo_cocina.html';
                    });
                } else {
                    // Si no se recibe un token, muestra un mensaje de credenciales incorrectas
                    loginMessage.textContent = 'Credenciales incorrectas';
                }
            })
            .catch(error => {
                // Captura cualquier error 
                console.error('Error during login:', error); // Muestra el error en la consola para depuración
                loginMessage.textContent = 'Error durante el inicio de sesión'; // Muestra un mensaje de error al usuario
            });
    });
});
