CREATE DATABASE bistrot;

USE bistrot;


CREATE TABLE `reserva_cliente` (
  `numero_reserva` int NOT NULL AUTO_INCREMENT,
  `Confirmado` boolean NOT NULL,
  `cantidad_personas` int NOT NULL,
  `ID_cliente` BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `tipo_de_evento` TEXT NOT NULL,
  PRIMARY KEY (`numero_reserva`)
) 

SELECT * FROM bistrot.reserva_cliente;

CREATE TABLE `inventario_mesas` (
  `ID_mesa` BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  `descripcion` TEXT NOT NULL,
  `numero_sillas` int NOT NULL,
  `ubicacion` char(1) NOT NULL,
  `status` char(1) NOT NULL,
  `confirmado` boolean NOT NULL,
  PRIMARY KEY (`ID_mesa`)
)

SELECT * FROM bistrot.inventario_mesas;

CREATE TABLE `lista_espera` (
  `Cedula` int NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Cantidad_personas` int NOT NULL COMMENT 'tabla de cantidad de personas',
  PRIMARY KEY (`Cedula`)
  NIQUE KEY `Cedula_UNIQUE` (`Cedula`)
) 
SELECT * FROM bistrot.lista_espera;

CREATE TABLE `reserva_mesa` (
  `numero_reserva` int NOT NULL,
  `id_mesa` BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  
)
SELECT * FROM bistrot.reserva_mesa;