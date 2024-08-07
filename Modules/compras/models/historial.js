// Agregando la conexion a a base de datos
import connection from "../conexion.js"
// Crud para la tabla del historial de compras

export class HistorialModel {
  //Funcion para listar todas las compras hechas
  static async listar() {
    try {
      const [ordenes] = await connection.execute('SELECT * FROM HISTORIAL');
      return ordenes
    } catch (error) {
      throw new Error("Error mostrando el historial de compras")
    }
  }

  // Funcion que agrega la compra
  static async agregar({ input }) {
    //Los nombres de las variables tienen que ser igual a las del json
    const {
      nombreP,
      cantidad,
      proveedor
    } = input



    const fecha = new Date()
    let prov = []
    try {
      [prov] = await connection.execute('SELECT * FROM Proveedores WHERE Nombre_Empresa=?', [proveedor])
    } catch (error) {
      console.log(error)
      throw new Error("Error seleccionando datos del proveedor")
    }

    let numero = (cantidad * prov[0].Precio_udcompra) * 1.1;
    let pago = parseFloat(numero.toFixed(2));
    let condicion = "Contado"
    //La autorizacion viene dada por el usuario que esta activo (que tiene que ser gerente de compras o gerente general)
    var autorizacion = "Gerente de Compras: Samuel Molina"
    var recibido = false
    try {
      await connection.execute(
        'INSERT INTO Historial(FECHA,Pago,Producto,Cantidad,Precio,Nombre_Proveedor,Autorizacion,Recibido) VALUES(?,?,?,?,?,?,?,?)',
        [fecha, condicion, nombreP, cantidad, pago, proveedor, autorizacion, recibido]
      )

      const orden = [nombreP, fecha, cantidad, pago, condicion]
      return orden

    } catch (e) {
      console.log(e)
      throw new Error("Error agregando la compra al historial")
    }
  }

  static async actualizar({ id }) {
    const recibido = true;
    try {
      await connection.execute('UPDATE Historial SET Recibido=? WHERE ID=?', [recibido ? 1 : 0, id]);
    } catch (error) {
      throw new Error("Error modificando estatus de compra: " + error.message);
    }
  }


  static async eliminar() {
    try {
      await connection.execute('DELETE FROM Historial WHERE ID = LAST_INSERT_ID()')
    } catch (error) {
      console.log(error)
    }
  }

  static async obtener({ id }) {
    try {
      const [rows] = await connection.execute('SELECT * FROM historial WHERE ID = ?', [id]);

      if (rows.length === 0) {
        throw new Error('Orden no encontrada');
      }
      return rows[0];
    } catch (error) {
      console.error('Error al obtener la orden:', error);
      throw error;
    }
  }
}