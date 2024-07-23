document.addEventListener('DOMContentLoaded', () => {
  const fechaInput = document.getElementById('fecha-input');
  const today = new Date().toISOString().split('T')[0];
  fechaInput.value = today;

  async function obtenerEntradas(fecha) {
      try {
          const response = await fetch(`/rrhh/entrada?fecha=${fecha}`);

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
      tabla.innerHTML = '';

      entradas.forEach(entrada => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
              <td class="info">${entrada.cedula}</td>
              <td class="info">${entrada.nombre}</td>
              <td class="info">${entrada.primer_marcaje}</td>
              <td class="info">${entrada.ultimo_marcaje}</td>
          `;
          tabla.appendChild(fila);
      });
  }

  fechaInput.addEventListener('change', () => {
      const fechaSeleccionada = fechaInput.value;
      obtenerEntradas(fechaSeleccionada);
  });

  obtenerEntradas(today);
});
