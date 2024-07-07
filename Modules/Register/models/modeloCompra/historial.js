// Agregando la conexion a a base de datos
import connection from "../conexion.js"
// Crud para la tabla del historial de compras

export class HistorialModel{
  // Funcion que agrega la compra
  static async agregar({input}){
    //Los nombres de las variables tienen que ser igual a las del json
    const{
      FECHA,
      Pago,
      Producto,
      Cantidad,
      Precio,
      Nombre_Proveedor,
      Autorizacion
     } = input

    const fecha = new Date(FECHA) 

    try{
      await connection.execute(
        'INSERT INTO Historial(FECHA,Pago,Producto,Cantidad,Precio,Nombre_Proveedor,Autorizacion) VALUES(?,?,?,?,?,?,?)',
        [fecha,Pago,Producto,Cantidad,Precio,Nombre_Proveedor,Autorizacion]
      )

      const [orden] = await connection.execute('SELECT * FROM HISTORIAL WHERE ID = LAST_INSERT_ID()');
      return orden
    }catch(e){
      console.log(e)
      throw new Error("Error agregando la compra al historial")
    }
  }
}