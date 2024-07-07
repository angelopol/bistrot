// Agregando la conexion a la base de datos
import connection from "../conexion.js"
// Modelo para los proveedores


export class ProveedoresModel{
  //Funcion que crea un proovedor
  static async crear({input}) {
    const {
      rif,
      nombre_empresa,
      Dire_Fiscal,
      Correo,
      nombre_responsa,
      Tlf,
      ProveedorProd
    } = input

    try{
      await connection.execute(
        'INSERT INTO Proveedores(RIF,Nombre_empresa,Dire_Fiscal,Correo,Nombre_responsa,Tlf,Productos_proveedor) VALUES(?,?,?,?,?,?,?)',
        [rif,nombre_empresa,Dire_Fiscal,Correo,nombre_responsa,Tlf,ProveedorProd]
      )

      const [proveedor] = await connection.execute("SELECT * FROM Proveedores WHERE RIF = ?",[rif]);
      return proveedor
    }catch(e){
      console.log(e)
      throw new Error('Error creando el proveedor')
    }
  }
  // Funcion que elimina un proveedor
  static async eliminar({id}){

    try{
      const [result] = await connection.execute(
        'DELETE FROM Proveedores WHERE RIF = ?',
        [id]
      )
      if (result.affectedRows > 0) {
        return { message: `Producto con id ${id} eliminado correctamente.` };
      }else {
        throw new Error(`No se encontró ningun producto con id ${id}.`);
      }
    }catch(e){
      console.log(e)
      throw new Error('Error a eliminar el proveedor')
    }

  }
  // Función que encuentra al proveedor por su rif
  static async buscar({id}){
    console.log("Entre")
    const[fila] = await connection.execute(
      'SELECT * FROM Proveedores WHERE RIF = ?',
      [id]
    )
    return fila[0]
  }
  // Función que modifica la informacion del Proveedor
  static async modificar({id,result}){
    console.log('Entre')
    const {
      nombre_empresa,
      Dire_Fiscal,
      Correo,
      nombre_responsa,
      Tlf,
      ProveedorProd
    } = result
    
    try{
      await connection.execute(
        'UPDATE Proveedores SET  Nombre_empresa = ?, Dire_Fiscal = ?, Correo = ?,Nombre_responsa = ?, Tlf = ?, Productos_proveedor = ? WHERE  RIF = ?',
        [nombre_empresa,Dire_Fiscal,Correo,nombre_responsa,Tlf,ProveedorProd,id]
      )
      const[fila] = await connection.execute(
        'SELECT * FROM Proveedores WHERE RIF = ?',
        [id]
      )
      return fila[0]
    }catch(e){
      console.log(e)
      throw new Error('Error a Modificar los datos del proveedor')
    }
  }
}

