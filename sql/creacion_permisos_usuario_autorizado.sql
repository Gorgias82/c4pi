/**
 * Author:  Jorge Vicente
 * DAW2  
 */

create user 'jorge'@'localhost' identified by 'Nohay2sin3';


GRANT SELECT, INSERT, DELETE ON c4pi.empleados TO 'jorge'@'localhost';
GRANT SELECT, INSERT, DELETE ON c4pi.clientes TO 'jorge'@'localhost';
GRANT SELECT, INSERT ON c4pi.hoteles TO 'jorge'@'localhost';
GRANT SELECT, INSERT, DELETE ON c4pi.departamentos TO 'jorge'@'localhost';
GRANT SELECT, INSERT ON c4pi.opiniones TO 'jorge'@'localhost';
GRANT SELECT, INSERT ON c4pi.estancias TO 'jorge'@'localhost';