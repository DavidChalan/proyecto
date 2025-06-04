#                     comandos de minikube
1. minikube start
2. minikube stop 
3. minikube dashboard --url
4. minikube service --url fastcontract 

#                     comandos de kubectl
1. kubectl run fastcontract --image=davidchalan/frontend-fastcontract:v1 --port=3000
2. kubectl get pods
2. kubectl describe pod fastcontract
3. kubectl expose pod fastcontract --type=LoadBalancer --port=8080 --target-port=3000 
4. kubectl get services
5. kubectl describe service kPruebAapp
6. 


--------------------------------------------------------------------------------

1. Primero creamos los PODS y luego los SERVICIOS 
2. 
3. 
4. 
5. 