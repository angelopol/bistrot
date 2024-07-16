import connection from "./conexion.js";

// Definir la función verificarInventario
export function verificarInventario(callback) {
    console.log("Inicio de la función verificarInventario");

    // Consulta para verificar la tabla cocina_bar
    const queryCocinaBar = `
      SELECT id_cocina_bar AS id, nombre, cantidad
      FROM cocina_bar
      WHERE cantidad <= 10;
    `;
  
    // Consulta para verificar la tabla general
    const queryGeneral = `
      SELECT id_general AS id, nombre, cantidad
      FROM general
      WHERE cantidad <= 10;
    `;
    console.log("Consultas definidas");

    connection.query(queryCocinaBar, (err, resultsCocinaBar) => {
        console.log("Consulta a cocina_bar realizada");
      if (err) {
        console.error('Error en la consulta de cocina_bar:', err);
        throw err;
      }

      // Imprimir los resultados de la tabla cocina_bar
      console.log('Resultados de cocina_bar con cantidad <= 10:', resultsCocinaBar);

      connection.query(queryGeneral, (err, resultsGeneral) => {
        if (err) {
          console.error('Error en la consulta de general:', err);
          throw err;
        }

        // Imprimir los resultados de la tabla general
        console.log('Resultados de general con cantidad <= 10:', resultsGeneral);

        // Concatenar resultados de ambas tablas
        const lowStockItems = [...resultsCocinaBar, ...resultsGeneral];

        // Imprimir todos los productos con cantidad baja
        console.log('Todos los productos con cantidad <= 10:', lowStockItems);

        // Agregar cantidad base para pedir
        const pedidos = lowStockItems.map(item => ({
          id: item.id,
          nombre: item.nombre,
          cantidad_a_pedir: 20
        }));

        // Imprimir los productos con la cantidad a pedir
        console.log('Productos con cantidad a pedir:', pedidos);

        callback(pedidos);
      });
    });
  }