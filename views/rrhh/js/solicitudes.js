document.addEventListener('DOMContentLoaded', function() {
    const solicitudesTableBody = document.querySelector('#solicitudesTable tbody');
    const solicitarButton = document.getElementById('solicitar');

    let solicitudes = []; // Array para almacenar los datos de las solicitudes

    // Función para cargar los datos de las solicitudes
    const loadSolicitudes = () => {
        fetch('/register/solicitudes')
            .then(response => response.json())
            .then(data => {
                solicitudes = data;
                renderSolicitudesTable(solicitudes);
            })
            .catch(error => console.error('Error fetching solicitudes data:', error));
    };

    // Función para renderizar la tabla de solicitudes
    const renderSolicitudesTable = (data) => {
        solicitudesTableBody.innerHTML = ''; // Limpiar el contenido actual de la tabla
        data.forEach(solicitud => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${solicitud.nombre}</td>
                <td>${solicitud.Modulo}</td>
                <td>${formatDate(solicitud.Fecha_Registro)}</td>
                <td>${formatDate(solicitud.Fecha)}</td>
                <td>${solicitud.motivo}</td>
                <td>
                    <select class="estado-select" data-id="${solicitud.ID}">
                        <option value="0" ${solicitud.Estado === 0 ? 'selected' : ''}>Pendiente</option>
                        <option value="1" ${solicitud.Estado === 1 ? 'selected' : ''}>Completada</option>
                        <option value="2" ${solicitud.Estado === 2 ? 'selected' : ''}>Cancelada</option>
                    </select>
                </td>
            `;
            solicitudesTableBody.appendChild(row);
        });

        // Agregar eventos a los select de estado
        document.querySelectorAll('.estado-select').forEach(select => {
            select.addEventListener('change', updateEstado);
        });
    };

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    };

    // Función para actualizar el estado de la solicitud
    const updateEstado = (event) => {
        const select = event.target;
        const newEstado = select.value;
        const solicitudID = select.getAttribute('data-id');

        fetch(`/register/solicitudes/estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: newEstado, id : solicitudID})
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error actualizando estado: ${data.error}`);
            } else {
                alert('Estado actualizado exitosamente');
            }
        })
        .catch(error => {
            console.error('Error updating estado:', error);
            alert('Hubo un error al actualizar el estado');
        });
    };

    // Cargar las solicitudes al inicio
    loadSolicitudes();
});
