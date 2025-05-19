# ---------------------
# STAGE 1: Build Stage
# ---------------------
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    # ----------------------
    # STAGE 2: Production Stage
    # ----------------------
    FROM node:18-alpine
    
    WORKDIR /app
    
    # Solo copiamos lo necesario desde el build
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    
    EXPOSE 3000
    
    CMD ["npm", "start"]
    