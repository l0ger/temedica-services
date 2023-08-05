# Install dependencies
FROM node:alpine AS deps
#Install missed shared library in alpine
RUN apk add --no-cache libc6-compat
WORKDIR /express-server
#Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci --only=production


# Production image, copy all the files and run server
FROM node:alpine AS runner
WORKDIR /express-server

ENV NODE_ENV production

RUN addgroup -g 1002 -S express
RUN adduser -S express-server -u 1002

COPY --chown=express-server:express ./server ./server
COPY --from=deps /express-server/node_modules ./node_modules
COPY --from=deps /express-server/package.json ./package.json
COPY ./dataset.json ./

USER express-server

EXPOSE 3005

ENV SERVER_PORT 3005

CMD [ "node", "server/index.js" ]