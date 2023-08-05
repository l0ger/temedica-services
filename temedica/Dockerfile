# Install dependencies only when needed
FROM node:alpine AS deps
#install missed shared library in alpine
RUN apk add --no-cache libc6-compat
WORKDIR /temedica
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /temedica
#Copy the current directory . in the project to the workdir . in the image.
COPY . .
COPY --from=deps /temedica/node_modules ./node_modules
# Do not run package.json scripts( --ignore-scripts)
# Using cache (--prefer-offline)
RUN yarn build && yarn install --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /temedica

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S temedica -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /temedica/next.config.js ./
COPY --from=builder /temedica/public ./public
COPY --from=builder --chown=temedica:nodejs /temedica/.next ./.next
COPY --from=builder /temedica/node_modules ./node_modules
COPY --from=builder /temedica/package.json ./package.json

USER temedica

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]