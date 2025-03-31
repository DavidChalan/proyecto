# Imagen base
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos todo y compilamos
COPY . .
RUN npm run build

# Exponemos puerto Nest
EXPOSE 3001

# Comando de inicio
CMD ["node", "dist/main"]
