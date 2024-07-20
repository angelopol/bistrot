fetch('/api/mantenimientos_realizar', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

const mantenimientoId = 1; // Cambia esto por el ID que deseas obtener
fetch(`/api/mantenimientos_realizar/${mantenimientoId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('ID no existe');
    }
    return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

const nuevoMantenimiento = {
    mantenimiento: 'Revisión del sistema de calefacción',
    responsable: 'Juan Pérez',
    inicio: '2024-07-20',
    fin: '2024-07-21'
};

fetch('/api/mantenimientos_realizar', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoMantenimiento)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

