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
('Harina de trigo', 'Cocina', 50, 'Almacen 1', 'kg', '2024-12-31 00:00:00'),
('Azúcar', 'Cocina', 30, 'Almacen 1', 'kg', '2024-11-30 00:00:00'),
('Leche', 'Bar', 20, 'Refrigerador 2', 'litros', '2024-07-15 00:00:00'),
('Café', 'Bar', 10, 'Almacen 2', 'kg', '2024-10-20 00:00:00'),
('Huevos', 'Cocina', 200, 'Refrigerador 2', 'unidad', '2024-07-10 00:00:00'),
('Queso', 'Bar', 25, 'Refrigerador 2', 'kg', '2024-09-25 00:00:00'),
('Tomates', 'Cocina', 60, 'Refrigerador 2', 'kg', '2024-07-05 00:00:00'),
('Cerveza', 'Bar', 100, 'Refrigerador 2', 'botellas', '2024-12-31 00:00:00'),
('Aceite de oliva', 'Cocina', 15, 'Almacen 2', 'litros', '2024-11-15 00:00:00'),
('Sal', 'Cocina', 20, 'Almacen 1', 'kg', '2024-12-01 00:00:00'),
('Te', 'Bar', 25, 'Almacen 2', 'kg', '2024-12-15 00:00:00'),
('Jugo de naranja', 'Bar', 50, 'Refrigerador 2', 'litros', '2024-08-10 00:00:00'),
('Mantequilla', 'Cocina', 10, 'Refrigerador 2', 'kg', '2024-09-05 00:00:00'),
('Chocolate', 'Bar', 40, 'Almacen 2', 'kg', '2024-11-25 00:00:00'),
('Harina de maíz', 'Cocina', 35, 'Almacen 1', 'kg', '2024-10-15 00:00:00'),
('Vino tinto', 'Bar', 50, 'Almacen 2', 'botellas', '2024-12-31 00:00:00'),
('Pan', 'Cocina', 80, 'Almacen 1', 'unidad', '2024-07-20 00:00:00'),
('Lechuga', 'Cocina', 40, 'Refrigerador 2', 'kg', '2024-07-05 00:00:00'),
('Vodka', 'Bar', 30, 'Almacen 2', 'botellas', '2024-12-31 00:00:00'),
('Zanahorias', 'Cocina', 45, 'Refrigerador 2', 'kg', '2024-07-10 00:00:00');

INSERT INTO general (nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad) VALUES
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

-- Equipos: Instrumentos
('Cuchillos de chef', 'Equipo', 'Instrumentos', 1, NULL, 'Unidad', 5),
('Ollas grandes', 'Equipo', 'Instrumentos', 1, NULL, 'Unidad', 3),
('Cucharas de servicio', 'Equipo', 'Instrumentos', 0, NULL, 'Unidad', 150),
('Espátulas', 'Equipo', 'Instrumentos', 1, NULL, 'Unidad', 20),
('Cazos', 'Equipo', 'Instrumentos', 1, NULL, 'Unidad', 15),
('Tenedores de cocina', 'Equipo', 'Instrumentos', 1, NULL, 'Unidad', 25),
('Cortador de pizza', 'Equipo', 'Instrumentos', 1, NULL, 'Unidad', 10),
('Rallador de queso', 'Equipo', 'Instrumentos', 1, NULL, 'Unidad', 5),

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
