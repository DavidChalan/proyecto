-- Description: Script to create the database and user for the project
CREATE DATABASE IF NOT EXISTS proyecto;

CREATE USER IF NOT EXISTS 'david'@'%' IDENTIFIED BY '686905439';

GRANT ALL PRIVILEGES ON proyecto.* TO 'david'@'%';

FLUSH PRIVILEGES;
