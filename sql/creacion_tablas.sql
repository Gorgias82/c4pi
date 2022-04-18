/**
 * Author:  Jorge Vicente
 * DAW2  
 */
CREATE DATABASE IF NOT EXISTS c4pi;
USE c4pi;


DROP TABLE IF EXISTS c4pi.empleados;
DROP TABLE IF EXISTS c4pi.clientes;
DROP TABLE IF EXISTS c4pi.hoteles;
DROP TABLE IF EXISTS c4pi.departamentos;
DROP TABLE IF EXISTS c4pi.opiniones;
DROP TABLE IF EXISTS c4pi.estancias;

CREATE TABLE c4pi.hoteles
(id SMALLINT UNSIGNED not null AUTO_INCREMENT
,nombre VARCHAR(20) not null
,cif VARCHAR(15) 
,primary key (id));

CREATE TABLE c4pi.clientes
(id SMALLINT UNSIGNED not null AUTO_INCREMENT
,dni VARCHAR(15) not null
,nombre VARCHAR(20) not null
,apellido1 VARCHAR(20) not null
,apellido2 VARCHAR(20)
,primary key (id));

CREATE TABLE c4pi.departamentos
(id SMALLINT UNSIGNED not null AUTO_INCREMENT
,nombre VARCHAR(20) not null
,id_hotel SMALLINT UNSIGNED not null
,primary key (id)
,foreign key (id_hotel) REFERENCES hoteles(id) ON DELETE CASCADE);

CREATE TABLE c4pi.empleados
(id SMALLINT UNSIGNED not null AUTO_INCREMENT
,id_departamento SMALLINT UNSIGNED not null	
,rango TINYINT(1) not null												
,login VARCHAR(20) unique
,password VARCHAR(80) not null
,primary key (id)
,foreign key (id_departamento) REFERENCES departamentos(id));

CREATE TABLE c4pi.opiniones
(id_cliente SMALLINT UNSIGNED not null 
,id_empleado SMALLINT UNSIGNED not null
,color TINYINT(1) not null
,fecha DATE not null
,primary key(id_cliente, id_empleado)
,foreign key (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
,foreign key (id_empleado) REFERENCES empleados(id));

CREATE TABLE c4pi.estancias
(id_cliente SMALLINT UNSIGNED not null 
,id_hotel SMALLINT UNSIGNED not null
,fecha DATE not null
,primary key(id_cliente, id_hotel)
,foreign key (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
,foreign key (id_hotel) REFERENCES hoteles(id) ON DELETE CASCADE);