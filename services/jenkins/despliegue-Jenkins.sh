#!/bin/bash

set -e  # Detener en caso de error

NAMESPACE="jenkins"

echo "🚀 Desplegando Jenkins en el namespace: $NAMESPACE"

# 1. Verificar si el namespace ya existe
if kubectl get namespace "$NAMESPACE" >/dev/null 2>&1; then
    echo "🔎 El namespace '$NAMESPACE' ya existe. Continuando..."
else
    echo "📁 El namespace '$NAMESPACE' no existe. Creándolo..."
    kubectl apply -f ./namespace/namespace.yml
fi

# 2. Aplicar volúmenes
echo "📦 Aplicando PersistentVolume y PersistentVolumeClaim..."
kubectl apply -f ./Volume/persistentvolume.yml -n "$NAMESPACE"

# 3. Aplicar deployment y service
echo "🛠️ Aplicando Deployment y Service de Jenkins..."
kubectl apply -f ./DeplyAndService/DeployAndServ.yml -n "$NAMESPACE"

# 4. Esperar hasta que el pod esté en estado Running
echo "⏳ Esperando a que los pods estén en estado 'Running'..."

# Esperar hasta que al menos un pod esté en Running
until kubectl get pods -n "$NAMESPACE" | grep -qE '1/1\s+Running'; do
    echo "⏱️  Aún no está listo. Esperando 5s..."
    sleep 5
done

echo "✅ Todos los pods de Jenkins están en estado 'Running'."
echo "🏁 Despliegue completado correctamente."
