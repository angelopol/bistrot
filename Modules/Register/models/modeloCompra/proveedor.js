// Agregando la conexion a la base de datos
import connection from "../conexion.js"
// Modelo para los proveedores


export class ProveedoresModel{
  //Funcion para buscar por un producto el nombre del proveedor
  static async filtrar({nombre}){
    console.log(nombre)
    try {
      const [proveedor] = await connection.execute("SELECT * FROM Proveedores WHERE Productos_Proveedor = ?",[nombre])
      return proveedor
    } catch (error) {
      throw new Error("Error a obtener proveedor por su nombre")
    }
  } 

  //Funcion para obtener un proveedor por su rif (id)
  static async buscar({rif}){
    
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
      ProveedorProd,
      precio
    } = input

    try{
      await connection.execute(
        'INSERT INTO Proveedores(RIF,Nombre_empresa,Dire_Fiscal,Correo,Nombre_responsa,Tlf,Productos_proveedor,Precio_udcompra) VALUES(?,?,?,?,?,?,?,?)',
        [rif,nombre_empresa,Dire_Fiscal,Correo,nombre_responsa,Tlf,ProveedorProd,precio]
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
      ProveedorProd,
      precio
    } = result
    
    try{
      await connection.execute(
        'UPDATE Proveedores SET  Nombre_empresa = ?, Dire_Fiscal = ?, Correo = ?,Nombre_responsa = ?, Tlf = ?, Productos_proveedor = ?, Precio_udcompra=? WHERE  RIF = ?',
        [nombre_empresa,Dire_Fiscal,Correo,nombre_responsa,Tlf,ProveedorProd,precio,id]
      )

    }catch(e){
      console.log(e)
      throw new Error('Error a Modificar los datos del proveedor')
    }
  }

  static async getProducto({proveedor}){
    try {
      const nombreProducto = await connection.execute('SELECT Productos_Proveedor FROM Proveedores WHERE Nombre_Empresa=?',[proveedor])
      return nombreProducto[0]
    } catch (error) {
      console.log(error)
    }
  }
}

