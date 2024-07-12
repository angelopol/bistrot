// Agregando la conexion a la base de datos
import connection from "../conexion.js"
// Modelo para los proveedores


export class ProveedoresModel{
  //Funcion para obtener un proveedor por su rif (id)
  static async buscar({rif}){
    console.log("Entre")
    try {
      const [proveedor] = await connection.execute("SELECT * FROM Proveedores WHERE RIF = ?",[rif])
      return proveedor[0]
    } catch (error) {
      throw new Error("Error a obtener proveedor por su rif")
    }
  }

  //Funcion para obtener todos los proveedores y listarlos
  static async listar(){
    try {
      const [proveedores] = await connection.execute('SELECT * FROM Proveedores')
      return proveedores
      
    } catch (error) {
      throw new Error('Error al obtener proveedores')
    }
    
  }
  //Funcion que crea un proovedor
  static async crear({input}) {
    const {
      nombre_empresa,
      rif,
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

    }catch(e){
      console.log(e)
      throw new Error('Error creando el proveedor')
    }
  }
  // Funcion que elimina un proveedor
  static async eliminar({nombre}){

    try{
      await connection.execute(
        'DELETE FROM Proveedores WHERE Nombre_empresa = ?',
        [nombre]
      )
      
    }catch(e){
      console.log(e)
      throw new Error('Error a eliminar el proveedor')
    }

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

    }catch(e){
      console.log(e)
      throw new Error('Error a Modificar los datos del proveedor')
    }
  }
}

