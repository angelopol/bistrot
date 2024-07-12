//Agregando la conexion a la base de datos
import connection from "../conexion.js"
// Crud para la tabla de las solicitudes de compra

export class SolicitudModel{
  //Metodo para obtener id, nombre del producto y cantidad de la requisicion
  static async getReq(){
    try {
      const [requisicion] = await connection.execute('SELECT * FROM Solicitudes')
      return requisicion
    } catch (error) {
      throw new Error("Error al obtener datos de la requisicion")
    }
  }

  //Funcion para recuperar todos los id de las requisiciones
  static async getId (){
    try {
      const [ids] = await connection.execute('SELECT ID_Requisicion FROM Solicitudes')
      return ids
    } catch (error) {
      throw new Error("Error al obtener los id de la requisicion")
    }
  }

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
        'INSERT INTO Solicitudes(Departamento,ID_Empleado,Cantidad,Nombre_Producto,FECHA,Aprobada,DETALLE,Comprado) VALUES(?,?,?,?,?,?,?,?)',
        [depar,id_emp,cant,nombre_producto,fechaa,aprobacion,detalle,aprobacion]
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
  static async modificar({input}){
    const {id_req} = input
    console.log("Entre")
    let aprobar = 1

    try{
      await connection.execute(
        'UPDATE Solicitudes SET Aprobada=? WHERE  ID_Requisicion = ?',
        [aprobar,id_req]
      )

      //const [actualizado] = await connection.execute("SELECT * FROM Solicitudes WHERE ID_Requisicion = ?",[id]);
      //return actualizado
    }catch(e){
      //console.log(e)
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