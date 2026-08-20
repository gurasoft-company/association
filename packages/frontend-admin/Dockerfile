# ============================================
#  ÉTAPE 1 : BUILDER
# ============================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci && npm cache clean --force

# Copier tout le code (y compris TypeScript et Tailwind)
COPY . .

# Builder l'application (tsc + vite build)
RUN npm run build

# ============================================
#  ÉTAPE 2 : PRODUCTION (Nginx)
# ============================================
FROM nginx:alpine

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]