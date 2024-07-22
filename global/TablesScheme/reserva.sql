CREATE TABLE `mesas` (
  `ID_mesa` int NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `numero_sillas` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID_mesa`)
);

CREATE TABLE `reserva` (
  `numero_reserva` int NOT NULL AUTO_INCREMENT,
  `ID_mesa` int NOT NULL DEFAULT '0',
  `confirmado` tinyint DEFAULT NULL,
  `cantidad_personas` int NOT NULL,
  `ID_cliente` int NOT NULL ,
  `fecha` datetime NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `descripcion` text NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `ubicacion` varchar(500) NOT NULL,
  PRIMARY KEY (`numero_reserva`)
) 