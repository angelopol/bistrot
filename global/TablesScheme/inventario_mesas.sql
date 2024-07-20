CREATE TABLE `inventario_mesas` (
  `ID_mesa` int NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `numero_sillas` int DEFAULT NULL,
  `ubicacion` char(1) DEFAULT NULL,
  PRIMARY KEY (`ID_mesa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci