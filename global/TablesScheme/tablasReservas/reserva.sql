CREATE TABLE `reserva` (
  `numero_reserva` int NOT NULL,
  `ID_mesa` int DEFAULT NULL,
  `Confirmado` tinyint DEFAULT NULL,
  `cantidad_personas` int DEFAULT NULL,
  `ID_cliente` int DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `tipo_de_evento` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`numero_reserva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci