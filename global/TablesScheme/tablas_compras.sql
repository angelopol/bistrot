-- Tabla del historial de compras (Tabla que fue actualizada)
CREATE TABLE `bistrot`.`Historial` (
    `ID` INT NOT NULL AUTO_INCREMENT, -- Identificación de las compras
    `FECHA` DATETIME NOT NULL, -- Fecha General
    -- `Factura` VARCHAR(200) NOT NULL, -- Factura de la compra
    `Pago` VARCHAR(200) NOT NULL, -- Condición Comercial
    `Producto` VARCHAR(200) NOT NULL, -- Nombre del producto
    `Cantidad` FLOAT NOT NULL, -- Cantidad de productos
    `Precio` FLOAT NOT NULL, -- Precio del Producto
    `Nombre_Proveedor` VARCHAR(200) NOT NULL, -- Nombre del proveedor
    `Autorizacion` VARCHAR(200) NOT NULL, -- Persona que autoriza la compra
    `Recibido` boolean NOT NULL, -- Campo que actualiza inventario cuando reciban compra
    PRIMARY KEY (`ID`),
    UNIQUE (`ID`, `FECHA`)
);

CREATE TABLE `bistrot`.`ProductoCompras` (
    `ID_Producto` INT NOT NULL AUTO_INCREMENT, -- ID del Producto
    -- `ID_Proveedor` INT NOT NULL, -- ID del proveedor
    `NombreP` VARCHAR(200) NOT NULL, -- Nombre del producto
    `Unidades` VARCHAR(200) NOT NULL, -- Unidades de Compra (EJ: bultos)
    `Consumo` VARCHAR(200) NOT NULL, -- Unidades de Consumo (EJ: kg)
    -- `Monto` FLOAT NOT NULL, -- Monto de producto
    -- `Numero_Factura` INT NOT NULL, -- Numero de factura
    PRIMARY KEY (`ID_Producto`),
    UNIQUE ( `NombreP`)
);

-- Tabla de los proveedores de las compras del restaurante
CREATE TABLE `bistrot`.`Proveedores` (
	`RIF` VARCHAR(200) CHARACTER SET utf8 NOT NULL, -- RIF
    `Nombre_Empresa` VARCHAR(200) CHARACTER SET utf8 NOT NULL, -- Nombre de la empresa
    `Dire_Fiscal` TEXT(255), -- Dirección Fiscal
    `Correo` VARCHAR(200) CHARACTER SET utf8 NOT NULL, -- Correo del Proveedor
    `Nombre_Responsa` VARCHAR(200) CHARACTER SET utf8 NOT NULL, -- Persona con la que se negocia
    `Tlf` VARCHAR(200) CHARACTER SET utf8 NOT NULL, -- Numero de teléfono del proveedor
    `Productos_Proveedor` VARCHAR(200) CHARACTER SET utf8 NOT NULL, -- Productos del proveedor
    `Precio_udcompra` FLOAT NOT NULL, -- Precio por unidad de compra del producto
    PRIMARY KEY (`RIF`),
    UNIQUE (`Nombre_Empresa`, `Correo`, `Nombre_Responsa`, `Tlf`)
);


-- Tabla de las solicitudes de las compras
CREATE TABLE `bistrot`.`Solicitudes` (
	`ID_Requisicion` INT NOT NULL AUTO_INCREMENT, -- Identificación de la requisición
    `Departamento` VARCHAR(200) NOT NULL, -- Departamento
    `ID_Empleado` INT NOT NULL , -- ID de los empleados
    `Cantidad` FLOAT NOT NULL, -- Cantidad de los productos
    `Nombre_Producto` VARCHAR(200) NOT NULL, 
    `FECHA` DATETIME NOT NULL, -- Fecha en la que se hizo la solicitud
    `Aprobada` boolean not null, -- Valor booleano para identificar si esta aprobada o no
    `DETALLE` TEXT(255) , -- Justificación
    `Comprado` boolean not null, -- Valor booleano para saber si ya se compro la requisicion
    PRIMARY KEY (`ID_Requisicion`),
    UNIQUE (`ID_Requisicion`, `FECHA`)
);