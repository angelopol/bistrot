//Agregando la conexion a la base de datos
import connection from "../conexion.js"
// Crud para la tabla de las solicitudes de compra

export class SolicitudModel{
  //Funcion que agrega una solicitud
  static async agregar({input}){
    const {
      depar,
      id_emp,
      cant,
      nombre_producto,
      fecha,
      detalle
    } = input

    const fechaa = new Date()

    let aprobacion = false

    try{
      await connection.execute(
        'INSERT INTO Solicitudes(Departamento,ID_Empleado,Cantidad,Nombre_Producto,FECHA,Aprobada,DETALLE) VALUES(?,?,?,?,?,?,?)',
        [depar,id_emp,cant,nombre_producto,fechaa,aprobacion,detalle]
      )

      //const [producto] = await connection.execute("SELECT * FROM Solicitudes WHERE ID_Requisicion = LAST_INSERT_ID()")
      //return producto
    }catch(e){
      console.log(e)
      throw new Error("Error al agregar una nueva solicitud")
    }
  }
  //Funcion que elimina una solicitud
  static async eliminar({id}){

    try{
      const [result] = await connection.execute(
        'DELETE FROM Solicitudes WHERE ID_Requisicion = ?',
        [id]
      )
      if (result.affectedRows > 0) {
        return { message: `Requisicion con id ${id} eliminado correctamente.` };
      }else {
        throw new Error(`No se encontró ninguna requisicion con id ${id}.`);
      }
    }catch(e){
      console.log(e)
      throw new Error("Error al eliminar la solicitud")
    }
  }
  //Funcion que modifica una solicitud
  static async modificar({id,result}){
    const {
      depar,
      codigo_empleado,
      codigo_producto,
      nombre_producto,
      fecha,
      detalle
    } = result

    const fechaa = new Date(fecha)

    try{
      await connection.execute(
        'UPDATE Solicitudes SET Departamento = ?,ID_Empleado=? ,Codigo_Producto = ?,Nombre_Producto=? ,FECHA = ?, DETALLE = ? WHERE  ID_Requisicion = ?',
        [depar,codigo_empleado,codigo_producto,nombre_producto,fechaa,detalle,id]
      )

      const [actualizado] = await connection.execute("SELECT * FROM Solicitudes WHERE ID_Requisicion = ?",[id]);
      return actualizado
    }catch(e){
      console.log(e)
      throw new Error("Error al modificar la solicitud")
    }
  }
  //Funcion que busca una solicitud
  static async buscar({id}){
    const[solicitud] = await connection.execute(
      'SELECT * FROM Solicitudes WHERE ID_Requisicion = ?',
      [id]
    )
    return solicitud[0];
  }
}