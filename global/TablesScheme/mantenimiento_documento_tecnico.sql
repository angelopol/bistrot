--
-- Base de datos: `restaurante`
--

-- --------------------------------------------------------

CREATE TABLE `mantenimiento_tipo` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mantenimiento_tipo`
--

INSERT INTO `mantenimiento_tipo` (`id`, `nombre`) VALUES
(1, 'Reparación'),
(2, 'Limpieza');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mantenimiento_tipo`
--
ALTER TABLE `mantenimiento_tipo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mantenimiento_tipo`
--
ALTER TABLE `mantenimiento_tipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;


--
-- Estructura de tabla para la tabla `mantenimiento_documento_tecnico`
--

CREATE TABLE `mantenimiento_documento_tecnico` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `tipo` int(11) NOT NULL,
  `objeto_inventario` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mantenimiento_documento_tecnico`
--

INSERT INTO `mantenimiento_documento_tecnico` (`id`, `nombre`, `fecha`, `tipo`, `objeto_inventario`, `descripcion`, `estatus`) VALUES
(1, 'Limpieza de la cafetera', '2024-07-02 01:21:31', 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ullamcorper neque nisi, eu hendrerit ligula viverra eget. Proin consequat ligula at justo interdum, et tincidunt metus ornare. Nulla fermentum eleifend dolor, quis tincidunt odio vehicula non. Morbi placerat convallis mi, at venenatis nunc maximus vel. Sed eros odio, consequat at auctor eget, pulvinar id dui. Etiam arcu velit, aliquam at nunc id, suscipit rhoncus purus. Nulla facilisi. Maecenas tincidunt semper aliquam. Mauris imperdiet tortor sed urna accumsan tempus. Duis iaculis, neque eget egestas venenatis, orci erat consequat felis, et laoreet ligula purus eget est. Etiam gravida eu turpis eget posuere. Vivamus pulvinar felis eros, in euismod felis auctor in.', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mantenimiento_documento_tecnico`
--
ALTER TABLE `mantenimiento_documento_tecnico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipo` (`tipo`),
  ADD KEY `id_objeto_inventario` (`objeto_inventario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mantenimiento_documento_tecnico`
--
ALTER TABLE `mantenimiento_documento_tecnico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mantenimiento_documento_tecnico`
--
ALTER TABLE `mantenimiento_documento_tecnico`
  ADD CONSTRAINT `id_objeto_inventario` FOREIGN KEY (`objeto_inventario`) REFERENCES `general` (`id_general`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_tipo` FOREIGN KEY (`tipo`) REFERENCES `mantenimiento_tipo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
