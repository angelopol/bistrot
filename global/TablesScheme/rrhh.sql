CREATE TABLE IF NOT EXISTS `bistrot`.`ausencias` (
  `ID` int(11) NOT NULL,
  `ID_Empleado` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Motivo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Empleado` (`ID_Empleado`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `bistrot`.`empleados` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Puesto` varchar(50) DEFAULT NULL,
  `Fecha_Contratacion` date DEFAULT NULL,
  `Salario` decimal(10,2) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `bistrot`.`horarios` (
  `ID` int(11) NOT NULL,
  `ID_Empleado` int(11) DEFAULT NULL,
  `Dia_Semana` varchar(20) DEFAULT NULL,
  `Hora_Entrada` time DEFAULT NULL,
  `Hora_Salida` time DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Empleado` (`ID_Empleado`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;