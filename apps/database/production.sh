#!/bin/bash

# Nombre de la red compartida
NETWORK_NAME="app-network"

echo "Verificando si la red '$NETWORK_NAME' existe..."

# Verifica si la red existe
if ! docker network ls --format '{{.Name}}' | grep -q "^${NETWORK_NAME}$"; then
  echo "La red '$NETWORK_NAME' no existe. Creándola..."
  docker network create "$NETWORK_NAME"
else
  echo "La red '$NETWORK_NAME' ya existe."
fi

# Levantar entorno de producción
echo "Levantando entorno de PRODUCCIÓN y ADMINER..."
  docker compose \
  --env-file Production/.env \
  -f Production/Docker-compose-pro.yml \
  -f adminer.yml up -d --build --force-recreate
# Levantar entorno de preproducción
# echo "Levantando entorno de PREPRODUCCIÓN..."
# docker compose \
#   -f Preproduction/Docker-compose-prep.yml \
#   --env-file Preproduction/.env \
#   up -d --build

# Levantar adminer

echo "Todo levantado correctamente."
