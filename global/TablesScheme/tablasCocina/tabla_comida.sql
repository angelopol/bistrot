
-- creando la tabla
CREATE TABLE comida (
	id INT AUTO_INCREMENT PRIMARY KEY, -- id unico de la comida
	nombre VARCHAR(255) NOT NULL, -- Nombre de la comida
    tipo_comida VARCHAR(255), -- Tipo de la comida, si es una entrada , postre , etc
	tipo_bebida VARCHAR(255) -- Tipo de , si  es un vino blacno, un trago,etc
);


CREATE TABLE ingrediente(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL  -- Este atributo representara el id del ingrediente en invetario
);

-- establecemos la relacion entre la comida y los ingredientes que usa
CREATE TABLE comida_ingredientes (
	comida_id INT AUTO_INCREMENT REFERENCES comidas(id),
    ingrediente_id INT REFERENCES ingredientes(id),
    PRIMARY KEY (comida_id , ingrediente_id)
);

CREATE TABLE instrumento(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL  -- Este atributo representara el id del instrumento en invetario
);

-- establecemos la relacion entre la comida y los ingredientes que usa
CREATE TABLE comida_instrumentos (
	comida_id INT AUTO_INCREMENT REFERENCES comidas(id),
    instrumento_id INT REFERENCES instrumentos(id),
    PRIMARY KEY (comida_id , instrumento_id)
);

-- diccionario que guarda los pares de los ingredientes y la cantidad de ese ingrediente que se necesita para hacer la comida
CREATE TABLE comida_diccionario (
    comida_id INT,
    clave VARCHAR(255),
    valor FLOAT,
    PRIMARY KEY (comida_id, clave),
    FOREIGN KEY (comida_id) REFERENCES comida(id)
);

