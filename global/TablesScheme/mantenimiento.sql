create table if not exists mantenimientos_realizar(
id_mantenimiento int not null,
descripcion_corta varchar(45) not null,
responsable varchar(45),
fecha_inicio datetime,
fecha_final datetime,
PRIMARY KEY(id_mantenimiento)
) ;

create table if not exists reporte(
id_reporte int not null,
asunto varchar(100) not null,
descripcion varchar (700) not null, 
origen varchar(45),
destino varchar (45),
Primary Key (id_contacto)
);