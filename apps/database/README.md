1. desplegar mi base de datos en un contenedor , con volumenes para guardar los datos, esto hara que aun que se borre el contenedor siga conteniendo los datos 
2. crear un archivo init.sql para crear la base en caso de que no exista ninguna.
3. vemos los volumenes con docker volume ls , y vemos el volumen database_mysql_data , donde almacenara los datos y seran persistente , aunque borre el contendor se almacenara ahi 
