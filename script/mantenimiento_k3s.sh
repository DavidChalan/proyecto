#!/bin/bash

echo "🔧 Iniciando mantenimiento de K3s y limpieza del sistema..."

# 1. Limpiar Snap si ya no se usa
echo "🧹 Eliminando Snap (si está presente)..."
sudo systemctl stop snapd.socket snapd.service 2>/dev/null
sudo systemctl disable snapd.socket snapd.service 2>/dev/null
sudo apt purge -y snapd 2>/dev/null
sudo rm -rf ~/snap /snap /var/snap /var/lib/snapd

# 2. Mostrar tamaño actual del directorio de base de datos
echo "📦 Espacio usado por base de datos de K3s:"
sudo du -sh /var/lib/rancher/k3s/server/db 2>/dev/null || echo "No se encontró la carpeta /server/db"

# 3. Crear snapshot del clúster
echo "💾 Creando snapshot del estado del clúster K3s..."
sudo k3s etcd-snapshot save 2>/dev/null && echo "✅ Snapshot creado con éxito." || echo "⚠️ No se pudo crear snapshot (posiblemente no usas etcd o no tienes permisos)."

# 4. Mostrar espacio libre actual
echo "📊 Estado actual del disco:"
df -h /

# 5. Mostrar uso de RAM y SWAP
echo "💡 Estado de memoria:"
free -h

echo "✅ Mantenimiento finalizado con éxito."
