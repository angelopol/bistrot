-- EJECUTEN ESTO EN MYSQL PRIMERO 

-- Crear base de datos
CREATE DATABASE inventario;

-- Seleccionar base de datos
USE inventario;

-- Crear tablas
CREATE TABLE submodulo_inventario (
    id_submodulo_inventario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    descripcion TEXT
);

CREATE TABLE cocina_bar (
    id_cocina_bar INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    cantidad DOUBLE NOT NULL,
    area VARCHAR(255) NOT NULL,
    unidad VARCHAR(255) NOT NULL,
    fecha_caducidad DATETIME
);

CREATE TABLE general (
    id_general INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    funciona_estado BOOLEAN NOT NULL,
    fecha_mantenimiento DATETIME NULL DEFAULT NULL,
    unidad VARCHAR(255),
    cantidad INT
);

-- Insertar datos en la tabla cocina_bar
INSERT INTO cocina_bar (nombre, categoria, cantidad, area, unidad, fecha_caducidad) VALUES
('Queso', 'Cocina', 50, 'Refrigerador 1', 'kg', '2024-12-31 00:00:00'),
('Tomate', 'Cocina', 30, 'Refrigerador 1', 'kg', '2024-11-30 00:00:00'),
('Zanahoria', 'Cocina', 20, 'Refrigerador 2', 'kg', '2024-07-15 00:00:00'),
('Cebolla', 'Cocina', 10, 'Refrigerador 2', 'kg', '2024-10-20 00:00:00'),
('Papa', 'Cocina', 200, 'Refrigerador 2', 'Kg', '2024-07-10 00:00:00'),
('Apio', 'Cocina', 25, 'Refrigerador 2', 'kg', '2024-09-25 00:00:00'),
('Pollo', 'Cocina', 60, 'Refrigerador 2', 'kg', '2024-07-05 00:00:00'),
('Ajo', 'Cocina', 100, 'Refrigerador 2', 'Kg', '2024-12-31 00:00:00'),
('Champiñones', 'Cocina', 15, 'Refrigerador 2', 'Kg', '2024-11-15 00:00:00'),
('Espelta', 'Cocina', 20, 'Almacen 1', 'kg', '2024-12-01 00:00:00'),
('Vinagre', 'Cocina', 25, 'Almacen 2', 'Litros', '2024-12-15 00:00:00'),
('Pasta', 'Cocina', 50, 'Almacen 2', 'Kg', '2024-08-10 00:00:00'),
('Berenjena', 'Cocina', 10, 'Refrigerador 2', 'kg', '2024-09-05 00:00:00'),
('Aceite', 'Cocina', 40, 'Almacen 2', 'Litro', '2024-11-25 00:00:00'),
('Bacalao', 'Cocina', 35, 'Refrigerador 1', 'kg', '2024-10-15 00:00:00'),
('Harina', 'Cocina', 50, 'Almacen 2', 'Kg', '2024-12-31 00:00:00'),
('Leche', 'Cocina', 80, 'Refrigerador 1', 'Litro', '2024-07-20 00:00:00'),
('Azucar', 'Cocina', 40, 'Almacen 2', 'kg', '2024-07-05 00:00:00'),
('Chocolate', 'Cocina', 30, 'Almacen 2', 'Kg', '2024-12-31 00:00:00'),
('Fresa', 'Cocina', 45, 'Refrigerador 2', 'kg', '2024-07-10 00:00:00');
('Patilla', 'Cocina', 50, 'Refrigerador 1', 'kg', '2024-12-31 00:00:00'),
('Manzana', 'Cocina', 30, 'Refrigerador 1', 'kg', '2024-11-30 00:00:00'),
('Banana', 'Cocina', 20, 'Refrigerador 2', 'kg', '2024-07-15 00:00:00'),
('Huevo', 'Cocina', 10, 'Almacen 2', 'kg', '2024-10-20 00:00:00'),
('Ron', 'Bar', 200, 'Almacen 2', 'Litros', '2024-07-10 00:00:00'),
('Limon', 'Bar', 25, 'Refrigerador 2', 'kg', '2024-09-25 00:00:00'),
('Whisky', 'Bar', 60, 'Almacen 2', 'Litros', '2024-07-05 00:00:00'),
('Tequila', 'Bar', 100, 'Almacen 2', 'Litros', '2024-12-31 00:00:00'),
('Cuvee Bistrot Chez Remy', 'Bar', 15, 'Refrigerador 2', 'Unidad', '2024-11-15 00:00:00'),
('Agneau Rouge', 'Bar', 20, 'Refrigerador 1', 'Unidad', '2024-12-01 00:00:00'),
('Sancerre aoc', 'Bar', 25, 'Refrigerador 2', 'Unidad', '2024-12-15 00:00:00'),
('Languedoc', 'Bar', 50, 'Refrigerador 2', 'Unidad', '2024-08-10 00:00:00'),
('Coca-Cola', 'Bar', 10, 'Refrigerador 2', 'Unidad', '2024-09-05 00:00:00'),
('Fanta Orange', 'Bar', 40, 'Refrigerador 2', 'Unidad', '2024-11-25 00:00:00'),
('Sprite', 'Bar', 35, 'Refrigerador 1', 'Unidad', '2024-10-15 00:00:00'),
('Vittel', 'Bar', 50, 'Refrigerador 2', 'Unidad', '2024-12-31 00:00:00'),
('Lechuga', 'Cocina', 80, 'Refrigerador 1', 'Kg', '2024-07-20 00:00:00'),
('Pepino', 'Cocina', 40, 'Refrigerador 2', 'kg', '2024-07-05 00:00:00'),
('Aji', 'Cocina', 30, 'Refrigerador 2', 'Kg', '2024-12-31 00:00:00'),
('Pimenton', 'Cocina', 45, 'Refrigerador 2', 'kg', '2024-07-10 00:00:00');
('Cebollin', 'Cocina', 45, 'Refrigerador 2', 'kg', '2024-07-10 00:00:00');


INSERT INTO general (nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad) VALUES

-- Equipos: Instrumentos
('Cocina A', 'EquipoCocina', 'Hornos', 1, NULL, 'Unidad', 3),
('Cocina B', 'EquipoCocina', 'Hornos', 1, NULL, 'Unidad', 3),
('Cocina C', 'EquipoCocina', 'Hornos', 0, NULL, 'Unidad', 150),
('Cocina D', 'EquipoCocina', 'Hornos', 1, NULL, 'Unidad', 2),
('Horno A', 'EquipoCocina', 'Hornos', 1, NULL, 'Unidad', 3),
('Horno B ', 'EquipoCocina', 'Hornos', 1, NULL, 'Unidad', 4),
('Horno C', 'EquipoCocina', 'Hornos', 1, NULL, 'Unidad', 3),
('Horno D', 'EquipoCocina', 'Hornos', 1, NULL, 'Unidad', 2),
('Sarten A', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 15),
('Sarten B', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 15),
('Sarten C', 'EquipoCocina', 'Instrumento', 0, NULL, 'Unidad', 15),
('Colador A', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 20),
('Colador B', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 20),
('Olla A ', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 4),
('Olla B', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 10),
('Olla c', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 5),
('Nevera A', 'EquipoCocina', 'Electrodomestico', 1, NULL, 'Unidad', 5),
('Nevera B', 'EquipoCocina', 'Electrodomestico', 1, NULL, 'Unidad', 5),
('Coctelera A', 'EquipoCocina', 'Instrumento', 0, NULL, 'Unidad', 10),
('Coctelera B', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 10),
('Coctelera C', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 10),
('Coctelera D ', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 10),
('Batidora A', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 15),
('Batidora B', 'EquipoCocina', 'Instrumento', 1, NULL, 'Unidad', 15),
-- Equipos: Electrodomésticos
('Cafetera industrial', 'Equipo', 'Electrodomésticos', 1, '2023-01-01 00:00:00', 'Unidad', 1),
('Licuadora profesional', 'Equipo', 'Electrodomésticos', 1, '2023-02-15 00:00:00', 'Unidad', 2),
('Freidora eléctrica', 'Equipo', 'Electrodomésticos', 1, '2023-03-20 00:00:00', 'Unidad', 1),
('Máquina de hielo', 'Equipo', 'Electrodomésticos', 1, '2023-04-10 00:00:00', 'Unidad', 1),
('Tostadora', 'Equipo', 'Electrodomésticos', 1, '2023-06-01 00:00:00', 'Unidad', 2),
('Batidora de mano', 'Equipo', 'Electrodomésticos', 1, '2023-08-30 00:00:00', 'Unidad', 3),
('Microondas', 'Equipo', 'Electrodomésticos', 1, '2023-09-25 00:00:00', 'Unidad', 1),
('Máquina para hacer pasta', 'Equipo', 'Electrodomésticos', 1, NULL, 'Unidad', 1),
('Cortadora de vegetales', 'Equipo', 'Electrodomésticos', 1, NULL, 'Unidad', 1),

-- Equipos: Vajilla
('Platos de cerámica', 'Equipo', 'Vajilla', 0, NULL, 'Unidad', 100),
('Vasos de cristal', 'Equipo', 'Vajilla', 0, NULL, 'Unidad', 50),
('Tazas de café', 'Equipo', 'Vajilla', 1, NULL, 'Unidad', 30),
('Platos hondos', 'Equipo', 'Vajilla', 1, NULL, 'Unidad', 40),
('Platos llanos', 'Equipo', 'Vajilla', 1, NULL, 'Unidad', 40),
('Tazones', 'Equipo', 'Vajilla', 1, NULL, 'Unidad', 25),
('Copas de vino', 'Equipo', 'Vajilla', 1, NULL, 'Unidad', 20),
('Cucharas de postre', 'Equipo', 'Vajilla', 1, NULL, 'Unidad', 50),

-- Maquinaria: Hornos
('Horno industrial', 'Maquinaria', 'Hornos', 1, '2023-05-15 00:00:00', 'Unidad', 1),
('Horno de leña', 'Maquinaria', 'Hornos', 1, NULL, 'Unidad', 1),
('Horno de pizza', 'Maquinaria', 'Hornos', 1, NULL, 'Unidad', 1),
('Horno de convección', 'Maquinaria', 'Hornos', 1, NULL, 'Unidad', 1),
('Refrigerador comercial', 'Maquinaria', 'Refrigeración', 1, NULL, 'Unidad', 1),
('Lavavajillas industrial', 'Maquinaria', 'Lavado', 1, NULL, 'Unidad', 1),
('Molino de carne', 'Maquinaria', 'Procesamiento de alimentos', 1, NULL, 'Unidad', 1),
('Deshidratador de alimentos', 'Maquinaria', 'Procesamiento de alimentos', 1, NULL, 'Unidad', 1),
('Plancha para cocina', 'Maquinaria', 'Procesamiento de alimentos', 1, NULL, 'Unidad', 1),
('Mesa de comedor', 'Mueble', 'Muebles de comedor', 0, NULL, 'Unidad', 10),
('Sillas de restaurante', 'Mueble', 'Muebles de comedor', 0, NULL, 'Unidad', 40),
('Mesas altas', 'Mueble', 'Muebles de comedor', 0, NULL, 'Unidad', 10),
('Mesas de trabajo', 'Mueble', 'Muebles de cocina', 0, NULL, 'Unidad', 5),
('Lámparas de techo', 'Mueble', 'Decoración', 1, NULL, 'Unidad', 20);
