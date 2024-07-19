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
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  salary DECIMAL(10,2) NOT NULL,
  cargo VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  employee_code VARCHAR(10) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);