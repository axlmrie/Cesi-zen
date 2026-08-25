# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN corepack enable

FROM base AS dependencies

RUN apt-get update \
  && apt-get install --yes --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml .npmrc ./
COPY prisma ./prisma

RUN pnpm install --frozen-lockfile

FROM dependencies AS prisma-cli

# Install the exact CLI version resolved by pnpm so runtime migrations never
# download an unpinned package through npx. A prefix-local installation keeps
# Prisma and all of its runtime dependencies (including @prisma/engines) in one
# self-contained directory that can safely be copied to the final image.
RUN PRISMA_VERSION="$(node --print "require('./node_modules/prisma/package.json').version")" \
  && npm install \
    --prefix /opt/prisma-cli \
    --omit=dev \
    --no-package-lock \
    --no-save \
    "prisma@${PRISMA_VERSION}" \
  && /opt/prisma-cli/node_modules/.bin/prisma --version \
  && npm cache clean --force

FROM dependencies AS builder

ENV NEXT_TELEMETRY_DISABLED="1"
ENV SKIP_ENV_VALIDATION="1"
ENV DATABASE_URL="mysql://build:build@127.0.0.1:3306/build"
ENV BETTER_AUTH_SECRET="build-only-placeholder-not-a-runtime-secret"
ENV BETTER_AUTH_URL="http://localhost:3000"

COPY . .

RUN pnpm build

FROM node:22-bookworm-slim AS runner

ARG APP_VERSION="development"

LABEL org.opencontainers.image.title="CESIZen frontend"
LABEL org.opencontainers.image.version="$APP_VERSION"

ENV NODE_ENV="production"
ENV NEXT_TELEMETRY_DISABLED="1"
ENV HOSTNAME="0.0.0.0"
ENV PORT="3000"
ENV APP_VERSION="$APP_VERSION"
ENV HOME="/home/nextjs"
ENV PATH="/app/node_modules/.bin:/opt/prisma-cli/node_modules/.bin:${PATH}"
ENV NPM_CONFIG_OFFLINE="true"
ENV NPM_CONFIG_UPDATE_NOTIFIER="false"

WORKDIR /app

RUN apt-get update \
  && apt-get install --yes --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs --create-home \
    --home-dir /home/nextjs nextjs

COPY --from=prisma-cli --chown=nextjs:nodejs /opt/prisma-cli /opt/prisma-cli
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Keep the custom Prisma output available even if Next's file tracing changes.
COPY --from=builder --chown=nextjs:nodejs /app/generated ./generated
# `prisma migrate deploy` discovers schema.prisma and future migrations here.
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

RUN mkdir -p /app/node_modules/.bin \
  && ln --symbolic --force \
    /opt/prisma-cli/node_modules/prisma/build/index.js \
    /app/node_modules/.bin/prisma \
  && chown nextjs:nodejs /app/node_modules/.bin \
  && chown --no-dereference nextjs:nodejs /app/node_modules/.bin/prisma

USER nextjs

# This build-time assertion proves that the imposed deployment command resolves
# the bundled CLI as the non-root runtime user without registry access.
RUN npx prisma --version

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/health').then((response) => { if (!response.ok) process.exit(1) }).catch(() => process.exit(1))"]

CMD ["node", "server.js"]
