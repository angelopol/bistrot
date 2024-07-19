CREATE TABLE IF NOT EXISTS `empleados` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(500) NOT NULL,
    `password` VARCHAR(500) NOT NULL,
    `Nombre` varchar(50) DEFAULT NULL,
    `cedula` varchar(50) DEFAULT NULL,
    `Apellido` varchar(50) DEFAULT NULL,
    `Puesto` varchar(50) DEFAULT NULL,
    `fecha_contratacion` date DEFAULT NULL,
    `fecha_culminacion` date DEFAULT NULL,
    `Salario` decimal(10,2) DEFAULT NULL,
    `Telefono` varchar(15) DEFAULT NULL,
    `Direccion` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`ID`),
    UNIQUE INDEX `user_UNIQUE` (`user` ASC)
VISIBLE);