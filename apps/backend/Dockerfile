# -----------------------
# STAGE 1: BUILD
# -----------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependencias solo necesarias para compilar
COPY package*.json ./
RUN npm install

# Copia el código fuente y compila
COPY . .
RUN npm run build

# -----------------------
# STAGE 2: RUN (ROOTLESS)
# -----------------------
FROM node:20-alpine

# Crear grupo y usuario rootless
RUN addgroup -S devops && adduser -S admin -G devops

VOLUME /tmp

ENV DB_PASS=${DB_PASS}

WORKDIR /app

# Copiar solo lo necesario desde la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Asegurar permisos para el usuario
RUN chown -R admin:devops /app

# Cambiar al usuario no root
USER admin

EXPOSE 3001

CMD ["node", "dist/main"]
