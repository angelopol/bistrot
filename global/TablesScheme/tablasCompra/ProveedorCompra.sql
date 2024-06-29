--Tabla de los provvedores de las compras del restaurante

CREATE TABLE 'bistrot'.'Proveedores'(
    'Nombre_empresa' VARCHAR(200) NOT NULL, --Nombre de la empresa
    'RIF' VARCHAR(200) NOT NULL, -- RIF
    'Dire_Fiscal' VARCHAR(200) NOT NULL, -- Dirección Fiscal
    'Correo' VARCHAR(200) NOT NULL, -- Correo del Proveedor
    'Nombre_resposa' VARCHAR(200) NOT NULL, -- Persona con la que se negocia
    'Tlf' VARCHAR(200) NOT NULL, -- Numero de telefono del proveedor
    PRIMARY KEY('Nombre_empresa'),
    UNIQUE('Nombre_empresa','Dire_fiscaL','Correo',
    'Nombre_resposa','Tlf')
);