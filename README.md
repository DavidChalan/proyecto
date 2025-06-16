# proyecto

1. primera etapa , construir los dockerfile para el frontend y el backend, despues desplegarlos 

    # Backend
        docker build -t backend-app . 

    # Frontend
        docker build -t frontend-app . 

2. Una vez generado las imagenes lo subiremos a dockerhub 
    # Nombrar las imagenes
        docker tag backend-app davidchalan/backend-app:v1.0
        docker tag frontend-app davidchalan/frontend-app:v1.0
    # subir images a dockerhub
        docker push davidchalan/backend-app:v1.0
        docker push davidchalan/frontend-app:v1.0

3. Usar Helm para desplegar la base de datos (por ahora esta en la vps directamente)
    # deberemos tener instalado helm, kubeclt

4. desplegar el backend y forntend en kubernetes (comando para verificar errores --> kubectl describe pod frontend-deployment-bf7b8fbb5-9b99z)
    # kubectl apply -f kubernetes/backend/backend-deployment.yml
    # kubectl apply -f kubernetes/backend/backend-service.yml

    # kubectl apply -f kubernetes/frontend/frontend-deployment.yml
    # kubectl apply -f kubernetes/frontend/frontend-service.yml

    # kubectl get pods
    # kubectl get svc
    # kubectl logs <nombre-del-pod>

5. creacion del nginx proxy manager 


------------------------------------------------------------------
#                              SECURITY                        
------------------------------------------------------------------
        1. 


------------------------------------------------------------------

