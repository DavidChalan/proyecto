# intalar K3S

*********** Una vez tengamos todos los archivos .yml comezaremos con estos comandos ****************
2. kubectl apply -f secret-dev.yml
<!-- 3. kubectl apply -f secret-pgadmin.yml -->
4. kubectl apply -f configmap-postgres-initbd.yml
5. kubectl apply -f persistence-volume.yml
6. kubectl apply -f  persistence-volume-claim.yml
7. kubectl apply -f deploymente-postgres.yml
8. kubectl apply -f deploymente-pgadmin.yml
9. kubectl apply -f service-postgres.yml
10. kubectl apply -f service-pgadmin.yml

*****************************************************************

    Comensaremos con estos comandos para inicializar
1. kubectl get all 
2. ver los pods---> kubectl get pods

*****************************************************************
# empezaremos creando los ficheros de configuracion que van a tener los usuarios de BBDD Y los usuarios para acceder a ADMINIER 
    - 