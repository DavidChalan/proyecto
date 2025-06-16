#!/bin/bash

LOG_FILE="/var/log/mantencion_k3s.log"
TIMESTAMP=$(date "+%F %T")

echo "[$TIMESTAMP] 🔧 Iniciando mantenimiento automático K3s" >> $LOG_FILE

# Limpieza de Snap
echo "[$TIMESTAMP] 🧹 Eliminando residuos de Snap..." >> $LOG_FILE
systemctl stop snapd.socket snapd.service 2>> $LOG_FILE
systemctl disable snapd.socket snapd.service 2>> $LOG_FILE
apt purge -y snapd >> $LOG_FILE 2>&1
rm -rf ~/snap /snap /var/snap /var/lib/snapd >> $LOG_FILE 2>&1

# Verificación de espacio en base de datos
echo "[$TIMESTAMP] 📦 Tamaño base de datos de K3s:" >> $LOG_FILE
du -sh /var/lib/rancher/k3s/server/db >> $LOG_FILE 2>&1

# Snapshot del estado del clúster
echo "[$TIMESTAMP] 💾 Creando snapshot de K3s..." >> $LOG_FILE
k3s etcd-snapshot save >> $LOG_FILE 2>&1

# Estado general
echo "[$TIMESTAMP] 📊 Uso de disco:" >> $LOG_FILE
df -h / >> $LOG_FILE

echo "[$TIMESTAMP] 💡 Memoria disponible:" >> $LOG_FILE
free -h >> $LOG_FILE

echo "[$TIMESTAMP] ✅ Mantenimiento completado." >> $LOG_FILE
echo "----------------------------------------------------------" >> $LOG_FILE
