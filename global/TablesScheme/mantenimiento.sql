CREATE TABLE if NOT EXISTS mantenimientos_realizar(
    'id_mantenimiento' INT NOT NULL,
    'descripcion_corta' VARCHAR(200) NOT NULL,
    'responsable' VARCHAR(200),
    'fecha_inicio' DATETIME,
    'fecha_final' DATETIME,
    PRIMARY KEY('id_mantenimiento')
);

CREATE TABLE if NOT EXISTS reporte(
    'id_reporte' INT NOT NULL,
    'asunto' VARCHAR(200) NOT NULL,
    'descripcion' VARCHAR(700) NOT NULL, 
    'origen' VARCHAR(200),
    'destino' VARCHAR (200),
    'fecha' TIMESTAMP,
    Primary Key ('id_reporte')
);