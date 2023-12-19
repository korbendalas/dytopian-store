FROM node:18-alpine AS builder

WORKDIR /oss-api
COPY .env .env

COPY ../yarn.lock .

COPY packages/oss-api/package.json .
RUN yarn install --frozen-lockfile

COPY packages/oss-api ./

RUN yarn build

FROM node:18-alpine AS prod

WORKDIR /

COPY --from=builder /oss-api/dist ./oss-api/dist
COPY --from=builder /oss-api/package.json ./oss-api/
COPY --from=builder /oss-api/yarn.lock ./oss-api/
COPY --from=builder /oss-api/prisma/schema.prisma ./oss-api/
COPY --from=builder /oss-api/.env ./oss-api/

ENV PM2_HOME=/usr/local/pm2
ENV PATH=$PATH:$PM2_HOME/bin

RUN npm install pm2@latest -g

# Specify the command to start your application with PM2
CMD ["sh", "-c", "cd /oss-api && yarn install --frozen-lockfile && pm2 start /oss-api/dist/src/main.js --no-daemon"]
