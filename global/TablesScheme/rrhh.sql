--
-- Base de datos: `rrhh`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ausencias`
--

DROP TABLE IF EXISTS `ausencias`;
CREATE TABLE IF NOT EXISTS `ausencias` (
  `ID` int(11) NOT NULL,
  `ID_Empleado` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Motivo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Empleado` (`ID_Empleado`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

DROP TABLE IF EXISTS `horarios`;
CREATE TABLE IF NOT EXISTS `horarios` (
  `ID` int(11) NOT NULL,
  `ID_Empleado` int(11) DEFAULT NULL,
  `Dia_Semana` varchar(20) DEFAULT NULL,
  `Hora_Entrada` time DEFAULT NULL,
  `Hora_Salida` time DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Empleado` (`ID_Empleado`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE IF NOT EXISTS empleados (
    ID int(11) NOT NULL AUTO_INCREMENT,
    user VARCHAR(500) NOT NULL,
    password VARCHAR(500) NOT NULL,
    Nombre varchar(50) DEFAULT NULL,
    cedula varchar(50) DEFAULT NULL,
    Apellido varchar(50) DEFAULT NULL,
    Puesto varchar(50) DEFAULT NULL,
    fecha_contratacion date DEFAULT NULL,
    fecha_culminacion date DEFAULT NULL,
    Salario decimal(10,2) DEFAULT NULL,
    Telefono varchar(15) DEFAULT NULL,
    Direccion varchar(100) DEFAULT NULL,
    experiencia_laboral varchar(100) DEFAULT NULL,
    PRIMARY KEY (ID),
    UNIQUE INDEX user_UNIQUE (user)
);
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla solicitudes
--

DROP TABLE IF EXISTS rrhh_solicitudes;
CREATE TABLE IF NOT EXISTS rrhh_solicitudes (
  ID int(11) NOT NULL AUTO_INCREMENT,
  ID_Empleado int(11) DEFAULT NULL,
  Fecha_Registro date DEFAULT NULL,
  Fecha date DEFAULT NULL,
  motivo varchar(100) DEFAULT NULL,
  Cargo varchar(100) DEFAULT NULL,
  Modulo varchar(100) NOT NULL,
  Estado int(2) default 0,
  PRIMARY KEY (ID),
  KEY ID_Empleado (ID_Empleado)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla entradas
--

DROP TABLE IF EXISTS entradas;
CREATE TABLE IF NOT EXISTS entradas (
  id int NOT NULL AUTO_INCREMENT,
  cedula varchar(20) NOT NULL,
  hora_entrada timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY cedula (cedula)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
