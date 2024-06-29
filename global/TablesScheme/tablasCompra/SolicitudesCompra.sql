--Tabla de las solicitudes de las compras

CREATE TABLE 'bistrot'.'Solicitudes'(
    'Departamento' VARCHAR(200) NOT NULL, --Departamento
    'ID_Empleado' INT NOT NULL AUTO_INCREMENT, -- ID de los empleados
    'Codigo_Producto' VARCHAR(200) NOT NULL, -- Codigo de los productos
    'ID_requisión' INT NOT NULL AUTO_INCREMENT, -- Identificación de la requesición
    'FECHA' DATETIME NOT NULL, -- Fecha en la que se hizo la solicitud
    'DETALLE' VARCHAR(200) NOT NULL, -- Justificación
    PRIMARY KEY('ID_Empleado'),
    UNIQUE('Departamento','Codigo_Producto','ID_requisión',
    'FECHA','DETALLE')
);