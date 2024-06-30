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
    cantidad INT NOT NULL,
    area VARCHAR(255) NOT NULL,
    unidad VARCHAR(255) NOT NULL,
    fecha_caducidad DATETIME
);

CREATE TABLE general (
    id_general INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
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

-- Insertar datos en la tabla general
INSERT INTO general (nombre, tipo, funciona_estado, fecha_mantenimiento, unidad, cantidad) VALUES
('Cafetera industrial', 'Equipo', 1, '2023-01-01 00:00:00', 'Unidad', 1),
('Mesa de comedor', 'Mueble', 0, NULL, 'Unidad', 10),
('Licuadora profesional', 'Equipo', 1, '2023-02-15 00:00:00', 'Unidad', 2),
('Sillas de restaurante', 'Mueble', 0, NULL, 'Unidad', 40),
('Freidora eléctrica', 'Equipo', 1, '2023-03-20 00:00:00', 'Unidad', 1),
('Máquina de hielo', 'Equipo', 1, '2023-04-10 00:00:00', 'Unidad', 1),
('Cuchillos de chef', 'Equipo', 1, NULL, 'Unidad', 5),
('Vasos de cristal', 'Equipo', 0, NULL, 'Unidad', 50),
('Ollas grandes', 'Equipo', 1, NULL, 'Unidad', 3),
('Horno industrial', 'Maquinaria', 1, '2023-05-15 00:00:00', 'Unidad', 1),
('Mesas de trabajo', 'Mueble', 0, NULL, 'Unidad', 5),
('Tostadora', 'Equipo', 1, '2023-06-01 00:00:00', 'Unidad', 2),
('Platos de cerámica', 'Equipo', 0, NULL, 'Unidad', 100),
('Nevera', 'Maquinaria', 1, '2023-07-20 00:00:00', 'Unidad', 1),
('Batidora de mano', 'Equipo', 1, '2023-08-30 00:00:00', 'Unidad', 3),
('Mesas altas', 'Mueble', 0, NULL, 'Unidad', 10),
('Lámparas de techo', 'Mueble', 1, NULL, 'Unidad', 20),
('Microondas', 'Maquinaria', 1, '2023-09-25 00:00:00', 'Unidad', 1),
('Cucharas de servicio', 'Equipo', 0, NULL, 'Unidad', 150),
('Máquina para hacer pasta', 'Maquinaria', 1, NULL, 'Unidad', 1),
('Molino de carne', 'Maquinaria', 1, NULL, 'Unidad', 1),
('Cortadora de vegetales', 'Maquinaria', 1, NULL, 'Unidad', 1),
('Espátulas', 'Equipo', 1, NULL, 'Unidad', 20),
('Cazos', 'Equipo', 1, NULL, 'Unidad', 15),
('Tenedores de cocina', 'Equipo', 1, NULL, 'Unidad', 25),
('Lavavajillas industrial', 'Maquinaria', 1, NULL, 'Unidad', 1),
('Refrigerador comercial', 'Maquinaria', 1, NULL, 'Unidad', 1),
('Plancha para cocina', 'Maquinaria', 1, NULL, 'Unidad', 1),
('Horno de convección', 'Maquinaria', 1, NULL, 'Unidad', 1);
