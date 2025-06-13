#!/bin/bash

set -e  # Detener en caso de fallo

NAMESPACE=fastcontract-dev

echo "📦 Creando namespace (si no existe)..."

# 1. Verificar si el namespace ya existe
if kubectl get namespace "$NAMESPACE" >/dev/null 2>&1; then
    echo "🔎 El namespace '$NAMESPACE' ya existe. Continuando..."
else
    echo "📁 El namespace '$NAMESPACE' no existe. Creándolo..."
    kubectl apply -f ./namespace/namespace.yml
fi

echo "📦 Aplicando Persistent Volumes..."
kubectl apply -f db/persistence-volume.yml -n $NAMESPACE
kubectl apply -f db/persistence-volume-claim.yml -n $NAMESPACE

echo "🔐 Aplicando Secrets..."
kubectl apply -f db/secret-desarrollo.yml -n $NAMESPACE

echo "⚙️ Aplicando ConfigMap..."
kubectl apply -f db/configmap-mysql-initdb.yml -n $NAMESPACE

echo "🐬 Desplegando MySQL..."
kubectl apply -f db/deployment-mysql.yml -n $NAMESPACE
kubectl apply -f db/services-mysql.yml -n $NAMESPACE

echo "🛠️ Desplegando Adminer..."
kubectl apply -f db/deploy_and_service-adminer.yml -n $NAMESPACE

echo "🧠 Desplegando Backend de la app..."
kubectl apply -f fastcontract/deployment-app-back.yml -n $NAMESPACE
kubectl apply -f fastcontract/service-back.yml -n $NAMESPACE

echo "🎨 Desplegando Frontend de la app..."
kubectl apply -f fastcontract/deployment-app-front.yml -n $NAMESPACE
kubectl apply -f fastcontract/service-front.yml -n $NAMESPACE

echo " Desplegando adminer-ingress de la app..."
kubectl apply -f ingress/adminer-ingress.yml -n $NAMESPACE

echo " Desplegando backend-Ingress de la app..."
kubectl apply -f ingress/backend-ingress.yml -n $NAMESPACE

echo " Desplegando frontend-Ingress de la app..."
kubectl apply -f ingress/frontend-ingress.yml -n $NAMESPACE

echo "⏳ Esperando a que todos los pods estén en estado 'Running'..."
sleep 5

kubectl wait --for=condition=Ready pods --all --namespace=$NAMESPACE --timeout=60s

if [[ $? -eq 0 ]]; then
    echo "✅ Todos los pods están corriendo correctamente."
else
    echo "❌ Error: Algunos pods no se encuentran en estado 'Running'."
    kubectl get pods -n $NAMESPACE -o wide
    exit 1
fi
