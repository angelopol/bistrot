-- Tabla de los Productos de las compras
CREATE TABLE 'bistrot'.'Producto'(
    'ID_Producto' INT NOT NULL AUTO_INCREMENT, -- ID del Producto
    'ID_proveedor' INT NOT NULL AUTO_INCREMENT, -- ID del proveedor
    'Nombre' VARCHAR(200) NOT NULL, -- Nombre del producto
    'Unidades' INT NOT NULL, -- Unidades de Compra
    'Consumo' INT NOT NULL, --Unidades de Consumo
    'Monto' FLOAT NOT NULL, --Monto de producto
    'Numero_Factura' INT NOT NULL, --Numero de factura
    PRIMARY KEY('ID_producto'),
    UNIQUE('ID_proveedor','Nombre','Unidades','Consumo',
    'Monto','Numero_Factura')
);