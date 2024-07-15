use modulo_reserva;

CREATE TABLE `mesas` (
  `ID_mesa` int NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `numero_sillas` varchar(45) NOT NULL,
  `ubicacion` varchar(1) NOT NULL,
  PRIMARY KEY (`ID_mesa`)
) 

CREATE TABLE `reserva` (
  `numero_reserva` int NOT NULL,
  `ID_mesa` int NOT NULL,
  `confirmado` tinyint DEFAULT NULL,
  `cantidad_personas` int NOT NULL,
  `ID_cliente` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `descripcion` text NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`numero_reserva`),
  UNIQUE KEY `ID_cliente_UNIQUE` (`ID_cliente`)
)