// Agregando la conexion a la base de datos
import connection from "../conexion.js"
//Crud de la tabla de los productos de compra

export class ProductoModel{
  // Funcion que crear un producto
  static async crear({input}){
    if (!input) {
      throw new Error("El parámetro 'input' es requerido");
    }
    const {
      ID_Proveedor,
      NombreP,
      Unidades,
      Consumo
     } = input

    try{
      await connection.execute(
        'INSERT INTO ProductoCompras(ID_Proveedor,NombreP,Unidades,Consumo) VALUES(?,?,?,?)',
        [ ID_Proveedor,NombreP,Unidades,Consumo]
      )

      const [producto] = await connection.execute("SELECT * FROM ProductoCompras WHERE ID_Producto = LAST_INSERT_ID()");
      return producto
    }catch(e){
      console.log(e)
      throw new Error("Error al crear un producto")
    }
  }
  //Funcion que modifica un producto por id
  static async modificar({id , result}){
    const {
      ID_Proveedor,
      NombreP,
      Unidades,
      Consumo
    } = result

    try{
      // Construir la parte de la consulta SQL para actualizar
      /*let updates = [];
      let values = [];
      if (NombreP){
        updates.push("NombreP=?");
        values.push(NombreP); 
      }

      if (Unidades){
        updates.push("NombreP=?");
        values.push(NombreP); 
      }
      */

      //Quede aqui arrreglando este metodo
      await connection.execute(
        'UPDATE ProductoCompras SET ID_Proveedor = ?, NombreP = ?, Unidades = ?, Consumo = ? WHERE ID_Producto = ?',
        [ID_Proveedor,NombreP,Unidades,Consumo,id]
      )
      const [actualizado] = await connection.execute("SELECT * FROM ProductoCompras WHERE ID_Producto = ?",[id]);
      return actualizado
    }catch(e){
      console.log(e)
      throw new Error('Error a Modificar los datos del proveedor')
    }
  }
  // Funcion que elimina un producto
  static async eliminar({id}){
    
    try{
      const [result]=await connection.execute(
        'DELETE FROM ProductoCompras WHERE ID_Producto = ?',
        [id]
      )
      if (result.affectedRows > 0) {
        return { message: `Producto con id ${id} eliminado correctamente.` };
    } else {
        throw new Error(`No se encontró ningun producto con id ${id}.`);
    }
    }catch(e){
      console.log(e)
      throw new Error('Error a eliminar el producto')
    }
  }
}