#!/bin/bash

set -e  # Termina si algo falla

NAMESPACE=fastcontract-dev

echo "🧹 Eliminando Frontend-dev..."
kubectl delete -f fastcontract/service-front.yml -n $NAMESPACE --ignore-not-found
kubectl delete -f fastcontract/deployment-app-front.yml -n $NAMESPACE --ignore-not-found

echo "🧹 Eliminando Backend..."
kubectl delete -f fastcontract/service-back.yml -n $NAMESPACE --ignore-not-found
kubectl delete -f fastcontract/deployment-app-back.yml -n $NAMESPACE --ignore-not-found

echo "🧹 Eliminando Adminer (Deployment + Service)..."
kubectl delete -f db/deploy_and_service-adminer.yml -n $NAMESPACE --ignore-not-found

echo "🧹 Eliminando MySQL Service..."
kubectl delete -f db/services-mysql.yml -n $NAMESPACE --ignore-not-found

echo "🧹 Eliminando MySQL Deployment..."
kubectl delete -f db/deployment-mysql.yml -n $NAMESPACE --ignore-not-found

echo "🧹 Eliminando ConfigMap..."
kubectl delete -f db/configmap-mysql-initdb.yml -n $NAMESPACE --ignore-not-found

echo "🧹 Eliminando Secrets..."
kubectl delete -f db/secret-desarrollo.yml -n $NAMESPACE --ignore-not-found

echo "🧹 Eliminando Persistent Volume Claim..."
kubectl delete -f db/persistence-volume-claim.yml -n $NAMESPACE --ignore-not-found

echo "🧹 Eliminando Ingress de Adminer..."
kubectl delete -f ingress/adminer-ingress.yml -n $NAMESPACE --ignore-not-found
echo "🧹 Eliminando Ingress de Backend..." 
kubectl delete -f ingress/backend-ingress.yml -n $NAMESPACE --ignore-not-found
echo "🧹 Eliminando Ingress de Frontend..."
kubectl delete -f ingress/frontend-ingress.yml -n $NAMESPACE --ignore-not-found

echo "🧹 Eliminando Persistent Volume..."
kubectl delete -f db/persistence-volume.yml --ignore-not-found

echo "✅ Todos los recursos fueron eliminados del namespace '$NAMESPACE'."
