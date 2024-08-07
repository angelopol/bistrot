-- creando la tabla
CREATE TABLE comida (
	id INT AUTO_INCREMENT PRIMARY KEY, -- id unico de la comida
	nombre VARCHAR(255) NOT NULL, -- Nombre de la comida
    tipo_comida VARCHAR(255), -- Tipo de la comida, si es una entrada , postre , etc
	tipo_bebida VARCHAR(255), -- Tipo de bebida, si  es un vino blacno, un trago,etc
    instrumentos LONGTEXT , -- Representa un array los id's (de la tabla general de inventario) de los intrumentos que usa la comida para prepararse, en este formato: 'idInstrumento1,idInstrumento2,...'
    ingredientes LONGTEXT NOT NULL, -- representa el diccionario de los id's de los ingredientes y cantidades de cada ingrediente que usa la comida para preparase, en este formato: '{idIngrediente1:cantidad1;idIngrediente2:cantidad2,...}', osea seria un string en formato json, los id de los ingredientes tienen que ir entre comillas dobles y las cantidades sin comillas
    seleccionada BOOLEAN NOT NULL -- indica si el elemento esta seleccionado para el menu del dia
);

INSERT INTO comida (nombre , tipo_comida , tipo_bebida , instrumentos , ingredientes, seleccionada) VALUES
('Seasonal Soup with The Laughing Cow and Mixed Herbs' ,'entrada' , null , '1,9,12' , '{"1":0.25,"2":0.5,"3":0.5,"4":0.25}',0),
('Courgette Soup with The Laughing Cow' , 'entrada' , null , '2,14' , '{"5":0.75,"6":0.3,"1":0.4}',0),
('Chicken Rillettes with Toast' , 'entrada' , null , '3,5' , '{"5":1.0,"7":1.0,"8":0.10,"4":0.6,"3":0.25}',0),
('Spelt and Mushroom Salad' , 'entrada' , null , '4,10,15' , '{"9":0.5,"10":0.25,"11":0.20}',0),
('Linguine Pasta with Tomato Sauce and Ratatouille' , 'principal' , null , '1,11' , '{"12":0.5,"2":0.75,"4":0.30,"13":0.30}',0),
('Sauted Chicken and Potatoes' , 'principal' , null , '2,9,6' , '{"5":0.5,"14":0.30,"7":0.5,"4":0.20}',0),
('Roast cod with tomato sauce' , 'principal' , null , '3,7,13' , '{"5":0.5,"2":0.5,"14":0.25,"15":0.5}',0),
('Roasted Chicken with Herbs' , 'principal' , null , '4,8,16' , '{"7":1.0,"4":0.25,"8":0.25,"13":0.5,"3":0.3}',0),
('Chocolate Mousse' , 'postre' , null , '5,23' , '{"16":1.0,"17":0.5,"18":1.0,"19":0.5}',0),
('Fruit Salad' , 'postre' , null , '17' , '{"20":0.5,"21":0.5,"22":0.5,"23":0.5}',0),
('Apple Tart' , 'postre' , null , '6,24' , '{"16":1.0,"17":0.5,"18":1.0,"22":0.5,"24":3}',0),
('Chocolate Cake' , 'postre' , null , '8,24' , '{"16":1.0,"17":0.5,"18":1.0,"19":0.5,"24":3}',0),
('Mojito' , null , "trago" , '19' , '{"25":0.25,"26":0.25,"18":0.10}',0),
('Daiquiri' , null , "trago" , '20' , '{"25":0.20,"26":0.3,"18":0.10}',0),
('Old Fashioned' , null , "trago" , '21' , '{"27":0.25,"26":0.2,"18":0.05}',0),
('Margarita' , null , "trago" , '22' , '{"28":0.25,"26":0.2,"18":0.05}',0),
('Cuvée Bistrot Chez Rémy' , null , "vino rojo" , "19" , '{"29":1.0}',0),
('Agneau Rouge' , null , "vino rojo" , "20" , '{"30":1.0}',0),
('Sancerre AOC' , null , "vino blanco" , "21" , '{"31":1.0}',0),
('Languedoc' , null , "vino blanco" , "22" , '{"32":1.0}',0),
('Coca-Cola Original' , null , "bebida" , "19" , '{"33":1.0}',0),
('Coca-Cola Cherry' , null , "bebida" , "20" , '{"34":1.0}',0),
('Fanta Orange' , null , "bebida" , "21" , '{"35":1.0}',0),
('Sprite' , null , "bebida" , "22" , '{"36":1.0}',0),
('Vittel' , null , "bebida" , "19" , '{"37":1.0}',0),
('Vegetable Stew with Herby' , "vegetariano" , null , '1,9' , '{"38":0.5,"2":0.25,"4":0.25,"14":0.25,"39":0.25}',0),
('Vegetable Vinaigrette' , "vegetariano" , null , '2,10' , '{"38":0.5,"2":0.25,"4":0.25,"11":0.25,"39":0.25}',0),
('Mixed Greens' , "vegetariano" , null , '14' , '{"38":0.5,"2":0.25,"4":0.25,"39":0.25}',0),
('Tomato Confit' , "vegetariano" , null , '3,11' , '{"2":0.75,"8":0.25,"4":0.25,"40":0.25,"14":0.25}',0),
('Potatoes with Onion' , "niño" , null , '4,12' , '{"5":0.5,"14":0.3,"4":0.5,"41":0.25}',0),
('Linguine Pasta' , "niño" , null , '1,9,5' , '{"2":0.5,"12":0.5,"13":0.25,"4":0.25,"14":0.25}',0),
('Crushed Potatoes' , "niño" , null , '2,15' , '{"5":0.75,"14":0.25,"42":0.25,"2":0.5,"13":0.5,"40":0.25}',0),
('French Fries and Ratatouille' , "niño" , null , '2,15' , '{"5":0.75,"14":0.25,"42":0.25,"2":0.5,"13":0.5,"40":0.25}',0);