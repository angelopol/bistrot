--Tabla del historial de compras

CREATE TABLE 'bistrot'.'Producto'(
    'ID' INT NOT NULL AUTO_INCREMENT, -- Identificación de las compras
    'FECHA' DATETIME NOT NULL, -- Fecha General
    'Factura' VARCHAR(200) NOT NULL, -- Factura de la compra
    'Pago' INT NOT NULL, -- Condición Comercial
    'Producto' INT NOT NULL, -- Nombre del producto
    'Cantidad' FLOAT NOT NULL, --Cantidad de productos
    'Precio' INT NOT NULL,-- Precio del Producto
    'Nombre_Proveedor' VARCHAR(200) NOT NULL, --Nombre del proveedor
    'Departamento' VARCHAR(200) NOT NULL; --Departamento
    PRIMARY KEY('ID'),
    UNIQUE('ID','FECHA','Factura','Pago','Producto',
    'Cantidad','Precio','Nombre_Proveedor','Departamento')
);