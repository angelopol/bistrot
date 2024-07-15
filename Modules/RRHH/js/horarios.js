// Función para generar una hora exacta aleatoria entre 15:00 y 20:00
function generateRandomHour() {
    const hours = [15, 16, 17, 18, 19, 20];
    const randomHour = hours[Math.floor(Math.random() * hours.length)];
    return `${randomHour}:00`;
  }
  
  // Obtener los elementos de la tabla
  const table = document.querySelector('table');
  const rows = table.querySelectorAll('tr');
  
  // Generar horas aleatorias para cada fila
  rows.forEach((row, index) => {
    if (index > 0) { // Saltar la fila de encabezado
      const entradaCell = row.cells[2];
      const salidaCell = row.cells[3];
  
      // Generar hora de entrada aleatoria
      const entradaHour = generateRandomHour();
      entradaCell.textContent = entradaHour;
  
      // Generar hora de salida aleatoria, al menos 2 horas más tarde que la hora de entrada
      const [entradaHourValue] = entradaHour.split(':').map(Number);
      let salidaHourValue = entradaHourValue + Math.floor(Math.random() * (23 - entradaHourValue - 2)) + 2;
      salidaHourValue = Math.max(salidaHourValue, entradaHourValue + 1); // asegurarnos de que la hora de salida sea mayor que la hora de entrada
      salidaHourValue = Math.min(salidaHourValue, 23); // asegurarnos de que no sea mayor que 23
      const salidaHour = `${salidaHourValue}:00`;
      salidaCell.textContent = salidaHour;
    }
});