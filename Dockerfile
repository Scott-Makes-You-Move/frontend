# ---- Stage 1: Dependencies ----
FROM node:20.11-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --fetch-timeout=600000


# ---- Stage 2: Build ----
FROM node:20.11-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars required for static page generation
ARG NEXT_DATOCMS_CMA_TOKEN
ARG NEXT_DATOCMS_DRAFT_CONTENT_CDA_TOKEN
ARG NEXT_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN

ENV NEXT_DATOCMS_CMA_TOKEN=$NEXT_DATOCMS_CMA_TOKEN
ENV NEXT_DATOCMS_DRAFT_CONTENT_CDA_TOKEN=$NEXT_DATOCMS_DRAFT_CONTENT_CDA_TOKEN
ENV NEXT_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN=$NEXT_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN

RUN npm run build

# ---- Stage 3: Production runner ----
FROM node:20.11-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

COPY --from=builder /app/build/standalone ./
COPY --from=builder /app/build/static ./build/static
COPY --from=builder /app/public ./public

# Fix permissions for nextjs user
RUN mkdir -p build/cache build/server && \
    chown -R nextjs:nodejs build/

USER nextjs

EXPOSE 3000

ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
