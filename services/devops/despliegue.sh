#!/bin/bash

set -e  # Detener en caso de fallo

echo "📦 Aplicando Persistent Volumes..."
kubectl apply -f db/persistence-volume.yml
kubectl apply -f db/persistence-volume-claim.yml

echo "🔐 Aplicando Secrets..."
kubectl apply -f db/secret-desarrollo.yml

echo "⚙️ Aplicando ConfigMap..."
kubectl apply -f db/configmap-mysql-initdb.yml

echo "🐬 Desplegando MySQL..."
kubectl apply -f db/deployment-mysql.yml
kubectl apply -f db/services-mysql.yml

echo "🛠️ Desplegando Adminer..."
kubectl apply -f db/deploy_and_service-adminer.yml

echo "🧠 Desplegando Backend de la app..."
kubectl apply -f fastcontract/deployment-app-back.yml
kubectl apply -f fastcontract/service-back.yml

echo "🎨 Desplegando Frontend de la app..."
kubectl apply -f fastcontract/deployment-app-front.yml
kubectl apply -f fastcontract/service-front.yml

echo "⏳ Esperando a que todos los pods estén en estado 'Running'..."
sleep 5

kubectl wait --for=condition=Ready pods --all --timeout=60s

if [[ $? -eq 0 ]]; then
    echo "✅ Todos los pods están corriendo correctamente."
else
    echo "❌ Error: Algunos pods no se encuentran en estado 'Running'."
    kubectl get pods -o wide
    exit 1
fi
