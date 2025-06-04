#!/bin/bash

set -e  # Termina si algo falla

echo "🧹 Eliminando Frontend..."
kubectl delete -f fastcontract/service-front.yml --ignore-not-found
kubectl delete -f fastcontract/deployment-app-front.yml --ignore-not-found

echo "🧹 Eliminando Backend..."
kubectl delete -f fastcontract/service-back.yml --ignore-not-found
kubectl delete -f fastcontract/deployment-app-back.yml --ignore-not-found

echo "🧹 Eliminando Adminer (Deployment + Service)..."
kubectl delete -f db/deploy_and_service-adminer.yml --ignore-not-found

echo "🧹 Eliminando MySQL Service..."
kubectl delete -f db/services-mysql.yml --ignore-not-found

echo "🧹 Eliminando MySQL Deployment..."
kubectl delete -f db/deployment-mysql.yml --ignore-not-found

echo "🧹 Eliminando ConfigMap..."
kubectl delete -f db/configmap-mysql-initdb.yml --ignore-not-found

echo "🧹 Eliminando Secrets..."
kubectl delete -f db/secret-desarrollo.yml --ignore-not-found

echo "🧹 Eliminando Persistent Volume Claim..."
kubectl delete -f db/persistence-volume-claim.yml --ignore-not-found

echo "🧹 Eliminando Persistent Volume..."
kubectl delete -f db/persistence-volume.yml --ignore-not-found

echo "✅ Todo eliminado correctamente."
