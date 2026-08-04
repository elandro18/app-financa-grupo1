# ---- 1. Instalação de dependências ----
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# ---- 2. Build da aplicação ----
FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# URL pública da API (ex.: http://api.bytebank.example.com). Se não for
# informada, a aplicação usa http://localhost:3000/ (default de desenvolvimento).
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# ---- 3. Imagem final (runtime) ----
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Arquivos estáticos públicos
COPY --from=builder /app/public ./public

# Output standalone: servidor Node mínimo + node_modules necessários
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Assets estáticos do build (JS/CSS das rotas)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
