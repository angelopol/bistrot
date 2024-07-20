create table if not exists mantenimientos_realizar(
id_mantenimiento int not null,
descripcion_corta varchar(45) not null,
responsable varchar(45),
fecha_inicio datetime,
fecha_final datetime,
PRIMARY KEY(id_mantenimiento)
) ;

create table if not exists contactos(
id_contacto int not null,
nombre varchar(45) not null,
servicio varchar (45) not null, 
telefono varchar(45),
correo varchar (100),
Primary Key (id_contacto)
);