-- Crear Tablas

-- tabla de la caja
CREATE TABLE submodulo_caja (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    turno_horario varchar(255) NOT NULL,
    tasa_del_dia float NOT NULL,
    apertura datetime NOT NULL,
    cierre datetime NOT NULL,
    monto_inicial float NOT NULL,
    monto_final float NOT NULL,
    ingresos float NOT NULL,
    egresos float NOT NULL

);

-- tabla del salon
CREATE TABLE submodulo_salon (
	id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    presupuesto float NOT NULL,
    inicio_evento datetime NOT NULL,
    final_evento datetime NOT NULL,
    pago_inicial float NOT NULL,
    pago_final float NOT NULL

);

-- tabla registro cliente
CREATE TABLE submodulo_registro_cliente (
	id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente_empresa varchar(255) NOT NULL,
    rif_cedula varchar(255) NOT NULL,
    direccion varchar(255) NOT NULL,
    tipo_estado varchar(255) NOT NULL,
    telefono varchar(255) NOT NULL,
    correo_electronico varchar(255) NOT NULL

);

-- tabla de factura
CREATE TABLE submodulo_factura (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    monto float NOT NULL,
    iva float NOT NULL,
    consumo LONGTEXT NOT NULL,  -- consumo = {"id_comida" : cantidad}
    status_pedido INT NOT NULL
);