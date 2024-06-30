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

-- Tabla de los Productos de las compras
CREATE TABLE 'bistrot'.'ProductoCompras'(
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

--Tabla de los provvedores de las compras del restaurante

CREATE TABLE 'bistrot'.'Proveedores'(
    'Nombre_empresa' VARCHAR(200) NOT NULL, --Nombre de la empresa
    'RIF' VARCHAR(200) NOT NULL, -- RIF
    'Dire_Fiscal' VARCHAR(200) NOT NULL, -- Dirección Fiscal
    'Correo' VARCHAR(200) NOT NULL, -- Correo del Proveedor
    'Nombre_resposa' VARCHAR(200) NOT NULL, -- Persona con la que se negocia
    'Tlf' VARCHAR(200) NOT NULL, -- Numero de telefono del proveedor
    PRIMARY KEY('Nombre_empresa'),
    UNIQUE('Nombre_empresa','Dire_fiscaL','Correo',
    'Nombre_resposa','Tlf')
);

--Tabla de las solicitudes de las compras

CREATE TABLE 'bistrot'.'Solicitudes'(
    'Departamento' VARCHAR(200) NOT NULL, --Departamento
    'ID_Empleado' INT NOT NULL AUTO_INCREMENT, -- ID de los empleados
    'Codigo_Producto' VARCHAR(200) NOT NULL, -- Codigo de los productos
    'ID_requisión' INT NOT NULL AUTO_INCREMENT, -- Identificación de la requesición
    'FECHA' DATETIME NOT NULL, -- Fecha en la que se hizo la solicitud
    'DETALLE' VARCHAR(200) NOT NULL, -- Justificación
    PRIMARY KEY('ID_Empleado'),
    UNIQUE('Departamento','Codigo_Producto','ID_requisión',
    'FECHA','DETALLE')
);