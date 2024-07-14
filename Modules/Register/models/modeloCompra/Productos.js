// Agregando la conexion a la base de datos
import connection from "../conexion.js"
//Crud de la tabla de los productos de compra

export class ProductoModel{
  //Metodo para obtener todos los productos
  static async listar(){
    try {
      const [productos] = await connection.execute('SELECT * FROM ProductoCompras')
      return productos
    } catch (error) {
      console.log(error)
      throw new Error("Error al obtener los productos")
    }
  }

  static async getNombre(){
    try {
      const [nombres] = await connection.execute('SELECT NombreP FROM ProductoCompras')
      return nombres
    } catch (error) {
      throw new Error("Error al obtener los nombres de los productos")
    }
  }


  // Metodo que crear un producto
  static async crear({input}){
    if (!input) {
      throw new Error("El parámetro 'input' es requerido");
    }
    const {
      NombreP,
      Unidades,
      Consumo
     } = input

    try{
      await connection.execute(
        'INSERT INTO ProductoCompras(NombreP,Unidades,Consumo) VALUES(?,?,?)',
        [NombreP,Unidades,Consumo]
      )

    }catch(e){
      console.log(e)
      throw new Error("Error al crear un producto")
    }
  }
  //Funcion que modifica un producto por id
  static async modificar({id , result}){
    const {
      NombreP,
      Unidades,
      Consumo
    } = result

    try{
      await connection.execute(
        'UPDATE ProductoCompras SET NombreP = ?, Unidades = ?, Consumo = ? WHERE ID_Producto = ?',
        [NombreP,Unidades,Consumo,id]
      )
      
    }catch(e){
      console.log(e)
      throw new Error('Error a Modificar los datos del proveedor')
    }
  }
  // Funcion que elimina un producto
  static async eliminar({nombre}){
    console.log(nombre)
    try{
      await connection.execute(
        'DELETE FROM ProductoCompras WHERE NombreP = ?',
        [nombre]
      )
    }catch(e){
      console.log(e)
      throw new Error('Error a eliminar el producto')
    }
  }
}