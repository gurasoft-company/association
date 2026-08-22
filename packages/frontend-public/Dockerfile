# ============================================
#  ÉTAPE 1 : DÉPENDANCES
# ============================================
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

# ============================================
#  ÉTAPE 2 : BUILDER
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

# ============================================
#  ÉTAPE 3 : PRODUCTION (Runner)
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# ✅ Copier le dossier public
COPY --from=builder /app/public ./public

# ✅ Copier le standalone
COPY --from=builder /app/.next/standalone ./

# ✅ Copier le static
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app

USER nextjs

# ✅ CRUCIAL : forcer l'écoute sur toutes les interfaces réseau
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

# ✅ Démarrer avec node server.js (pas npm start)
CMD ["node", "server.js"]