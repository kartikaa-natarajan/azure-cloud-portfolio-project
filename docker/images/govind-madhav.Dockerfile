# portfolio-govind-madhav: Next.js (standalone) + Prisma + PostgreSQL.
# Stages: deps -> builder -> migrate (one-shot DB schema + seed job) -> runner (the website).
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat openssl

FROM base AS deps
WORKDIR /app
COPY portfolio-govind-madhav/package*.json ./
COPY portfolio-govind-madhav/prisma ./prisma/
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY portfolio-govind-madhav/ ./
ENV NEXT_TELEMETRY_DISABLED=1
# Placeholders only so the build can start; real values are injected at runtime by docker compose.
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV AUTH_SECRET="build-time-placeholder-secret-0123456789"
RUN node scripts/fetch-contributions.mjs || true
RUN npx prisma generate
RUN npx next build

# One-shot job: create tables and seed the portfolio content, then exit.
FROM builder AS migrate
CMD ["sh", "-c", "npx prisma db push && npx tsx prisma/seed.ts"]

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
