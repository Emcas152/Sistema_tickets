#!/bin/bash

#########################################
# CONFIGURACION
#########################################

SERVER_USER="root"
SERVER_IP="TU_IP_VPS"
SERVER_PATH="/var/www/tickets/frontend"

PROJECT_PATH=$(pwd)
BUILD_FOLDER="dist/materialpro/browser"

#########################################
# COMPILAR ANGULAR
#########################################

echo "================================"
echo "Compilando Angular..."
echo "================================"

npm install --legacy-peer-deps
npx ng build --configuration production

echo "Build completado"

#########################################
# EMPAQUETAR BUILD
#########################################

echo "Empaquetando proyecto..."

tar -czf build.tar.gz $BUILD_FOLDER

#########################################
# SUBIR AL SERVIDOR
#########################################

echo "Subiendo al servidor..."

scp build.tar.gz $SERVER_USER@$SERVER_IP:/tmp

#########################################
# DESPLEGAR EN VPS
#########################################

echo "Desplegando en servidor..."

ssh $SERVER_USER@$SERVER_IP << EOF

echo "Limpiando frontend anterior..."
rm -rf $SERVER_PATH/*

echo "Extrayendo build..."
tar -xzf /tmp/build.tar.gz -C /tmp

echo "Moviendo archivos..."
cp -r /tmp/$BUILD_FOLDER/* $SERVER_PATH/

echo "Asignando permisos..."
chown -R www-data:www-data $SERVER_PATH

echo "Limpiando temporales..."
rm -rf /tmp/build.tar.gz
rm -rf /tmp/$BUILD_FOLDER

echo "Recargando Nginx..."
systemctl reload nginx

echo "Deploy finalizado"

EOF

echo "================================"
echo "DEPLOY COMPLETADO"
echo "================================"
