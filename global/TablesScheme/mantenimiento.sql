CREATE TABLE `bistrot`.`Documento Tecnico` (
    `Nombre` VARCHAR(30),
    `Fecha` DATETIME NOT NULL,
    `ID tipo` INT NOT NULL,
    `ID inventario`,
    `Descripcion` VARCHAR,
    `Estatus` BOOLEAN NOT NULL,

    FOREIGN KEY (`ID tipo`)
);

CREATE TABLE `bistrot`.`ID tipo` (
    `Id` INT NOT NULL,
    `Nombre` VARCHAR(30),
    `Descripcion` VARCHAR
);
