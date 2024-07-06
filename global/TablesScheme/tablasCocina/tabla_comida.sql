
-- creando la tabla
CREATE TABLE comida (
	id INT AUTO_INCREMENT PRIMARY KEY, -- id unico de la comida
	nombre VARCHAR(255) NOT NULL, -- Nombre de la comida
    tipo_comida VARCHAR(255), -- Tipo de la comida, si es una entrada , postre , etc
	tipo_bebida VARCHAR(255), -- Tipo de bebida, si  es un vino blacno, un trago,etc
    instrumentos LONGTEXT , -- Representa un array de con los nombres de los intrumentos que usa la comida para prepararse, en este formato: "instrumento1,instrumento2,..."
    ingredientes LONGTEXT NOT NULL -- representa el diccionario de los ingredientes y cantidades que usa la comida para preparase, en este formato: "{ingrediente1:cantidad1;ingrediente2:cantidad2,...}", osea seria un string en formato json
);
