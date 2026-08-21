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
#  ÉTAPE 3 : PRODUCTION
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# ✅ Copier le standalone
COPY --from=builder /app/.next/standalone ./

# ✅ Copier le static
COPY --from=builder /app/.next/static ./.next/static

# ✅ Copier public s'il existe
COPY --from=builder /app/public ./public

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]