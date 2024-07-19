// Esta función la puedes usar en cualquier archivo y te trae la lista de entradas
async function ObtenerEntradas() {
    try {
      const response = await fetch('http://localhost:1234/rrhh/entrada');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const entradas = await response.json();
  
      llenarTabla(entradas);
    } catch (error) {
      console.error('Error fetching entradas:', error);
    }
  }
  
  function llenarTabla(entradas) {
    const tabla = document.querySelector('.table tbody');
  
    // Limpia la tabla antes de agregar nuevas filas
    tabla.innerHTML = `
      <tr>
        <th scope="col" class="encabezado">Cedula</th>
        <th scope="col" class="encabezado">Hora de Entrada</th>
      </tr>
      <tr></tr>
    `;
  
    // Itera sobre las entradas y agrega una fila por cada una
    // Aquí llena la tabla del HTML
    entradas.forEach(entrada => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td class="info">${entrada.cedula}</td>
        <td class="info">${entrada.hora_entrada}</td>
      `;
      tabla.appendChild(fila);
    });
  }
  
  // Llama a la función para obtener y llenar la tabla con las entradas
  ObtenerEntradas();
  