/**
 * Author:  Jorge Vicente
 * DAW2  
 */
CREATE DATABASE IF NOT EXISTS c4pi;
USE c4pi;


DROP TABLE IF EXISTS c4pi.empleado;
DROP TABLE IF EXISTS c4pi.cliente;
DROP TABLE IF EXISTS c4pi.hotel;
DROP TABLE IF EXISTS c4pi.departamento;
DROP TABLE IF EXISTS c4pi.opinion;
DROP TABLE IF EXISTS c4pi.estancia;

CREATE TABLE c4pi.hotel
(id SMALLINT UNSIGNED not null AUTO_INCREMENT
,nombre VARCHAR(20) not null
,cif VARCHAR(15) 
,primary key (id));

CREATE TABLE c4pi.cliente
(id SMALLINT UNSIGNED not null AUTO_INCREMENT
,dni VARCHAR(15) not null
,nombre VARCHAR(20) not null
,apellido1 VARCHAR(20) not null
,apellido2 VARCHAR(20)
,unique (dni)
,primary key (id));

CREATE TABLE c4pi.departamento
(id SMALLINT UNSIGNED not null AUTO_INCREMENT
,nombre VARCHAR(30) not null
,id_hotel SMALLINT UNSIGNED not null
,primary key (id)
,foreign key (id_hotel) REFERENCES hotel(id) ON DELETE CASCADE);

CREATE TABLE c4pi.empleado
(id SMALLINT UNSIGNED not null AUTO_INCREMENT
,id_departamento SMALLINT UNSIGNED not null	
,rango TINYINT(1) not null												
,login VARCHAR(20) unique
,password VARCHAR(255) not null
,color TINYINT(1) DEFAULT(4)
,primary key (id)
,foreign key (id_departamento) REFERENCES departamento(id));

CREATE TABLE c4pi.opinion
(id_cliente SMALLINT UNSIGNED not null 
,id_empleado SMALLINT UNSIGNED not null
,color TINYINT(1) not null
,fecha DATE not null
,primary key(id_cliente, id_empleado)
,foreign key (id_cliente) REFERENCES cliente(id) ON DELETE CASCADE
,foreign key (id_empleado) REFERENCES empleado(id));
