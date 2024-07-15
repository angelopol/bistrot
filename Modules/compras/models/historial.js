// Agregando la conexion a a base de datos
import connection from "../conexion.js"
// Crud para la tabla del historial de compras

export class HistorialModel{
  //Funcion para listar todas las compras hechas
  static async listar(){
    try {
      const [ordenes] = await connection.execute('SELECT * FROM HISTORIAL');
      return ordenes
    } catch (error) {
      throw new Error("Error mostrando el historial de compras")
    }
  }

  // Funcion que agrega la compra
  static async agregar({input}){
    //Los nombres de las variables tienen que ser igual a las del json
    const{
      nombreP,
      cantidad,
      proveedor
     } = input

     

    const fecha = new Date()
    let prov = []
    try {
      [prov] = await connection.execute('SELECT * FROM Proveedores WHERE Nombre_Empresa=?',[proveedor])
    } catch (error) {
      console.log(error)
      throw new Error("Error seleccionando datos del proveedor")
    }

    let numero = (cantidad*prov[0].Precio_udcompra) * 1.1;
    let pago = parseFloat(numero.toFixed(2));
    let condicion = "Contado"
    //La autorizacion viene dada por el usuario que esta activo (que tiene que ser gerente de compras o gerente general)
    var autorizacion = "Gerente de Compras: Samuel Molina"
    try{
      await connection.execute(
        'INSERT INTO Historial(FECHA,Pago,Producto,Cantidad,Precio,Nombre_Proveedor,Autorizacion) VALUES(?,?,?,?,?,?,?)',
        [fecha,condicion,nombreP,cantidad,pago,proveedor,autorizacion]
      )

      const orden = [nombreP,fecha,cantidad,pago,condicion]
      return orden
      
    }catch(e){
      console.log(e)
      throw new Error("Error agregando la compra al historial")
    }
  }

  static async eliminar(){
    try {
      await connection.execute('DELETE FROM Historial WHERE ID = LAST_INSERT_ID()')
    } catch (error) {
      console.log(error)
    }
  }
}