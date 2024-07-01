### Cambios aplicados luego del commit #4adfc61 en la rama master ###
-Se movieron todas las carpetas dentro de ventas_salon a la carpeta raiz del modulo **ventas**
-Se unificaron las rutas dentro de ventas_salon/routes con las rutas dentro de ventas.js
-Se movio la tabla de la base de datos a la carpeta global
-Se cambiaron todos los require por Import, ya que el proyecto usa ES module no CommonJS
-Se agrego la keyword **export** a todas las clases para identifar como la clase a importar del modulo en particular
-Se elimino la declaracion literal de exportacion **module.exports**