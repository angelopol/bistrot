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

CREATE TABLE registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_registro DATETIME NOT NULL,
    modulo VARCHAR(255) NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    producto VARCHAR(255) NOT NULL,
    tipo_ajuste VARCHAR(255) NOT NULL,
    cantidad FLOAT NOT NULL,
    observaciones TEXT
);


-- Datos proporcionados por cocina, deben ser estos ID, tanto para cocina bar como general
INSERT INTO cocina_bar (nombre, categoria, cantidad, area, unidad, fecha_caducidad) VALUES
('queso', 'cocina', 50, 'Refrigerador 1', 'kg', '2024-12-31 00:00:00'),
('tomate', 'cocina', 30, 'Refrigerador 1', 'kg', '2024-11-30 00:00:00'),
('zanahoria', 'cocina', 20, 'Refrigerador 2', 'kg', '2024-07-15 00:00:00'),
('cebolla', 'cocina', 10, 'Refrigerador 2', 'kg', '2024-10-20 00:00:00'),
('papa', 'cocina', 200, 'Refrigerador 2', 'kg', '2024-07-10 00:00:00'),
('apio', 'cocina', 25, 'Refrigerador 2', 'kg', '2024-09-25 00:00:00'),
('pollo', 'cocina', 40, 'Refrigerador 2', 'kg', '2024-08-15 00:00:00'),
('ajo', 'cocina', 5, 'Refrigerador 2', 'kg', '2024-07-25 00:00:00'),
('champiñones', 'cocina', 15, 'Refrigerador 2', 'kg', '2024-10-05 00:00:00'),
('espelta', 'cocina', 10, 'Refrigerador 2', 'kg', '2024-12-01 00:00:00'),
('vinagre', 'cocina', 20, 'Almacen 1', 'litro', '2025-01-01 00:00:00'),
('pasta', 'cocina', 25, 'Almacen 1', 'kg', '2024-11-01 00:00:00'),
('berenjena', 'cocina', 15, 'Refrigerador 2', 'kg', '2024-08-10 00:00:00'),
('aceite', 'cocina', 30, 'Almacen 1', 'litro', '2025-02-01 00:00:00'),
('bacalao', 'cocina', 40, 'Refrigerador 2', 'kg', '2024-09-10 00:00:00'),
('harina', 'cocina', 50, 'Almacen 1', 'kg', '2024-12-31 00:00:00'),
('leche', 'cocina', 30, 'Refrigerador 1', 'litro', '2024-08-20 00:00:00'),
('azucar', 'cocina', 25, 'Almacen 1', 'kg', '2025-03-01 00:00:00'),
('chocolate', 'cocina', 20, 'Almacen 1', 'kg', '2024-12-15 00:00:00'),
('fresa', 'cocina', 15, 'Refrigerador 2', 'kg', '2024-07-30 00:00:00'),
('patilla', 'cocina', 10, 'Refrigerador 2', 'kg', '2024-07-20 00:00:00'),
('manzana', 'cocina', 25, 'Refrigerador 2', 'kg', '2024-09-05 00:00:00'),
('banana', 'cocina', 30, 'Refrigerador 2', 'kg', '2024-08-25 00:00:00'),
('huevo', 'cocina', 200, 'Refrigerador 2', 'unidad', '2024-08-10 00:00:00'),
('ron', 'bar', 50, 'Almacen 2', 'litro', '2025-05-01 00:00:00'),
('limon', 'bar', 35, 'Refrigerador 2', 'kg', '2024-08-15 00:00:00'),
('whisky', 'bar', 40, 'Almacen 2', 'litro', '2025-06-01 00:00:00'),
('tequila', 'bar', 30, 'Almacen 2', 'litro', '2025-04-01 00:00:00'),
('cuvee bistrot chez remy', 'bar', 20, 'Almacen 2', 'unidad', '2025-01-01 00:00:00'),
('agneau rouge', 'bar', 15, 'Almacen 2', 'unidad', '2025-02-01 00:00:00'),
('sancerre aoc', 'bar', 10, 'Almacen 2', 'unidad', '2025-03-01 00:00:00'),
('languedoc', 'bar', 25, 'Almacen 2', 'unidad', '2025-05-01 00:00:00'),
('coca-cola original', 'bar', 50, 'Almacen 2', 'unidad', '2025-04-01 00:00:00'),
('coca-cola cherry', 'bar', 30, 'Almacen 2', 'unidad', '2025-05-01 00:00:00'),
('fanta orange', 'bar', 40, 'Almacen 2', 'unidad', '2025-06-01 00:00:00'),
('sprite', 'bar', 35, 'Almacen 2', 'unidad', '2025-07-01 00:00:00'),
('vittel', 'bar', 25, 'Almacen 2', 'unidad', '2025-01-01 00:00:00'),
('lechuga', 'cocina', 50, 'Refrigerador 2', 'kg', '2024-08-10 00:00:00'),
('pepino', 'cocina', 40, 'Refrigerador 2', 'kg', '2024-07-25 00:00:00'),
('aji', 'cocina', 30, 'Refrigerador 2', 'kg', '2024-09-05 00:00:00'),
('pimenton', 'cocina', 20, 'Refrigerador 2', 'kg', '2024-07-20 00:00:00'),
('cebollin', 'cocina', 25, 'Refrigerador 2', 'kg', '2024-08-05 00:00:00');


INSERT INTO general (nombre, tipo, categoria, funciona_estado, fecha_mantenimiento, unidad, cantidad) VALUES
-- Equipos: Hornos
('Cocina A', 'Equipo', 'Hornos', 1, NULL, 'Unidad', 3),
('Cocina B', 'Equipo', 'Hornos', 1, NULL, 'Unidad', 3),
('Cocina C', 'Equipo', 'Hornos', 1, NULL, 'Unidad', 3),
('Cocina D', 'Equipo', 'Hornos', 1, NULL, 'Unidad', 3),
('Horno A', 'Equipo', 'Hornos', 1, NULL, 'Unidad', 3),
('Horno B', 'Equipo', 'Hornos', 1, NULL, 'Unidad', 3),
('Horno C', 'Equipo', 'Hornos', 1, NULL, 'Unidad', 3),
('Horno D', 'Equipo', 'Hornos', 1, NULL, 'Unidad', 3),
-- Equipos: Instrumentos
('Sarten A', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Sarten B', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Sarten C', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Colador A', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Colador B', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Olla A', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Olla B', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Olla C', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Nevera A', 'Equipo', 'Electrodomestico', 1, NULL, 'Unidad', 2),
('Nevera B', 'Equipo', 'Electrodomestico', 1, NULL, 'Unidad', 2),
('Coctelera A', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Coctelera B', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Coctelera C', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Coctelera D', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Batidora A', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5),
('Batidora B', 'Equipo', 'Instrumento', 1, NULL, 'Unidad', 5);

-- Desde aqui son inventados
-- Maquinaria
('Amasadora A', 'Maquinaria', 'Panaderia', 1, NULL, 'Unidad', 2),
('Amasadora B', 'Maquinaria', 'Panaderia', 1, NULL, 'Unidad', 2),
('Cortadora A', 'Maquinaria', 'Carniceria', 1, NULL, 'Unidad', 2),
('Cortadora B', 'Maquinaria', 'Carniceria', 1, NULL, 'Unidad', 2),
('Rebanadora A', 'Maquinaria', 'Embutidos', 1, NULL, 'Unidad', 2),
('Rebanadora B', 'Maquinaria', 'Embutidos', 1, NULL, 'Unidad', 2),
('Trituradora A', 'Maquinaria', 'Vegetales', 1, NULL, 'Unidad', 2),
('Trituradora B', 'Maquinaria', 'Vegetales', 1, NULL, 'Unidad', 2),
-- Muebles
('Mesa A', 'Mueble', 'Comedor', 1, NULL, 'Unidad', 10),
('Mesa B', 'Mueble', 'Comedor', 1, NULL, 'Unidad', 10),
('Silla A', 'Mueble', 'Comedor', 1, NULL, 'Unidad', 50),
('Silla B', 'Mueble', 'Comedor', 1, NULL, 'Unidad', 50),
('Estante A', 'Mueble', 'Almacen', 1, NULL, 'Unidad', 5),
('Estante B', 'Mueble', 'Almacen', 1, NULL, 'Unidad', 5),
('Vitrina A', 'Mueble', 'Exhibicion', 1, NULL, 'Unidad', 2),
('Vitrina B', 'Mueble', 'Exhibicion', 1, NULL, 'Unidad', 2);