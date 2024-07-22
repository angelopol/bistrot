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

-- scripts para agregar proveedores y sus datos
INSERT INTO `Proveedores` (`RIF`, `Nombre_Empresa`, `Dire_Fiscal`, `Correo`, `Nombre_Responsa`, `Tlf`, `Productos_Proveedor`, `Precio_udcompra`) VALUES
('132336789', 'Quesos del Valle', 'Calle 123, Ciudad, País', 'contacto@quesosdelvalle.com', 'Juan Pérez', '123-456-7890', 'queso', 5.00),
('981652222', 'Tomates Rojos', 'Avenida 456, Ciudad, País', 'info@tomatesrojos.com', 'María Gómez', '098-765-4321', 'tomate', 1.50),
('231567666', 'Verduras Frescas', 'Calle 789, Ciudad, País', 'ventas@verdurasfrescas.com', 'Carlos López', '234-567-8901', 'zanahoria', 0.80),
('341648901', 'Papas Andinas', 'Avenida 101, Ciudad, País', 'contacto@papasandinas.com', 'Ana Martínez', '345-678-9012', 'papa', 0.70),
('451789012', 'Vegetales del Campo', 'Calle 112, Ciudad, País', 'info@vegetalesdelcampo.com', 'Pedro Fernández', '456-789-0123', 'apio', 1.20),
('561894123', 'Pollos del Sur', 'Avenida 123, Ciudad, País', 'ventas@pollosdelsur.com', 'Laura Rodríguez', '567-890-1234', 'pollo', 4.50),
('671901234', 'Ajos y Más', 'Calle 134, Ciudad, País', 'contacto@ajosymas.com', 'Luis Sánchez', '678-901-2345', 'ajo', 0.90),
('721012345', 'Champiñones Gourmet', 'Avenida 145, Ciudad, País', 'info@champiñonesgourmet.com', 'Elena Torres', '789-012-3456', 'champiñones', 3.00),
('891123456', 'Cereales Saludables', 'Calle 156, Ciudad, País', 'ventas@cerealesaludables.com', 'David García', '890-123-4567', 'espelta', 2.50),
('901234567', 'Vinagres Finos', 'Avenida 167, Ciudad, País', 'contacto@vinagresfinos.com', 'Andrea Pérez', '901-234-5678', 'vinagre', 2.00),
('011345678', 'Pastas Italianas', 'Calle 178, Ciudad, País', 'info@pastasitalianas.com', 'Mario Rossi', '012-345-6789', 'pasta', 1.80),
('121556780', 'Verduras Gourmet', 'Avenida 189, Ciudad, País', 'ventas@verdurasgourmet.com', 'Sofía Jiménez', '123-456-7891', 'berenjena', 2.10),
('231567333', 'Aceites del Mediterráneo', 'Calle 190, Ciudad, País', 'contacto@aceitesdelmediterraneo.com', 'Miguel Hernández', '234-567-8902', 'aceite', 5.50),
('341678901', 'Pescados del Mar', 'Avenida 201, Ciudad, País', 'info@pescadosdelmar.com', 'Isabel Martínez', '345-678-9013', 'bacalao', 10.00),
('451789019', 'Harinas Selectas', 'Calle 212, Ciudad, País', 'ventas@harinasselectas.com', 'Jorge Fernández', '456-789-0124', 'harina', 1.00),
('561898123', 'Lácteos Naturales', 'Avenida 223, Ciudad, País', 'contacto@lacteosnaturales.com', 'Lucía Rodríguez', '567-890-1235', 'leche', 0.90),
('678911234', 'Dulces y Más', 'Calle 234, Ciudad, País', 'info@dulcesymas.com', 'Raúl Sánchez', '678-901-2346', 'azucar', 0.60),
('799022345', 'Chocolates del Mundo', 'Avenida 245, Ciudad, País', 'ventas@chocolatesdelmundo.com', 'Patricia García', '789-012-3457', 'chocolate', 3.50),
('890113456', 'Frutas del Bosque', 'Calle 256, Ciudad, País', 'contacto@frutasdelbosque.com', 'Daniel Pérez', '890-123-4568', 'fresa', 2.80),
('901214567', 'Patillas y Más', 'Avenida 267, Ciudad, País', 'info@patillasymas.com', 'Sandra Jiménez', '901-234-5679', 'patilla', 1.20),
('012315678', 'Frutas Frescas', 'Calle 278, Ciudad, País', 'ventas@frutasfrescas.com', 'Fernando Hernández', '012-345-6781', 'manzana', 1.50),
('123416789', 'Bananas del Tropico', 'Avenida 289, Ciudad, País', 'contacto@bananasdeltropico.com', 'Claudia Martínez', '123-456-7892', 'banana', 1.10),
('234517222', 'Huevos de Oro', 'Calle 290, Ciudad, País', 'info@huevosdeoro.com', 'Manuel Fernández', '234-567-8903', 'huevo', 0.20),
('345678301', 'Destilados Finos', 'Avenida 301, Ciudad, País', 'ventas@destiladosfinos.com', 'Sergio Rodríguez', '345-678-9014', 'ron', 15.00),
('456789312', 'Frutas del Sol', 'Calle 312, Ciudad, País', 'contacto@frutasdelsol.com', 'Marta Sánchez', '456-789-0125', 'limon', 0.50),
('567890323', 'Bebidas Premium', 'Avenida 323, Ciudad, País', 'info@bebidaspremium.com', 'José García', '567-890-1236', 'whisky', 25.00),
('678901334', 'Tequilas Especiales', 'Calle 334, Ciudad, País', 'ventas@tequilasespeciales.com', 'Carolina Pérez', '678-901-2347', 'tequila', 20.00),
('789112345', 'Vinos Exclusivos', 'Avenida 345, Ciudad, País', 'contacto@vinosexclusivos.com', 'Alejandro Jiménez', '789-012-3458', 'cuvee bistrot chez remy', 30.00),
('890123356', 'Vinos Rojos', 'Calle 356, Ciudad, País', 'info@vinosrojos.com', 'Ángel Hernández', '890-123-4569', 'agneau rouge', 40.00),
('901234367', 'Vinos del Valle', 'Avenida 367, Ciudad, País', 'ventas@vinosdelvalle.com', 'Silvia Martínez', '901-234-5671', 'sancerre aoc', 35.00),
('015345678', 'Vinos y Más', 'Calle 378, Ciudad, País', 'contacto@vinosymas.com', 'Rafael Fernández', '012-345-6782', 'languedoc', 28.00),
('125456789', 'Refrescos Originales', 'Avenida 389, Ciudad, País', 'info@refrescosoriginales.com', 'Beatriz Rodríguez', '123-456-7893', 'coca-cola original', 1.20),
('235567811', 'Refrescos Especiales', 'Calle 390, Ciudad, País', 'ventas@refrescosespeciales.com', 'Tomás Sánchez', '234-567-8904', 'coca-cola cherry', 1.50),
('345678901', 'Bebidas Naranjas', 'Avenida 401, Ciudad, País', 'contacto@bebidasnaranjas.com', 'Inés García', '345-678-9015', 'fanta orange', 1.20),
('455789022', 'Refrescos Verdes', 'Calle 412, Ciudad, País', 'info@refrescosverdes.com', 'Gabriel Pérez', '456-789-0126', 'sprite', 1.20),
('565899123', 'Agua Pura', 'Avenida 423, Ciudad, País', 'ventas@aguapura.com', 'Álvaro Jiménez', '567-890-1237', 'vittel', 0.90),
('678901234', 'Verduras Verdes', 'Calle 434, Ciudad, País', 'contacto@verdurasverdes.com', 'Verónica Hernández', '678-901-2348', 'lechuga', 0.80),
('789612345', 'Vegetales Frescos', 'Avenida 445, Ciudad, País', 'info@vegetalesfrescos.com', 'Esteban Martínez', '789-012-3459', 'pepino', 1.00),
('890263456', 'Pimientos y Más', 'Calle 456, Ciudad, País', 'ventas@pimientosymas.com', 'Ramón Fernández', '890-123-4561', 'aji', 1.10),
('901264567', 'Pimientos del Sol', 'Avenida 467, Ciudad, País', 'contacto@pimientosdelsol.com', 'Natalia Rodríguez', '901-234-5672', 'pimenton', 1.30),
('012365678', 'Cebollines Frescos', 'Calle 478, Ciudad, País', 'info@cebollinesfrescos.com', 'Óscar Sánchez', '012-345-6783', 'cebollin', 0.90);

-- scripts para agregar productos
INSERT INTO `ProductoCompras` (`NombreP`, `Unidades`, `Consumo`) VALUES
('queso', 'bultos', 'kg'),
('tomate', 'bultos', 'kg'),
('zanahoria', 'bultos', 'kg'),
('papa', 'bultos', 'kg'),
('apio', 'bultos', 'kg'),
('pollo', 'cajas', 'kg'),
('ajo', 'bultos', 'kg'),
('champiñones', 'bultos', 'kg'),
('espelta', 'sacos', 'kg'),
('vinagre', 'botellas', 'litros'),
('pasta', 'cajas', 'kg'),
('berenjena', 'bultos', 'kg'),
('aceite', 'botellas', 'litros'),
('bacalao', 'cajas', 'kg'),
('harina', 'sacos', 'kg'),
('leche', 'cajas', 'litros'),
('azucar', 'sacos', 'kg'),
('chocolate', 'cajas', 'kg'),
('fresa', 'bultos', 'kg'),
('patilla', 'bultos', 'kg'),
('manzana', 'bultos', 'kg'),
('banana', 'bultos', 'kg'),
('huevo', 'cajas', 'unidades'),
('ron', 'botellas', 'litros'),
('limon', 'bultos', 'kg'),
('whisky', 'botellas', 'litros'),
('tequila', 'botellas', 'litros'),
('cuvee bistrot chez remy', 'botellas', 'litros'),
('agneau rouge', 'botellas', 'litros'),
('sancerre aoc', 'botellas', 'litros'),
('languedoc', 'botellas', 'litros'),
('coca-cola original', 'cajas', 'botellas'),
('coca-cola cherry', 'cajas', 'botellas'),
('fanta orange', 'cajas', 'botellas'),
('sprite', 'cajas', 'botellas'),
('vittel', 'cajas', 'botellas'),
('lechuga', 'bultos', 'kg'),
('pepino', 'bultos', 'kg'),
('aji', 'bultos', 'kg'),
('pimenton', 'bultos', 'kg'),
('cebollin', 'bultos', 'kg');

